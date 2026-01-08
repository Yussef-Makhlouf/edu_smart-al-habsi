import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-paper min-h-screen">
      <Navbar />

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Philosophy / Value Proposition */}
      <section className="py-24 relative overflow-hidden bg-paper">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl" />
              <h2 className="text-4xl md:text-5xl font-bold text-navy leading-tight mb-8 relative z-10">
                القيادة ليست <br />
                <span className="text-gold">وجهة</span>، بل <br />
                <span className="text-navy">عقلية.</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                في عالم يتغير بسرعة، الأدوات التقليدية لم تعد تكفي. نحن نقدم لك خلاصة تجارب حقيقية، واستراتيجيات مُجربة لبناء كيانات اقتصادية قوية ومستدامة.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "تحليل عميق للأسواق الحديثة",
                  "استراتيجيات قيادة فرق العمل عن بعد",
                  "فن التفاوض وإغلاق الصفقات الكبرى"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-navy font-medium">
                    <CheckCircle2 className="text-gold" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/about">
                <Button variant="outline" className="text-navy border-navy hover:bg-navy hover:text-white">
                  اقرأ المزيد عن فلسفتنا
                </Button>
              </Link>
            </div>
            <div className="relative h-[500px] w-full bg-navy/5 rounded-lg overflow-hidden border border-navy/10">
              <div className="absolute inset-0 bg-gradient-to-br from-navy/10 to-transparent" />
              <div className="w-full h-full flex items-center justify-center text-navy/30 text-xl">
                صورة الدكتور محمد الحبسي
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Courses */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <SectionHeading
            title="مسارات التميز"
            subtitle="أحدث الإصدارات"
            align="center"
            variant="dark"
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CourseCard
              category="القيادة"
              title="أسرار القيادة الاستراتيجية"
              description="كيف تحول رؤيتك إلى واقع ملموس وتقود فريقك نحو تحقيق المستحيل في بيئة عمل متغيرة."
              price="1200 SAR"
              image="/course1.jpg"
              href="/courses/leadership-secrets"
            />
            <CourseCard
              category="ريادة الأعمال"
              title="تأسيس المشاريع الرقمية"
              description="الدليل الشامل لبناء شركة ناشئة قابلة للنمو، من الفكرة إلى أول مليون ريال."
              price="950 SAR"
              image="/course2.jpg"
              href="/courses/digital-startup"
            />
            <CourseCard
              category="التطوير الشخصي"
              title="عقلية الثراء والحكمة"
              description="أعد برمجة عقلك للتعامل مع المال والفرص بطريقة الأثرياء الحكماء."
              price="750 SAR"
              image="/course3.jpg"
              href="/courses/wealth-mindset"
            />
          </div>

          <div className="mt-16 text-center">
            <Link href="/courses">
              <Button variant="link" className="text-xl text-navy decoration-gold decoration-2 underline-offset-8 hover:text-gold">
                استعراض كل المسارات التعليمية <ArrowLeft className="mr-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Newsletter / Call to Action */}
      <section className="py-24 bg-navy relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent opacity-50" />
        <div className="container relative z-10 px-6 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            هل أنت مستعد <span className="text-gold">للتغيير؟</span>
          </h2>
          <p className="text-gray-300 mb-10 text-lg">
            انضم إلى الآلاف من القادة الذين غيروا مسار حياتهم المهنية والمالية من خلال برامجنا.
          </p>
          <Link href="/courses">
            <Button variant="gold" size="lg" shape="sharp" className="w-full md:w-auto px-12 py-6 text-lg text-navy font-bold">
              ابدأ رحلتك الآن
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
