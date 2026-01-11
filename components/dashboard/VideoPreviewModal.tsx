"use client";

import { X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface VideoPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoUrl: string;
    title?: string;
}

// Helper function to extract video ID and platform
function getVideoEmbed(url: string): { type: "youtube" | "vimeo" | "direct"; embedUrl: string } | null {
    if (!url) return null;

    // YouTube patterns
    const youtubeMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (youtubeMatch) {
        return {
            type: "youtube",
            embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1`
        };
    }

    // Vimeo patterns
    const vimeoMatch = url.match(/(?:vimeo\.com\/)(\d+)/);
    if (vimeoMatch) {
        return {
            type: "vimeo",
            embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`
        };
    }

    // Direct video URL or Blob URL
    if (url.match(/\.(mp4|webm|ogg)$/i) || url.startsWith('blob:')) {
        return {
            type: "direct",
            embedUrl: url
        };
    }

    return null;
}

export function VideoPreviewModal({ isOpen, onClose, videoUrl, title }: VideoPreviewModalProps) {
    const videoEmbed = getVideoEmbed(videoUrl);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative w-full max-w-4xl bg-navy rounded-2xl overflow-hidden "
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/10">
                            <h3 className="font-bold text-white truncate">
                                {title || "معاينة الفيديو"}
                            </h3>
                            <div className="flex items-center gap-2">
                                <a
                                    href={videoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-gray-400 hover:text-white transition-colors"
                                >
                                    <ExternalLink size={18} />
                                </a>
                                <button
                                    onClick={onClose}
                                    className="p-2 text-gray-400 hover:text-white transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Video Content */}
                        <div className="aspect-video bg-black">
                            {videoEmbed ? (
                                videoEmbed.type === "direct" ? (
                                    <video
                                        src={videoEmbed.embedUrl}
                                        controls
                                        autoPlay
                                        className="w-full h-full"
                                    />
                                ) : (
                                    <iframe
                                        src={videoEmbed.embedUrl}
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                )
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                                    <p className="text-lg mb-2">رابط الفيديو غير صالح</p>
                                    <p className="text-sm text-gray-500">يرجى إدخال رابط YouTube أو Vimeo أو رابط فيديو مباشر</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
