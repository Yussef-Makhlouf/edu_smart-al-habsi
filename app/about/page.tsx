"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Target, Lightbulb, Users, Award, BookOpen, TrendingUp, GraduationCap, ArrowLeft } from "lucide-react";

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } }
};

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
};

// Statistics data
const stats = [
    { icon: Users, value: "10,000+", label: "متدرب ناجح" },
    { icon: BookOpen, value: "50+", label: "دورة متخصصة" },
    { icon: Award, value: "15+", label: "سنة خبرة" },
    { icon: TrendingUp, value: "95%", label: "نسبة الرضا" },
];

// Core values data
const coreValues = [
    {
        icon: Target,
        title: "التميز والإتقان",
        description: "نؤمن بأن الجودة ليست خيارًا بل ضرورة. كل محتوى نقدمه يمر بمراجعات دقيقة لضمان تقديم أفضل تجربة تعليمية."
    },
    {
        icon: Lightbulb,
        title: "الابتكار المستمر",
        description: "نواكب أحدث التطورات في عالم الأعمال والقيادة، ونعيد صياغة المفاهيم التقليدية بأساليب عصرية فعّالة."
    },
    {
        icon: GraduationCap,
        title: "التعلم التطبيقي",
        description: "لا نكتفي بالنظريات. كل درس مرتبط بتطبيقات عملية وتجارب حقيقية من السوق العربي والعالمي."
    },
];

