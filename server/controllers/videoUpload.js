
import Video from "../models/video.modal.js";

class videoController {
  // Upload a new video
 static async upload(req, res) {
    try {
      // req.file should be set by multer middleware
      const { description } = req.body;
      const userId = req.user?._id || req.body.userId; 
      if (!req.file || !userId) {
        return res.status(400).json({ message: "Video file and user are required" });
      }
      const videoUrl = req.file.path; 
      const video = new Video({
        user: userId,
        videoUrl,
        description,
      });
      await video.save();
      res.status(201).json({ message: "Video uploaded successfully", video });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
 static async getAll(req, res) {
    try {
      const videos = await Video.find().populate("user", "username profilePic").sort({ createdAt: -1 });
      res.status(200).json(videos);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
 
}

export default videoController;
