"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { CourseCard } from "./CourseCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  href: string;
  variant?: "blue" | "purple" | "gradient";
}

interface CoursesCarouselProps {
  courses: Course[];
}

export function CoursesCarousel({ courses }: CoursesCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="relative max-w-5xl mx-auto px-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={12}
        slidesPerView={1}
        centeredSlides={true}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-white/40",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-gold !w-12",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 12,
            centeredSlides: true,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 12,
            centeredSlides: true,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 12,
            centeredSlides: true,
          },
        }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="!pb-16"
      >
        {courses.map((course) => (
          <SwiperSlide key={course.id} className="!flex !justify-center">
            <CourseCard
              title={course.title}
              description={course.description}
              image={course.image}
              href={course.href}
              variant={course.variant}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      {/* <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
        aria-label="Previous slide"
      >
        <ChevronRight
          size={24}
          className="text-navy group-hover:text-gold transition-colors"
        />
      </button>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
        aria-label="Next slide"
      >
        <ChevronLeft
          size={24}
          className="text-navy group-hover:text-gold transition-colors"
        />
      </button> */}

      {/* Custom Styles */}
      <style jsx global>{`
        .swiper-pagination {
          bottom: 0 !important;
        }
        .swiper-pagination-bullet {
          width: 12px !important;
          height: 12px !important;
          transition: all 0.3s ease !important;
        }
        .swiper-pagination-bullet-active {
          border-radius: 6px !important;
        }
      `}</style>
    </div>
  );
}