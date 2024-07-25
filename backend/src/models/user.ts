import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    auth0Id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, match: /.+\@.+\..+/ },
    addressLine1: String,
    city: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
