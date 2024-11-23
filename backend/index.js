import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js";
const app= express();
dotenv.config();
const Port=process.env.PORT || 4000;
app.use(express.json());
app.use(cookieParser)
app.use("/api/auth",authRoutes);
app.listen(Port,()=> {
  console.log(`server running in ${Port}`);
  connectDB();
})
  