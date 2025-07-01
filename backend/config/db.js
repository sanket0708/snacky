import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://sanketmudhulkar98:sanket0708@cluster0.zmqbqzx.mongodb.net/snacky"
    )
    .then(() => {
      console.log("MongoDB connected successfully");
    });
};
