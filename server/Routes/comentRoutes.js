import express from "express";
const router = express.Router();
import { commentsController,getComments,deleteComment,updateComment } from "../controllers/comments.js";
import { authUser } from "../middleware/authUser.js";

router.post("/:videoId/comment", authUser, commentsController);
router.get("/:videoId/comments", authUser, getComments);
router.delete("/:videoId/comments/:commentId", authUser, deleteComment);
router.put("/:videoId/comments/:commentId", authUser, updateComment);

export default router;