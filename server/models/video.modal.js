
import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
},{
  timestamps: true});

const Video = mongoose.model("Video", videoSchema);
export default Video;
