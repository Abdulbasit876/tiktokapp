import express from "express";
const app = express()
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./Routes/userRoute.js";

import dotenv from "dotenv";
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRoute);

export { app as server };