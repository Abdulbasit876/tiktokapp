
import dotenv from "dotenv";
dotenv.config();
import {server} from './app.js'
import connectDB from "./config/db.config.js";

( async ()=>{
 await connectDB();
server.listen(process.env.PORT, () => {
    console.log("App is running");
});
})().catch((err) => {
    console.error("Error starting the server:", err);
    process.exit(1); // Exit the process with a failure code
});