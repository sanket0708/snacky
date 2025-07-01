import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config';
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();

//middleware
app.use(express.json());
app.use(cors({
  origin: [
    "https://snacky-frontend.onrender.com", // main frontend
    "https://snacky-admin-rtk8.onrender.com",    // admin panel
    "http://localhost:5173",                // local dev
    "http://localhost:5174"                 // local admin dev
  ],
  credentials: true
}));

//db connection
connectDB();

//api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));

app.use("/api/user", userRouter)

app.use("/api/cart", cartRouter);

app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("Hello there api working");
});

if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });

}

export default server;

