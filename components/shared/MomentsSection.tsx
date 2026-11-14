"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import type { YouTubeVideo } from "@/services/gallery";

type DisplayVideo = Pick<YouTubeVideo, "id" | "title" | "description" | "videoId">;

const fallbackVideos: DisplayVideo[] = [
  {
    id: "fallback-1",
    title: "Annual Function: Save the Girl",
    videoId: "FzyWBVnk2AI",
    description: "Role Play",
  },
  {
    id: "fallback-2",
    title: "Annual Function: Social Media Drama",
    videoId: "OtgtJPoV9rU",
    description: "Drama",
  },
  {
    id: "fallback-3",
    title: "Annual Function: Cultural Dance Program",
    videoId: "sAWoT8YfAAE",
    description: "Cultural Dance",
  },
  {
    id: "fallback-4",
    title: "Annual Function: Vande Mataram",
    videoId: "fqRiTqlmNLI",
    description: "Patritic Performance",
  },
];

export default function MomentsSection({ videos }: { videos: DisplayVideo[] }) {
  const displayVideos = videos.length > 0 ? videos : fallbackVideos;
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const activeVideo = displayVideos.find((video) => video.videoId === activeVideoId) ?? displayVideos[0];

  return (
    <section className="bg-gradient-to-b from-black via-gray-900 to-black text-white py-16 px-6">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold">
          Moments at <span className="text-yellow-400">RM Suncity School</span>
        </h2>
        <p className="text-gray-400 mt-3">
          Watch our events, celebrations & achievements
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* 🎬 Featured YouTube Video */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-2xl"
        >
          <iframe
            className="w-full h-[300px] md:h-[400px]"
            src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1&mute=1`}
            title={activeVideo.title}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </motion.div>

        {/* 🎞️ Video List */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {displayVideos.map((video) => (
            <motion.div
              key={video.id}
              whileHover={{ scale: 1.03 }}
              onClick={() => setActiveVideoId(video.videoId)}
              className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition ${
                activeVideo.videoId === video.videoId
                  ? "bg-yellow-500/10 border border-yellow-400"
                  : "bg-white/5"
              }`}
            >
              {/* Thumbnail (auto from YouTube) */}
              <div className="relative w-28 h-18 rounded-lg overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />

                {/* Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <FaPlay className="text-white text-lg" />
                </div>
              </div>

              {/* Info */}
              <div>
                <h3 className="font-semibold">{video.title}</h3>
                <p className="text-sm text-gray-400">{video.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}