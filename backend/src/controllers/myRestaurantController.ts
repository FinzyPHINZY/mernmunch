import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import Order from "../models/order";

const uploadImg = async (file: Express.Multer.File) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;
  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

  return uploadResponse.url;
};

export = {
  getRestaurant: async (req: Request, res: Response) => {
    try {
      const restaurant = await Restaurant.findOne({ user: req.userId });

      if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }

      res.json(restaurant);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching restaurant" });
    }
  },

  createResturant: async (req: Request, res: Response) => {
    try {
      const existingRestaurant = await Restaurant.findOne({ user: req.userId });
      console.log("ExistingRestaurant: ", existingRestaurant);

      if (existingRestaurant) {
        return res.status(409).json({
          success: false,
          message: "Restaurant already exists for the user",
        });
      }

      // const image = req.file as Express.Multer.File;
      // console.log("image: ", image);
      // const base64Image = Buffer.from(image.buffer).toString("base64");
      // const dataURI = `data:${image.mimetype};base64,${base64Image}`;
      // const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

      const imageUrl = await uploadImg(req.file as Express.Multer.File);

      const restaurant = new Restaurant(req.body);
      restaurant.imageUrl = imageUrl;
      restaurant.user = new mongoose.Types.ObjectId(req.userId);

      await restaurant.save();

      res.status(201).send(restaurant);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  },

  updateRestaurant: async (req: Request, res: Response) => {
    try {
      const restaurant = await Restaurant.findOne({
        user: req.userId,
      });

      if (!restaurant) {
        return res.status(404).json({
          success: false,
          message: "restaurant not found",
        });
      }

      restaurant.restaurantName = req.body.restaurantName;
      restaurant.city = req.body.city;
      restaurant.deliveryPrice = req.body.deliveryPrice;
      restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
      restaurant.cuisines = req.body.cuisines;
      restaurant.menuItems = req.body.menuItems;

      if (req.file) {
        const imageUrl = await uploadImg(req.file as Express.Multer.File);
        restaurant.imageUrl = imageUrl;
      }

      await restaurant.save();

      res.status(200).send({ restaurant });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  },

  getMyRestaurant: async (req: Request, res: Response) => {
    try {
      const restaurant = await Restaurant.findOne({ user: req.userId });

      if (!restaurant) {
        return res.status(404).json({
          success: false,
          message: "Restaurant not found",
        });
      }

      const orders = await Order.find({ restaurant: restaurant._id })
        .populate("restaurant")
        .populate("user");

      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  },

  updateOrderStatus: async (req: Request, res: Response) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;

      const order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      const restaurant = await Restaurant.findById(order.restaurant);

      if (restaurant?.user?._id.toString() !== req.userId) {
        return res.status(401).send();
      }

      order.status = status;

      await order.save();

      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Unable to update order status",
      });
    }
  },
};
