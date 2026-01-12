"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  variant?: "blue" | "purple" | "gradient";
}

export function CourseCard({
  title,
  description,
  image,
  href,
  variant = "gradient",
}: CourseCardProps) {
  return (
    <div className="group relative max-w-[300px] h-[360px] rounded-2xl overflow-hidden  transition-all duration-300 transform ">
      {/* Image Section */}
      <div className="relative h-[180px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Badge/Logo Overlay for specific variants */}
        {/* {variant === "purple" && (
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 3.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM10 12a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-purple-600">
                المسار السريع
              </div>
              <div className="text-xs text-gray-600">للنجاح والتميز</div>
            </div>
          </div>
        )} */}
      </div>

      {/* Content Section */}
      <div className="relative h-[180px] bg-white flex flex-col justify-between">
        <div className="px-6 pt-6 ">
          <h3 className="text-xl font-bold text-navy mb-2 leading-tight line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* Button */}
        <Link href={href}>
          <button className="cursor-pointer w-full bg-gold hover:bg-gold-dim text-white font-bold py-3 px-4  transition-all duration-300 flex items-center justify-between gap-2 group/button">
            <span>عرض الدورة</span>

            <ChevronLeft
              size={20}
              className="transition-transform group-hover/button:-translate-x-1"
            />
          </button>
        </Link>
      </div>

      {/* Decorative Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gold/30 transition-all duration-300 pointer-events-none" />
    </div>
  );
}
