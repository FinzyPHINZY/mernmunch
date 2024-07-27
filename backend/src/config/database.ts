import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_CONNECTION_STRING as string
    );
    console.log(
      `SUCCESS: Connection to database was successfully established! ~ ${conn.connection.host}`
    );
  } catch (error) {
    console.error("ERROR: Failed to connect to database:", error);
    process.exit(1);
  }
};

export default connectDB;
