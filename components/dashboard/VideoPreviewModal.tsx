"use client";

import { X, Minimize2, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface VideoPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
}

// Helper function to extract video ID and platform
function getVideoEmbed(
  url: string
): { type: "youtube" | "vimeo" | "bunny" | "direct"; embedUrl: string } | null {
  if (!url) return null;

  // YouTube patterns
  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (youtubeMatch) {
    return {
      type: "youtube",
      embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1`,
    };
  }

  // Vimeo patterns
  const vimeoMatch = url.match(/(?:vimeo\.com\/)(\d+)/);
  if (vimeoMatch) {
    return {
      type: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`,
    };
  }

  // Bunny CDN patterns (Includes both standard and secure embed domains)
  if (url.includes("bunnycdn.com") || url.includes("mediadelivery.net")) {
    return {
      type: "bunny",
      embedUrl: url,
    };
  }

  // Direct video URL or Blob URL (Fallback)
  if (url.match(/\.(mp4|webm|ogg)$/i) || url.startsWith("blob:")) {
    return {
      type: "direct",
      embedUrl: url,
    };
  }

  return null;
}

export function VideoPreviewModal({
  isOpen,
  onClose,
  videoUrl,
  title,
}: VideoPreviewModalProps) {
  const [activeUrl, setActiveUrl] = useState("");
  const [activeTitle, setActiveTitle] = useState("");
  const [isPipActive, setIsPipActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Sync with props
  useEffect(() => {
    if (videoUrl) {
      setActiveUrl(videoUrl);
      setActiveTitle(title || "");
    }
  }, [videoUrl, title]);

  // Reliable PiP tracking using video element events directly
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onEnter = () => {
      const pipEl = document.pictureInPictureElement;
      const isMyVideoInPip =
        !!pipEl &&
        (pipEl === videoRef.current ||
          (iframeRef.current && pipEl === iframeRef.current));
      setIsPipActive(!!isMyVideoInPip);
    };
    const onLeave = () => setIsPipActive(false);

    video.addEventListener("enterpictureinpicture", onEnter);
    video.addEventListener("leavepictureinpicture", onLeave);

    return () => {
      video.removeEventListener("enterpictureinpicture", onEnter);
      video.removeEventListener("leavepictureinpicture", onLeave);
    };
  }, []);

  // Set video src imperatively to avoid React re-rendering breaking PiP
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !activeUrl || activeUrl.includes(".m3u8")) return;

    // Only set src if it's different to prevent unnecessary changes
    if (video.src !== activeUrl) {
      video.src = activeUrl;
    }
  }, [activeUrl]);

  // HLS initialization
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !activeUrl || !activeUrl.includes(".m3u8")) return;

    let hls: any = null;
    if (!video.canPlayType("application/vnd.apple.mpegurl")) {
      const initHls = async () => {
        if (!(window as any).Hls) {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/npm/hls.js@latest";
          script.async = true;
          document.body.appendChild(script);
          await new Promise((resolve) => (script.onload = resolve));
        }
        const Hls = (window as any).Hls;
        if (Hls.isSupported()) {
          hls = new Hls();
          hls.loadSource(activeUrl);
          hls.attachMedia(video);
        }
      };
      initHls();
    } else {
      video.src = activeUrl;
    }

    return () => hls?.destroy();
  }, [activeUrl]); // Removed isOpen dependency to prevent destroying HLS when modal closes

  // CRITICAL: Stop video completely if closed and NOT in PiP
  useEffect(() => {
    if (!isOpen && !isPipActive && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute("src");
      videoRef.current.load();
    }
  }, [isOpen, isPipActive]);

  const videoEmbed = getVideoEmbed(activeUrl);
  const isDirect =
    videoEmbed?.type === "direct" ||
    activeUrl.includes(".m3u8") ||
    activeUrl.includes("b-cdn.net");

  // Only render the ACTUAL player if open or in PiP
  const shouldRenderPlayer = isOpen || isPipActive;

  if (!activeUrl) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-all duration-500",
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
      onClick={onClose}
    >
      <motion.div
        initial={false}
        animate={{
          scale: isOpen ? 1 : 0.8,
          y: isOpen ? 0 : 20,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-4xl bg-navy rounded-2xl overflow-hidden shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-white truncate max-w-[200px] md:max-w-md">
              {activeTitle || "معاينة الفيديو"}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {/* <a
                                    href={videoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-gray-400 hover:text-white transition-colors"
                                >
                                    <ExternalLink size={18} />
                                </a> */}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors bg-white/5 rounded-full hover:bg-white/10"
              title="إغلاق المعاينة"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Video Content */}
        <div className="aspect-video bg-black relative">
          <div className="absolute inset-0">
            {shouldRenderPlayer ? (
              isDirect ? (
                <video
                  ref={videoRef}
                  controls
                  autoPlay
                  className="w-full h-full"
                  playsInline
                />
              ) : (
                <iframe
                  ref={iframeRef}
                  src={videoEmbed?.embedUrl}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 italic">
                تم إيقاف المعاينة
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
