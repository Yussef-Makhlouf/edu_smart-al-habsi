"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-dark to-navy z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent opacity-40" />
      </div>

      <div className="container relative z-20 px-6 text-center mt-16 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block  py-1 px-3 border border-gold/50 rounded-full text-gold text-xs font-bold tracking-widest uppercase mb-6">
            Mentor for Elite Business
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          اصنع مستقبلك <br />
          <span className="text-gold font-heading">بذكاء وقيادة</span>
        </motion.h1>

        <motion.p
          className="max-w-2xl mx-auto text-lg md:text-xl text-white/80 mb-12 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          منصة محمد الحبسي التعليمية ليست مجرد دورات، بل رحلة تحول كاملة لقادة
          الأعمال ورواد المستقبل. اكتشف استراتيجيات النجاح الحقيقية.
        </motion.p>

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
              className="min-w-[200px] text-navy font-bold"
            >
              تصفح الدورات
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            shape="sharp"
            className="text-black border-white/20 hover:bg-white/10 hover:text-white"
          >
            شاهد الفيديو التعريفي
          </Button>
        </motion.div>
      </div>

      {/* Abstract Decorative Elements */}
      <div className="absolute bottom-5 md:bottom-10 left-10 w-24 h-24 border-l-2 border-b-2 border-gold/20" />
      <div className="absolute top-20 md:top-10 right-10 w-24 h-24 border-r-2 border-t-2 border-gold/20" />
    </section>
  );
}
