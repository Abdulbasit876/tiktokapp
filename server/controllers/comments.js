import Video from "../models/video.modal.js";
export const commentsController = async (req,res)=>{
    const { videoId } = req.params;
    const { comment } = req.body;
    const userId = req.user._id;

    if (!comment) {
        return res.status(400).json({ message: "Comment cannot be empty" });
    }

    try {
        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        const newComment = {
            user: userId,
            text: comment,
            createdAt: new Date()
        };

        video.comments.push(newComment);
        await video.save();

        res.status(201).json({ message: "Comment added successfully", comment: newComment });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
   
}
export const getComments = async (req, res) => {
    const { videoId } = req.params;

    try {
        const video = await Video.findById(videoId).populate("comments.user", "username profilePic");
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        res.status(200).json(video.comments);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}
export const deleteComment = async (req, res) => {
    const { videoId, commentId } = req.params;
    const userId = req.user._id;

    try {
        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        const commentIndex = video.comments.findIndex(comment => comment._id.toString() === commentId && comment.user.toString() === userId);
        if (commentIndex === -1) {
            return res.status(404).json({ message: "Comment not found or you do not have permission to delete it" });
        }

        video.comments.splice(commentIndex, 1);
        await video.save();

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}
export const updateComment = async (req, res) => {
    const { videoId, commentId } = req.params;
    const { text } = req.body;
    const userId = req.user._id;

    if (!text) {
        return res.status(400).json({ message: "Comment text cannot be empty" });
    }

    try {
        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        const comment = video.comments.find(comment => comment._id.toString() === commentId && comment.user.toString() === userId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found or you do not have permission to update it" });
        }

        comment.text = text;
        await video.save();

        res.status(200).json({ message: "Comment updated successfully", comment });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}
