import express from "express";
const router = express.Router();
import  videoController from "../controllers/videoUpload.js";
import { authUser } from "../middleware/authUser.js";
import upload from "../services/Cloudinary.service.js";
router.post("/upload", authUser, upload.single('file'), videoController.upload);
router.get("/getAll", authUser, videoController.getAll);
export default router;