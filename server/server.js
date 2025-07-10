
import dotenv from "dotenv";
dotenv.config();
import {server} from './app.js'
import connectDB from "./config/db.config.js";

connectDB();

server.listen(process.env.PORT, () => {
    console.log("App is running");
})