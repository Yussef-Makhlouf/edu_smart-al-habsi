"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface CourseCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  category?: string;
  variant?: "blue" | "purple" | "gradient";
}

export function CourseCard({
  title,
  description,
  image,
  href,
  category = "دورة تدريبية",
}: CourseCardProps) {
  return (
    <div className="group relative max-w-[320px] bg-white overflow-hidden transition-all duration-300">
      {/* Corner accent - Top right */}
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[50px] border-t-gold border-l-[50px] border-l-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Image Section */}
      <div className="relative h-[200px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />

        {/* Floating tag */}
        <div className="absolute bottom-4 right-4 bg-navy/90 px-4 py-2 border-r-2 border-gold">
          <span className="text-gold text-xs font-bold uppercase tracking-wider">
            {category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative p-6 pb-0 bg-white">
        <h3 className="text-xl font-bold text-navy mb-3 leading-tight line-clamp-2 group-hover:text-gold transition-colors duration-200">
          {title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-6">
          {description}
        </p>
      </div>

      {/* Button - Edge to edge */}
      <Link href={href} className="block">
        <div className="relative bg-navy text-white font-bold py-4 px-6 transition-all duration-300 flex items-center justify-between group-hover:bg-gold group-hover:text-navy">
          <span>عرض الدورة</span>
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />

          {/* Animated underline */}
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300" />
        </div>
      </Link>

      {/* Left border accent */}
      <div className="absolute left-0 top-[200px] bottom-0 w-1 bg-transparent group-hover:bg-gold transition-colors duration-300" />
    </div>
  );
}
