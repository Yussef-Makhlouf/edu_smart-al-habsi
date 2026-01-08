import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { CourseCard } from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

// Sample courses data with slugs
const courses = [
    { id: 1, slug: "leadership-secrets", category: "القيادة", title: "أسرار القيادة الاستراتيجية", description: "كيف تحول رؤيتك إلى واقع ملموس وتقود فريقك نحو تحقيق المستحيل.", price: "1200 SAR" },
    { id: 2, slug: "crisis-management", category: "القيادة", title: "فن إدارة الأزمات الكبرى", description: "دورة مكثفة تأخذك في رحلة عميقة لفهم كيفية إدارة الأزمات واتخاذ قرارات مصيرية.", price: "1100 SAR" },
    { id: 3, slug: "digital-startup", category: "ريادة الأعمال", title: "تأسيس المشاريع الرقمية", description: "الدليل الشامل لبناء شركة ناشئة قابلة للنمو، من الفكرة إلى أول مليون ريال.", price: "950 SAR" },
    { id: 4, slug: "emerging-markets", category: "المالية", title: "الاستثمار في الأسواق الناشئة", description: "فهم ديناميكيات الأسواق الناشئة وكيفية الاستثمار فيها بذكاء.", price: "1300 SAR" },
    { id: 5, slug: "wealth-mindset", category: "التطوير الشخصي", title: "عقلية الثراء والحكمة", description: "أعد برمجة عقلك للتعامل مع المال والفرص بطريقة الأثرياء الحكماء.", price: "750 SAR" },
    { id: 6, slug: "personal-branding", category: "التسويق", title: "بناء العلامة الشخصية", description: "كيف تبني حضورًا رقميًا قويًا يجعلك مرجعًا في مجالك.", price: "850 SAR" },
];

export default function CoursesPage() {
    return (
        <main className="bg-navy min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 bg-navy">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent opacity-50" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <span className="text-gold text-sm font-bold tracking-widest uppercase mb-4 block">استثمر في عقلك</span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">مكتبة الدورات</h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        اختر من بين مجموعة متنوعة من الدورات المصممة لتطوير مهاراتك وتحقيق أهدافك
                    </p>
                </div>
            </div>

            {/* Courses Section */}
            <div className="relative py-16 bg-paper">
                <div className="container mx-auto px-6">
                    {/* Filter Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-16 border-b border-gray-200 pb-6">
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            <Button variant="gold" shape="sharp" size="sm" className="font-bold text-navy">الكل</Button>
                            <Button variant="ghost" shape="sharp" size="sm" className="text-gray-500 hover:text-navy hover:bg-navy/5">القيادة</Button>
                            <Button variant="ghost" shape="sharp" size="sm" className="text-gray-500 hover:text-navy hover:bg-navy/5">المالية</Button>
                            <Button variant="ghost" shape="sharp" size="sm" className="text-gray-500 hover:text-navy hover:bg-navy/5">التسويق</Button>
                            <Button variant="ghost" shape="sharp" size="sm" className="text-gray-500 hover:text-navy hover:bg-navy/5">ريادة الأعمال</Button>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2 border-navy/20 text-navy hover:bg-navy/5">
                            <Filter size={14} /> تصفية النتائج
                        </Button>
                    </div>

                    {/* Courses Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course) => (
                            <CourseCard
                                key={course.id}
                                category={course.category}
                                title={course.title}
                                description={course.description}
                                price={course.price}
                                image={`/course${course.id}.jpg`}
                                href={`/courses/${course.slug}`}
                            />
                        ))}
                    </div>

                    <div className="mt-20 text-center">
                        <Button variant="outline" size="lg" className="border-gold text-gold hover:bg-gold hover:text-navy font-bold px-8">
                            تحميل المزيد
                        </Button>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
