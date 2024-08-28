import { Request, Response } from "express";
import Stripe from "stripe";
import Restaurant, { MenuItemType } from "../models/restaurant";
import Order from "../models/order";

const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string);
const FRONTEND_URL = process.env.FRONTEND_URL as string;
const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};

export = {
  CreateCheckoutSession: async (req: Request, res: Response) => {
    try {
      const checkoutSessionRequest: CheckoutSessionRequest = req.body;
      const restaurant = await Restaurant.findById(
        checkoutSessionRequest.restaurantId
      );

      if (!restaurant) {
        throw new Error("Restaurant not found");
      }

      const newOrder = new Order({
        restaurant: restaurant,
        user: req.userId,
        status: "placed",
        deliveryDetails: checkoutSessionRequest.deliveryDetails,
        cartItems: checkoutSessionRequest.cartItems,
        createdAt: new Date(),
      });

      const lineItems = createLineItems(
        checkoutSessionRequest,
        restaurant.menuItems
      );

      const session = await createSession(
        lineItems,
        newOrder._id.toString(),
        restaurant.deliveryPrice,
        restaurant._id.toString()
      );

      if (!session.url) {
        return res
          .status(500)
          .json({ message: "Error creating stripe session" });
      }

      await newOrder.save();
      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Error creating checkout session:", error);
      res.status(500).json({
        success: false,
        message: `Error creating checkout session: ${error.raw.message}`,
      });
    }
  },

  stripeWebhookHandler: async (req: Request, res: Response) => {
    let event;
    try {
      const signature = req.headers["stripe-signature"];
      event = STRIPE.webhooks.constructEvent(
        req.body,
        signature as string,
        STRIPE_ENDPOINT_SECRET
      );
    } catch (error: any) {
      console.error("Error: ", error);
      return res.status(400).send(`Error processing webhook: ${error.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const order = await Order.findById(event.data.object.metadata?.orderId);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      order.totalAmount = event.data.object.amount_total;
      order.status = "paid";

      await order.save();
    }
    res.status(200).send();
  },

  getMyOrders: async (req: Request, res: Response) => {
    try {
      const orders = await Order.find({ user: req.userId })
        .populate("restaurant")
        .populate("user");

      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "something went wrong" });
    }
  },
};

const createLineItems = (
  checkoutSessionRequest: CheckoutSessionRequest,
  menuItems: MenuItemType[]
) => {
  const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
    const menuItem = menuItems.find(
      (item) => item._id.toString() === cartItem.menuItemId.toString()
    );

    if (!menuItem) {
      throw new Error(`Menu item not found: ${cartItem.menuItemId}`);
    }

    const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
      price_data: {
        currency: "usd",
        unit_amount: menuItem.price,
        product_data: {
          name: menuItem.name,
        },
      },
      quantity: parseInt(cartItem.quantity),
    };

    return line_item;
  });

  return lineItems;
};

const createSession = async (
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
  orderId: string,
  deliveryPrice: number,
  restaurantId: string
) => {
  const sessionData = await STRIPE.checkout.sessions.create({
    line_items: lineItems,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery",
          type: "fixed_amount",
          fixed_amount: {
            amount: deliveryPrice,
            currency: "usd",
          },
        },
      },
    ],
    mode: "payment",
    metadata: {
      orderId,
      restaurantId,
    },
    success_url: `${FRONTEND_URL}/order-status?success=true`,
    cancel_url: `${FRONTEND_URL}/detail/${restaurantId}?cancelled=true`,
  });

  return sessionData;
};
