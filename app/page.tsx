"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { StatsSection } from "@/components/StatsSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { LearningJourneySection } from "@/components/LearningJourneySection";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CoursesSection } from "@/components/course/CoursesSection";

export default function Home() {
  return (
    <main className="bg-paper min-h-screen">
      <Navbar />

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Stats Section */}
      <StatsSection />

      {/* 3. Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* 4. Featured Courses */}
      {/* <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <FadeIn direction="down">
            <SectionHeading
              title="مسارات التميز"
              subtitle="أحدث الإصدارات"
              align="center"
              variant="dark"
              className="mb-16"
            />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0.2}>
              <CourseCard
                category="القيادة"
                title="أسرار القيادة الاستراتيجية"
                description="كيف تحول رؤيتك إلى واقع ملموس وتقود فريقك نحو تحقيق المستحيل في بيئة عمل متغيرة."
                price="1200 SAR"
                image="/course1.jpg"
                href="/courses/leadership-secrets"
              />
            </FadeIn>
            <FadeIn delay={0.4}>
              <CourseCard
                category="ريادة الأعمال"
                title="تأسيس المشاريع الرقمية"
                description="الدليل الشامل لبناء شركة ناشئة قابلة للنمو، من الفكرة إلى أول مليون ريال."
                price="950 SAR"
                image="/course2.jpg"
                href="/courses/digital-startup"
              />
            </FadeIn>
            <FadeIn delay={0.6}>
              <CourseCard
                category="التطوير الشخصي"
                title="عقلية الثراء والحكمة"
                description="أعد برمجة عقلك للتعامل مع المال والفرص بطريقة الأثرياء الحكماء."
                price="750 SAR"
                image="/course3.jpg"
                href="/courses/wealth-mindset"
              />
            </FadeIn>
          </div>

          <div className="mt-16 text-center">
            <FadeIn delay={0.8}>
              <Link href="/courses">
                <Button
                  variant="link"
                  className="text-sm md:text-xl text-navy decoration-gold decoration-2 underline-offset-8 hover:text-gold transition-colors"
                >
                  استعراض كل المسارات التعليمية <ArrowLeft className="mr-2" />
                </Button>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section> */}

      <CoursesSection />

      {/* 5. Learning Journey Section */}
      <LearningJourneySection />

      {/* 6. Testimonials Section */}
      <TestimonialsSection />

      {/* 7. About Founder Section */}
      <section className="py-24 relative overflow-hidden bg-paper">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl" />
                <span className="text-gold font-bold tracking-widest uppercase text-sm mb-4 block">
                  القصة وراء المنصة
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-navy leading-tight mb-8 relative z-10">
                  القيادة ليست <br />
                  <span className="text-gold">وجهة</span>، بل <br />
                  <span className="text-navy">عقلية.</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  في عالم يتغير بسرعة، الأدوات التقليدية لم تعد تكفي. نحن نقدم
                  لك خلاصة تجارب حقيقية، واستراتيجيات مُجربة لبناء كيانات
                  اقتصادية قوية ومستدامة.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "تحليل عميق للأسواق الحديثة",
                    "استراتيجيات قيادة فرق العمل عن بعد",
                    "فن التفاوض وإغلاق الصفقات الكبرى",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-navy font-medium"
                    >
                      <CheckCircle2 className="text-gold" size={20} />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/about">
                  <Button variant="outline-dark" className="px-8">
                    اقرأ المزيد عن فلسفتنا
                  </Button>
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} direction="left">
              <div className="relative h-[500px] w-full">
                {/* Decorative frame */}
                <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-gold/30 rounded-lg -z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent rounded-lg z-10 pointer-events-none" />
                <Image
                  src="/habsi.jpeg"
                  alt="محمد الحبسي - المؤسس والمدرب الرئيسي"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 8. Final CTA Section */}
      <section className="py-24 bg-navy relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-gold/15 via-transparent to-transparent opacity-60" />

        {/* Decorative elements */}
        <div className="absolute bottom-10 left-10 w-32 h-32 border-l-2 border-b-2 border-gold/20" />
        <div className="absolute top-10 right-10 w-32 h-32 border-r-2 border-t-2 border-gold/20" />

        <FadeIn direction="up">
          <div className="container relative z-10 px-6 max-w-3xl mx-auto">
            <span className="text-gold font-bold tracking-widest uppercase text-sm mb-6 block">
              ابدأ الآن
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              هل أنت مستعد <span className="text-gold">للتغيير؟</span>
            </h2>
            <p className="text-gray-300 mb-10 text-lg md:text-xl leading-relaxed">
              انضم إلى الآلاف من القادة الذين غيروا مسار حياتهم المهنية والمالية
              من خلال برامجنا. رحلتك نحو التميز تبدأ بخطوة واحدة.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/courses">
                <Button
                  variant="gold"
                  size="lg"
                  shape="sharp"
                  className="min-w-[200px] px-12 py-6 text-lg text-navy font-bold transition-all duration-300"
                >
                  ابدأ رحلتك الآن
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  shape="sharp"
                  className="min-w-[200px] text-navy border-white/30 hover:bg-white/10 hover:border-white/50"
                >
                  تواصل معنا
                </Button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </main>
  );
}
