import { likeVideo } from "../controllers/likes";
import express from "express";
const router = express.Router();
import { authUser } from "../middleware/authUser.js";

router.post("/:videoId/like", authUser, likeVideo);