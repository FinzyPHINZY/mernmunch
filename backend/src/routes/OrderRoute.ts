import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import OrderController from "../controllers/OrderController";

const router = express.Router();

// desc             Fetch Order
// route            GET /api/checkout/
router.get("/", jwtCheck, jwtParse, OrderController.getMyOrders);

// desc             Create Checkout session
// route            POST /api/checkout/create-checkout-session
router.post(
  "/checkout/create-checkout-session",
  jwtCheck,
  jwtParse,
  OrderController.CreateCheckoutSession
);

// desc             Handle stripe webhook
// route            POST /api/order/checkout/webhook
router.post("/checkout/webhook", OrderController.stripeWebhookHandler);

export default router;