export default function AboutPage() {
    return (
        <main className="bg-navy min-h-screen text-white overflow-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-40 pb-24 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy to-navy z-0" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent opacity-40" />

                <div className="container relative z-10 mx-auto px-6 text-center">
                    <motion.span
                        className="inline-block py-1.5 px-4 border border-gold/50 rounded-full text-gold text-xs font-bold tracking-widest uppercase mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        القصة وراء المنصة
                    </motion.span>

                    <motion.h1
                        className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        إرث من <span className="text-gold">المعرفة</span> والتميز
                    </motion.h1>

                    <motion.p
                        className="max-w-3xl mx-auto text-xl text-white/70 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        لم نبدأ كمنصة تعليمية عادية، بل بدأنا برؤية واضحة: ماذا لو كان التعليم العربي في مجال الأعمال والقيادة بمستوى عالمي؟ هذا ما نسعى لتحقيقه كل يوم.
                    </motion.p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-10 left-10 w-32 h-32 border-l-2 border-b-2 border-gold/20" />
                <div className="absolute top-20 right-10 w-32 h-32 border-r-2 border-t-2 border-gold/20" />
            </section>

            {/* Statistics Section */}
            <section className="py-20 relative bg-navy-dark/50">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:border-gold/30 transition-all duration-300"
                                variants={fadeInUp}
                            >
                                <stat.icon className="w-10 h-10 text-gold mx-auto mb-4" />
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                                <div className="text-gray-400 text-sm">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Founder Story Section */}
            <section className="py-24 relative">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">

                        {/* Image Side */}
                        <motion.div
                            className="flex-1 relative"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="relative aspect-[3/4] max-w-md mx-auto">
                                <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent rounded-lg" />
                                <Image
                                    src="/habsi.jpeg"
                                    alt="محمد الحبسي - المؤسس والمدرب الرئيسي"
                                    fill
                                    className="object-cover rounded-lg shadow-2xl"
                                />
                                {/* Decorative Frame */}
                                <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-gold/30 rounded-lg -z-10" />
                            </div>
                        </motion.div>

                        {/* Content Side */}
                        <motion.div
                            className="flex-1 space-y-10"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <motion.div variants={fadeInUp}>
                                <span className="text-gold text-sm font-bold tracking-widest uppercase mb-4 block">قصة البداية</span>
                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                    من فكرة إلى <span className="text-gold">منصة رائدة</span>
                                </h2>
                            </motion.div>

                            <motion.p variants={fadeInUp} className="text-gray-300 text-lg leading-loose">
                                في عام 2015، لاحظت فجوة كبيرة في المحتوى التعليمي العربي الموجه للقادة ورواد الأعمال. كانت الدورات المتاحة إما أكاديمية جافة تفتقر للتطبيق العملي، أو سطحية جداً لا تقدم قيمة حقيقية. كان الهدف واضحاً: خلق مساحة تجمع بين العمق الأكاديمي والتطبيق العملي المعاصر.
                            </motion.p>

                            <motion.p variants={fadeInUp} className="text-gray-300 text-lg leading-loose">
                                اليوم، أصبحت منصة الحبسي وجهة آلاف القادة ورواد الأعمال الذين يسعون للتميز والتطور المستمر. نفخر بتقديم محتوى استثنائي يجمع بين الخبرة العملية والمعرفة النظرية الرصينة.
                            </motion.p>

                            {/* Quote Block */}
                            <motion.div
                                variants={fadeInUp}
                                className="p-8 bg-gold/5 border-r-4 border-gold backdrop-blur-sm rounded-lg"
                            >
                                <p className="text-white italic text-xl leading-relaxed mb-4">
                                    &ldquo;نحن لا نبيع معلومات، نحن نصنع تحولاً حقيقياً في طريقة التفكير والعمل. هدفنا أن يخرج كل متدرب وهو مختلف عمّا كان عليه.&rdquo;
                                </p>
                                <span className="block font-bold text-gold">— محمد الحبسي، المؤسس</span>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-24 bg-navy-dark/30 relative">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-gold text-sm font-bold tracking-widest uppercase mb-4 block">ما يميزنا</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            قيمنا <span className="text-gold">الأساسية</span>
                        </h2>
                        <p className="max-w-2xl mx-auto text-gray-400 text-lg">
                            هذه المبادئ تشكل أساس كل ما نقدمه وتوجه قراراتنا في تطوير المحتوى والتجربة التعليمية.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {coreValues.map((value, index) => (
                            <motion.div
                                key={index}
                                className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:border-gold/40 hover:bg-white/10 transition-all duration-300 group"
                                variants={fadeInUp}
                            >
                                <div className="w-16 h-16 bg-gold/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                                    <value.icon className="w-8 h-8 text-gold" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />

                <div className="container relative z-10 mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-gold text-sm font-bold tracking-widest uppercase mb-4 block">فلسفتنا</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                                الرفاهية الحقيقية في <span className="text-gold">جودة الأفكار</span>
                            </h2>
                        </motion.div>

                        <motion.p
                            className="text-xl text-gray-300 leading-loose mb-8"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3 }}
                        >
                            نؤمن بأن الرفاهية ليست في الممتلكات المادية فحسب، بل في جودة الأفكار التي نستهلكها والمعرفة التي نكتسبها. لذلك صممنا منصة الحبسي لتكون واحة فكرية للقادة والطموحين، حيث يجتمع العمق مع العصرية، والنظرية مع التطبيق.
                        </motion.p>

                        <motion.p
                            className="text-xl text-gray-300 leading-loose"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 }}
                        >
                            كل دورة نقدمها هي نتاج سنوات من الخبرة والبحث والتجربة الميدانية. لا نقدم محتوى منسوخاً أو مترجماً، بل نصنع تجربة تعليمية أصيلة مصممة خصيصاً للسوق العربي وتحدياته الفريدة.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-b from-navy to-navy-dark relative overflow-hidden text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent opacity-50" />

                <div className="container relative z-10 px-6 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            هل أنت مستعد <span className="text-gold">للانطلاق؟</span>
                        </h2>
                        <p className="text-gray-300 mb-10 text-xl leading-relaxed">
                            انضم إلى آلاف القادة ورواد الأعمال الذين غيروا مسار حياتهم المهنية والمالية من خلال برامجنا التعليمية المتميزة.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/courses">
                                <Button variant="gold" size="lg" shape="sharp" className="min-w-[200px] text-navy font-bold text-lg">
                                    تصفح الدورات
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button variant="outline" size="lg" shape="sharp" className="min-w-[200px] text-white border-white/30 hover:bg-white/10">
                                    تواصل معنا <ArrowLeft className="mr-2 w-5 h-5" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-10 left-10 w-24 h-24 border-l-2 border-b-2 border-gold/20" />
                <div className="absolute top-10 right-10 w-24 h-24 border-r-2 border-t-2 border-gold/20" />
            </section>

            <Footer />
        </main>
    );
}
