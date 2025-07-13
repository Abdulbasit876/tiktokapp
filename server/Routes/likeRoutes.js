import express from "express";
const router = express.Router();
import  {likeVideo}  from "../controllers/likes.js";
import { authUser } from "../middleware/authUser.js";

router.post("/:videoId/like", authUser, likeVideo);

export default router;