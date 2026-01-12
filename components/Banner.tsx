"use client";

import { useState, useEffect } from "react";
import { X, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface BannerProps {
    message: string;
    ctaText?: string;
    ctaHref?: string;
    dismissible?: boolean;
}

export function Banner({
    message,
    ctaText = "اعرف المزيد",
    ctaHref = "/courses",
    dismissible = true,
}: BannerProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const dismissed = sessionStorage.getItem("banner-dismissed");
        if (dismissed === "true") {
            setIsVisible(false);
        }
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        sessionStorage.setItem("banner-dismissed", "true");
    };

    if (!isVisible || !isClient) return null;

    return (
        <div className="relative bg-gold text-navy z-[60]">
            {/* Diagonal stripe accent */}
            <div className="absolute inset-0 accent-stripe opacity-50" />

            <div className="container mx-auto px-6 py-3 relative">
                <div className="flex items-center justify-center gap-4 text-sm font-medium">
                    <span>{message}</span>

                    {ctaHref && (
                        <Link
                            href={ctaHref}
                            className="inline-flex items-center gap-1.5 font-bold hover:underline underline-offset-2"
                        >
                            {ctaText}
                            <ArrowLeft size={14} />
                        </Link>
                    )}
                </div>

                {dismissible && (
                    <button
                        onClick={handleDismiss}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-1 hover:bg-navy/10 transition-colors rounded"
                        aria-label="إغلاق"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>
        </div>
    );
}
