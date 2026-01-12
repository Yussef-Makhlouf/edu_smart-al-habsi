"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { Banner } from "@/components/Banner";
import { Button } from "@/components/ui/button";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { LearningJourneySection } from "@/components/LearningJourneySection";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CoursesSection } from "@/components/course/CoursesSection";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="bg-paper min-h-screen">
      {/* Announcement Banner */}
      <Banner
        message="🎓 انضم لأكثر من 5000 متدرب - خصم 20% على جميع الدورات لفترة محدودة"
        ctaText="سجّل الآن"
        ctaHref="/courses"
      />

      <Navbar />

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. About Founder Section - Unique Design */}
      <section className="py-28 relative overflow-hidden bg-paper">
        {/* Large decorative text */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none select-none">
          <span className="text-[300px] font-bold text-navy/[0.02] leading-none">
            القائد
          </span>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* Image - Creative asymmetric design */}
            <motion.div
              className="lg:col-span-5 order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                {/* Background decorative square */}
                <div className="absolute -top-8 -right-8 w-full h-full bg-gold/10" />

                {/* Main image container */}
                <div className="relative h-[550px] w-full overflow-hidden">
                  <Image
                    src="/habsi.jpeg"
                    alt="محمد الحبسي - المؤسس والمدرب الرئيسي"
                    fill
                    className="object-cover"
                  />

                  {/* Corner accent overlay */}
                  <div className="absolute top-0 left-0 w-0 h-0 border-t-[80px] border-t-paper border-r-[80px] border-r-transparent" />
                </div>

                {/* Floating stats card */}
                <div className="absolute -bottom-6 -left-6 bg-navy p-6">
                  <div className="flex gap-8">
                    <div className="text-center">
                      <span className="block text-3xl font-bold text-gold">+15</span>
                      <span className="text-white/60 text-sm">سنة خبرة</span>
                    </div>
                    <div className="w-px bg-white/10" />
                    <div className="text-center">
                      <span className="block text-3xl font-bold text-gold">+5K</span>
                      <span className="text-white/60 text-sm">متدرب</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div>
                {/* Label */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-3 h-3 bg-gold" />
                  <div className="w-12 h-px bg-gold" />
                  <span className="text-gold text-sm font-bold tracking-widest uppercase">
                    القصة وراء المنصة
                  </span>
                </div>

                {/* Heading */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy leading-tight mb-8">
                  القيادة ليست
                  <br />
                  <span className="text-gold">وجهة</span>، بل
                  <br />
                  <span className="relative inline-block">
                    عقلية.
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-l from-gold via-gold to-transparent" />
                  </span>
                </h2>

                {/* Description with border */}
                <div className="relative pr-6 border-r-2 border-gold/30 mb-8">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    في عالم يتغير بسرعة، الأدوات التقليدية لم تعد تكفي. نحن نقدم
                    لك خلاصة تجارب حقيقية، واستراتيجيات مُجربة لبناء كيانات
                    اقتصادية قوية ومستدامة.
                  </p>
                </div>

                {/* Features list */}
                <ul className="space-y-4 mb-10">
                  {[
                    "تحليل عميق للأسواق الحديثة",
                    "استراتيجيات قيادة فرق العمل عن بعد",
                    "فن التفاوض وإغلاق الصفقات الكبرى",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-4 text-navy font-medium"
                    >
                      <div className="w-6 h-6 bg-gold/10 flex items-center justify-center">
                        <CheckCircle2 className="text-gold" size={16} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link href="/about" className="group inline-flex items-center gap-4">
                  <Button variant="outline-dark" size="lg" className="px-8">
                    اقرأ المزيد عن فلسفتنا
                  </Button>
                  <ArrowLeft className="w-5 h-5 text-navy group-hover:-translate-x-2 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* 4. Learning Journey Section */}
      <LearningJourneySection />

      {/* 5. Courses Section */}
      <CoursesSection />

      {/* 6. Testimonials Section */}
      <TestimonialsSection />

      <Footer />
    </main>
  );
}
