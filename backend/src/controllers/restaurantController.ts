import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import mongoose from "mongoose";
import cloudinary from "cloudinary";

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

      const image = req.file as Express.Multer.File;
      console.log("image: ", image);
      const base64Image = Buffer.from(image.buffer).toString("base64");
      const dataURI = `data:${image.mimetype};base64,${base64Image}`;
      const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
      console.log("Upload response: ", uploadResponse);

      const restaurant = new Restaurant(req.body);
      restaurant.imageUrl = uploadResponse.url;
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
};
