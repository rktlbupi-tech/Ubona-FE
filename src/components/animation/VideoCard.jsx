import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VideoCard = () => {
  const [play, setPlay] = useState(false);

  const videoUrl = "https://deorcw9qk0e0g.cloudfront.net/videos/Ubona%20Promo%20Video.mp4";

  // Optional: your own custom thumbnail
  const thumbnail = "/assets/images/home/ubona-bnr-thumb.webp"; 
  // If you don't have a thumbnail, I can generate one automatically.

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="mt-20 md:mt-40 px-4 xl:px-12 2xl:px-22">

        <div className="relative h-100 md:h-[504px] bg-[#021E37] border border-white rounded-2xl overflow-hidden">

          {/* Thumbnail */}
          {!play && (
            <motion.img
              key="thumbnail"
              src={thumbnail}
              alt="Video thumbnail"
              className="absolute inset-0 w-full h-full object-cover rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          )}

          {/* Overlay + Play button */}
          {!play && (
            <motion.div
              key="overlay"
              className="absolute inset-0 bg-black/50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <button
                onClick={() => setPlay(true)}
                className="w-20 h-20 rounded-full bg-white cursor-pointer flex items-center justify-center shadow-xl hover:scale-110 transition duration-300"
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="black">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </motion.div>
          )}

          {/* Video */}
          <AnimatePresence>
            {play && (
              <motion.video
                key="video"
                src={videoUrl}
                controls
                autoPlay
                className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            )}
          </AnimatePresence>

        </div>

      </div>
    </motion.div>
  );
};

export default VideoCard;