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
  category?: string;
  variant?: "blue" | "purple" | "gradient";
}

interface CoursesCarouselProps {
  courses: Course[];
}

export function CoursesCarousel({ courses }: CoursesCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="relative">
      {/* Custom Navigation Buttons */}
      <div className="flex justify-end gap-4 mb-8">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:bg-gold hover:text-navy hover:border-gold transition-all"
          aria-label="Previous"
        >
          <ChevronRight size={20} />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:bg-gold hover:text-navy hover:border-gold transition-all"
          aria-label="Next"
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        centeredSlides={false}
        pagination={{
          clickable: true,
          bulletClass:
            "swiper-pagination-bullet !bg-white/30 !w-2 !h-2 !rounded-none !rotate-45",
          bulletActiveClass:
            "swiper-pagination-bullet-active !bg-gold !w-3 !h-3",
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
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="!pb-16"
      >
        {courses.map((course) => (
          <SwiperSlide key={course.id}>
            <CourseCard
              title={course.title}
              description={course.description}
              image={course.image}
              href={course.href}
              category={course.category}
              variant={course.variant}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
