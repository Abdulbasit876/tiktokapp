
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
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: String,
    createdAt: { type: Date, default: Date.now }
  }],
    views: {
      
        type: Number,
        default: 0
    },
},{
  timestamps: true});

const Video = mongoose.model("Video", videoSchema);
export default Video;
