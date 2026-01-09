"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Play, ArrowLeft, ChevronDown } from "lucide-react";

export function Hero() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-dark to-navy z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/15 via-transparent to-transparent opacity-60" />

        {/* Animated dots pattern */}
        <div
          className="absolute inset-0 opacity-10 z-20"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, #d4af37 1.5px, transparent 1.5px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-2 h-2 bg-gold rounded-full z-20"
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 right-20 w-3 h-3 bg-gold/50 rounded-full z-20"
        animate={{ y: [0, 15, 0], opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-gold rounded-full z-20"
        animate={{ y: [0, -15, 0], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      <div className="container relative z-20 px-6 text-center mt-16 md:mt-0">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block py-2 px-5 border border-gold/50 rounded-full text-gold text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-sm bg-gold/5">
            منصة القادة الاستثنائيين
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          اصنع مستقبلك <br />
          <motion.span
            className="text-gold font-heading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            بذكاء وقيادة
          </motion.span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="max-w-2xl mx-auto text-lg md:text-xl text-white/80 mb-12 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          منصة محمد الحبسي التعليمية ليست مجرد دورات، بل رحلة تحول كاملة لقادة
          الأعمال ورواد المستقبل. اكتشف استراتيجيات النجاح الحقيقية.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link href="/courses">
            <Button
              variant="gold"
              size="lg"
              shape="sharp"
              className="min-w-[200px] text-navy font-bold group"
            >
              تصفح الدورات
              <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            shape="sharp"
            className="min-w-[200px] text-white border-white/30 hover:bg-white/10 hover:border-white/50 group"
          >
            <Play className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
            شاهد قصتنا
          </Button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/50 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="flex items-center gap-2">
            <span className="text-gold font-bold text-lg">+10,000</span>
            <span>متدرب</span>
          </div>
          <div className="w-1 h-1 bg-white/30 rounded-full hidden md:block" />
          <div className="flex items-center gap-2">
            <span className="text-gold font-bold text-lg">+50</span>
            <span>دورة</span>
          </div>
          <div className="w-1 h-1 bg-white/30 rounded-full hidden md:block" />
          <div className="flex items-center gap-2">
            <span className="text-gold font-bold text-lg">95%</span>
            <span>رضا المتدربين</span>
          </div>
        </motion.div>
      </div>

      {/* Abstract Decorative Elements */}
      <div className="absolute bottom-5 md:bottom-10 left-10 w-24 h-24 border-l-2 border-b-2 border-gold/20" />
      <div className="absolute top-20 md:top-10 right-10 w-24 h-24 border-r-2 border-t-2 border-gold/20" />

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-gold transition-colors z-30"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.button>
    </section>
  );
}
