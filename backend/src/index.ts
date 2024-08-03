import "dotenv/config";
import cors from "cors";
import express, { Request, Response } from "express";
import morgan from "morgan";
import UserRoutes from "./routes/userRoute";
import myRestaurantRoutes from "./routes/myRestaurantRoute";
import RestaurantRoutes from "./routes/RestaurantRoute";
import connectDB from "./config/database";
import { v2 as cloudinary } from "cloudinary";

const PORT = process.env.PORT || 7000;

const app = express();

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json());
app.use(cors());
app.use(morgan("common"));

app.get("/health", (req: Request, res: Response) => {
  res.send({ message: "health ok!" });
});

app.use("/api/user", UserRoutes);
app.use("/api/restaurant", myRestaurantRoutes);
app.use("/api/restaurants", RestaurantRoutes);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:7000/ ...betta go catch it`);
});
