import express from "express";
const app = express()
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./Routes/userRoute.js";
import likeRoutes from "./Routes/likeRoutes.js";
import commentRoutes from "./Routes/comentRoutes.js";
import videoRoutes from "./Routes/VideoRoutes.js";

import dotenv from "dotenv";
dotenv.config();

app.use(express.json());
app.use(cors(
    {
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
    }
));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRoute);
app.use("/api/likes", likeRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
export { app as server };