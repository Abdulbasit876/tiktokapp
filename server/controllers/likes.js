import Video from "../models/video.model.js";
export const likeVideo = async (req, res) => {
    const { videoId } = req.params;
    const userId = req.user._id;
    try {
        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }
        const alreadyLiked = video.likes.includes(userId);
        if (alreadyLiked) {
            video.likes = video.likes.filter(id => id.toString() !== userId.toString());
            await video.save();
            return res.status(200).json({ message: "Video unliked successfully", likesCount: video.likes.length });
        }
        video.likes.push(userId);
        await video.save();

        res.status(200).json({ message: "Video liked successfully", likesCount: video.likes.length });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}