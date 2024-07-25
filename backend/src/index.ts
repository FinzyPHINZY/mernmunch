import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";

import UserRoutes from "./routes/userRoute";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() =>
    console.log("SUCCESS: Connection to database was successfully established!")
  );

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("common"));
app.use("/api/user", UserRoutes);

app.listen(7000, () => {
  console.log(`server running on http://localhost:7000/ ...betta go catch it`);
});
