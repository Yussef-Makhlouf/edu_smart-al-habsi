"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-navy bg-opacity" style={{backgroundImage: 'url(/hero-background.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
      {/* Creative Background - Diagonal Split */}
      <div className="absolute inset-0">
        {/* Dark base */}
        <div className="absolute inset-0 bg-navy" />

        {/* Large diagonal accent */}
        <div
          className="absolute top-0 right-0 w-2/3 h-full bg-navy-dark"
          style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }}
        />

        {/* Gold thin diagonal line */}
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: 'linear-gradient(135deg, transparent 49.5%, hsl(43 65% 53% / 0.3) 49.5%, hsl(43 65% 53% / 0.3) 50.5%, transparent 50.5%)'
          }}
        />

        {/* Vertical accent lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-gold/10 via-transparent to-gold/10" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-6 py-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* Left: Large decorative number */}
          <motion.div
            className="hidden lg:block lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <span className="text-[200px] font-bold text-gold/[0.08] leading-none select-none">
                15
              </span>
              <div className="absolute bottom-8 right-0 text-right">
                <span className="block text-gold text-sm font-bold">+15</span>
                <span className="block text-white/40 text-xs">سنة خبرة</span>
              </div>
            </div>
          </motion.div>

          {/* Center: Main Content */}
          <div className="lg:col-span-7 lg:col-start-4">
            {/* Tagline with unique styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-3">
                <div className="w-12 h-px bg-gold" />
                <span className="text-gold text-sm font-bold tracking-[0.3em] uppercase">
                  منصة القادة
                </span>
                <Sparkles className="w-4 h-4 text-gold" />
              </div>
            </motion.div>

            {/* Main Heading - Split style */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05]">
                <span className="block text-white">اصنع</span>
                <span className="block text-white">مستقبلك</span>
                <span className="relative inline-block mt-2">
                  <span className="text-gold">بذكاء وقيادة</span>
                  {/* Underline accent */}
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-l from-gold via-gold to-transparent" />
                </span>
              </h1>
            </motion.div>

            {/* Description with border accent */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative pr-6 border-r-2 border-gold/30 mb-12"
            >
              <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-lg">
                منصة محمد الحبسي التعليمية ليست مجرد دورات، بل رحلة تحول كاملة لقادة
                الأعمال ورواد المستقبل.
              </p>
            </motion.div>

            {/* CTA Buttons - Unique layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center gap-6"
            >
              <Link href="/courses">
                <Button
                  variant="gold"
                  size="lg"
                  className="min-w-[180px] text-navy font-bold group"
                >
                  <span>تصفح الدورات</span>
                  <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </Button>
              </Link>

           
            </motion.div>
          </div>

          {/* Right: Stats vertical strip */}
          <motion.div
            className="hidden lg:flex lg:col-span-2 lg:col-start-11 flex-col justify-center gap-12"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { number: "+5K", label: "متدرب" },
              { number: "+20", label: "دورة" },
            ].map((stat, index) => (
              <div key={index} className="relative">
                {/* Decorative corner */}
                <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-gold/50" />
                <div className="pr-4">
                  <span className="block text-3xl font-bold text-white">{stat.number}</span>
                  <span className="text-white/50 text-sm">{stat.label}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom decorative strip */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="h-16 bg-gradient-to-t from-navy-dark/50 to-transparent" />
      </div>
    </section>
  );
}
