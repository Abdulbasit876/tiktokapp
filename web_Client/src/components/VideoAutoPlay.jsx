
import { useRef, useEffect } from 'react';  

const VideoAutoPlay = ({ src }) => {
  const videoRef = useRef(null);
 useEffect(() => {
  const video = videoRef.current;
  if (!video) return;

  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        video.play().catch((err) => {
          console.warn("Play error:", err);
        });
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(video);
  return () => observer.disconnect();
}, []);

  return (
    <video
      ref={videoRef}
      src={src}
      controls
      loop
      muted
      className="rounded-xl w-full aspect-video bg-black"
      playsInline
    />
  );
};

export default VideoAutoPlay;