"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, Clock } from "lucide-react";

interface CourseCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  price: string;
  href: string;
}

export function CourseCard({
  title,
  description,
  image,
  category,
  price,
  href,
}: CourseCardProps) {
  return (
    <div className="group relative w-full max-w-sm">
      {/* Offset border effect */}
      <div className="absolute top-3 -left-3 w-full h-full border-2 border-gold/20 rounded-lg transition-all duration-300 group-hover:top-4 group-hover:-left-4 group-hover:border-gold/40 -z-10" />

      {/* Main Card */}
      <div className="relative bg-white rounded-lg border border-gray-100 overflow-hidden flex flex-col h-[420px]">
        {/* Image Container */}
        <div className="relative h-52 overflow-hidden">
          {/* Category Badge */}
          <div className="absolute top-4 right-4 z-10 bg-navy px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-gold">
            {category}
          </div>

          {/* Image */}
          <div className="w-full h-full bg-gray-100">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-navy/5 group-hover:bg-navy/10 transition-colors duration-300" />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1 bg-white">
          {/* Meta */}
          <div className="flex items-center gap-3 mb-3 text-xs text-gray-500 font-medium">
            <span className="flex items-center gap-1">
              <Star size={12} className="text-gold fill-gold" /> 4.9
            </span>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <span className="flex items-center gap-1">
              <Clock size={12} /> 12 ساعة
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-gold transition-colors duration-200 line-clamp-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 flex-1">
            {description}
          </p>

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-lg font-bold text-gold">{price}</span>
            <Link
              href={href}
              className="flex items-center gap-2 text-navy font-bold text-sm hover:text-gold transition-colors"
            >
              التفاصيل
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
