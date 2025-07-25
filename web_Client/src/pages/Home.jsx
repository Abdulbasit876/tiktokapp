
import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import VideoAutoPlay from "../components/VideoAutoPlay";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { Base_Url } from "../services";



const Home = () => {
  const [videos, setVideos] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uploadData, setUploadData] = useState({ description: "", file: null });
  const uploadRef = useRef(null);
  async function getProfile(token){
    try {
      const response = await axios.get(`${Base_Url}/user/getprofile`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const userProfile = response.data;
        setIsLoggedIn(true);
        console.log("User profile fetched successfully:", userProfile);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }
   const fetchVideos = async () => {
    try {
      const response = await axios.get(`${Base_Url}/video/getAll`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        console.log("Videos fetched successfully:", response.data);
        setVideos(response.data);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log(token)
    if (token) {
      getProfile(token);
      fetchVideos();
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      ".video-card",
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
    );
  }, [videos]);
   const navigate = useNavigate();
  const handleLogin = () =>{
     setIsLoggedIn(true);
     navigate("/login");
    }
  const handleLogout = async() =>{ 
   const res = await axios.get(`${Base_Url}/user/logout`)
    if (res.status === 200) {
      setIsLoggedIn(false);
      localStorage.removeItem("token");
    }
  };
  const handleUploadClick = () => setShowUpload(true);
  const handleUploadClose = () => setShowUpload(false);

  const handleUploadChange = (e) => {
    if (e.target.name === "file") {
      setUploadData({ ...uploadData, file: e.target.files[0] });
    } else {
      setUploadData({ ...uploadData, [e.target.name]: e.target.value });
    }
  };
  const handleUploadSubmit = async(e) => {
    e.preventDefault();
    if (!uploadData.file) return;
    const formData = new FormData();
    formData.append("file", uploadData.file);
    formData.append("description", uploadData.description);
    try {
      const response = await axios.post(`${Base_Url}/video/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 201) {
        setVideos([response.data.video, ...videos]);
        setUploadData({ description: "", file: null });
        setShowUpload(false);
        console.log("Video uploaded successfully:", response.data);
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex flex-col items-center">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-8 py-4 bg-white/80 shadow-md sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <svg width="40" height="40" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="28" stroke="#ec4899" strokeWidth="4" fill="#fff" />
            <text x="50%" y="55%" textAnchor="middle" fill="#ec4899" fontSize="24" fontWeight="bold" dy=".3em">🎵</text>
          </svg>
          <span className="text-2xl font-extrabold text-gray-900 tracking-tight">TikTok</span>
        </div>
        <div className="flex gap-4">
          {isLoggedIn ? (
            <>
              <button
                onClick={handleUploadClick}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-4 py-2 rounded-lg shadow transition-all"
              >
                Upload Video
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold px-4 py-2 rounded-lg shadow transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-4 py-2 rounded-lg shadow transition-all"
            >
              Login
            </button>
          )}
        </div>
      </header>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-20">
          <form
            ref={uploadRef}
            onSubmit={handleUploadSubmit}
            className="bg-white rounded-2xl p-8 flex flex-col gap-4 w-full max-w-md shadow-xl animate-fadeIn"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Upload Video</h3>
            <input
              type="file"
              name="file"
              accept="video/*"
              onChange={handleUploadChange}
              className="border border-gray-300 rounded-lg px-3 py-2"
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={uploadData.description}
              onChange={handleUploadChange}
              className="border border-gray-300 rounded-lg px-3 py-2"
              required
            />
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={handleUploadClose}
                className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-4 py-2 rounded-lg"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Feed */}
      <main className="flex flex-col items-center w-full max-w-lg mt-8 gap-8">
        {videos.map((video) => (
          <div
            key={video._id}
            className="video-card bg-white/90 rounded-2xl shadow-lg p-4 flex flex-col gap-2 w-full relative overflow-hidden"
          >
            <VideoAutoPlay src={video.videoUrl} />
            <div className="flex items-center gap-2 mt-2">
              <span className="font-bold text-pink-600">@{video.user.username}</span>
              <span className="text-gray-500 text-sm">• {video.description}</span>
            </div>
            <div className="flex gap-6 mt-2">
              <span className="flex items-center gap-1 text-pink-500 font-semibold">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" /></svg>
                {video.likes}
              </span>
              <span className="flex items-center gap-1 text-gray-500 font-semibold">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M18 10c0 3.866-3.582 7-8 7a8.96 8.96 0 01-4.688-1.313l-3.262.814a1 1 0 01-1.212-1.212l.814-3.262A8.96 8.96 0 012 10c0-3.418 3.134-8 8-8s8 4.582 8 8z" /></svg>
                {video.comments}
              </span>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Home;
