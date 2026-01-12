"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    Target,
    Lightbulb,
    Users,
    Award,
    BookOpen,
    TrendingUp,
    GraduationCap,
    ArrowLeft,
    Linkedin,
    Twitter
} from "lucide-react";

// Statistics data
const stats = [
    { icon: Users, target: 10000, prefix: "+", suffix: "", label: "متدرب ناجح" },
    { icon: BookOpen, target: 50, prefix: "+", suffix: "", label: "دورة متخصصة" },
    { icon: Award, target: 15, prefix: "+", suffix: "", label: "سنة خبرة" },
    { icon: TrendingUp, target: 95, prefix: "", suffix: "%", label: "نسبة الرضا" },
];

// Core values data
const coreValues = [
    {
        icon: Target,
        title: "التميز والإتقان",
        description: "نؤمن بأن الجودة ليست خيارًا بل ضرورة. كل محتوى نقدمه يمر بمراجعات دقيقة.",
        number: "01"
    },
    {
        icon: Lightbulb,
        title: "الابتكار المستمر",
        description: "نواكب أحدث التطورات في عالم الأعمال والقيادة بأساليب عصرية فعّالة.",
        number: "02"
    },
    {
        icon: GraduationCap,
        title: "التعلم التطبيقي",
        description: "كل درس مرتبط بتطبيقات عملية وتجارب حقيقية من السوق العربي والعالمي.",
        number: "03"
    },
];

// Timeline data
const timelineData = [
    { year: "2015", title: "البداية", description: "بدأت الرحلة بملاحظة فجوة كبيرة في المحتوى التعليمي العربي." },
    { year: "2018", title: "أول 1,000 متدرب", description: "وصلنا للألف متدرب الأول مع دورة القيادة الاستراتيجية." },
    { year: "2020", title: "إطلاق المنصة الرقمية", description: "تحولنا لمنصة رقمية متكاملة مع تجربة تعليمية فريدة." },
    { year: "2022", title: "+5,000 متدرب", description: "حققنا نسبة رضا 95% ونمو متسارع في المنطقة العربية." },
    { year: "2024", title: "توسع إقليمي", description: "انطلقنا للأسواق الخليجية والعربية بطموحات أكبر." },
];

// Team data
const teamMembers = [
    { name: "محمد الحبسي", title: "المؤسس والمدرب الرئيسي", initial: "م" },
    { name: "أحمد العمري", title: "مدير المحتوى التعليمي", initial: "أ" },
    { name: "سارة الحارثي", title: "مديرة تجربة المتدربين", initial: "س" },
    { name: "خالد النعيمي", title: "المدير التقني", initial: "خ" },
];

export default function AboutPage() {
    return (
        <main className="bg-navy min-h-screen text-white overflow-hidden">
            <Navbar />

            {/* Hero Section - Creative Diagonal Split */}
            <section className="relative pt-40 pb-28 overflow-hidden">
                {/* Diagonal split background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-navy" />
                    <div
                        className="absolute top-0 right-0 w-2/3 h-full bg-navy-dark"
                        style={{ clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 0% 100%)' }}
                    />
                </div>

                {/* Diagonal stripe */}
                <div
                    className="absolute top-0 left-0 w-full h-full opacity-5"
                    style={{
                        background: 'repeating-linear-gradient(135deg, transparent, transparent 80px, rgba(212,175,55,0.3) 80px, rgba(212,175,55,0.3) 81px)'
                    }}
                />

                {/* Large decorative text */}
                <div className="absolute bottom-0 right-0 pointer-events-none select-none">
                    <span className="text-[200px] font-bold text-white/[0.02] leading-none">القصة</span>
                </div>

                <div className="container relative z-10 mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-12">
                        <motion.div
                            className="lg:col-span-7"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-3 h-3 bg-gold" />
                                <div className="w-12 h-px bg-gold" />
                                <span className="text-gold text-sm font-bold tracking-widest uppercase">من نحن</span>
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                                إرث من
                                <br />
                                <span className="text-gold">المعرفة</span> والتميز
                            </h1>

                            <div className="relative pr-6 border-r-2 border-gold/30 max-w-xl">
                                <p className="text-xl text-white/70 leading-relaxed">
                                    لم نبدأ كمنصة تعليمية عادية، بل بدأنا برؤية واضحة: ماذا لو كان التعليم العربي في مجال الأعمال والقيادة بمستوى عالمي؟
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Corner decorative elements */}
                <div className="absolute bottom-10 left-10 w-px h-24 bg-gradient-to-t from-gold/50 to-transparent" />
                <div className="absolute bottom-10 left-10 w-24 h-px bg-gradient-to-r from-gold/50 to-transparent" />
            </section>

            {/* Statistics Section - Unique Card Design */}
            <section className="py-20 relative bg-navy-dark/50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="relative group"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                {/* Corner accent */}
                                <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-t-gold border-l-[30px] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="p-6 border border-white/10 group-hover:border-gold/40 transition-colors">
                                    <stat.icon className="w-8 h-8 text-gold mb-4" />
                                    <div className="text-xl font-bold text-white mb-2">
                                        {stat.prefix}<AnimatedCounter label="" target={stat.target} />{stat.suffix}
                                    </div>
                                    <div className="text-white/60 text-sm">{stat.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Founder Story Section */}
            <section className="py-28 relative overflow-hidden">
                {/* Background decorative text */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none select-none">
                    <span className="text-[250px] font-bold text-white/[0.02] leading-none">الحبسي</span>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-6 gap-16 items-center">
                        {/* Image Side */}
                        <motion.div
                            className="lg:col-span-3"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="relative">
                                {/* Background decorative square */}
                                <div className="absolute -top-6 -right-6 w-full h-full bg-gold/10" />

                                {/* Main image */}
                                <div className="relative aspect-[3/4] overflow-hidden">
                                    <Image
                                        src="/habsi.jpeg"
                                        alt="محمد الحبسي"
                                        fill
                                        className="object-cover"
                                    />
                                    {/* Corner cutout */}
                                    <div className="absolute top-0 left-0 w-0 h-0 border-t-[60px] border-t-navy border-r-[60px] border-r-transparent" />
                                </div>

                                {/* Floating stats */}
                                <div className="absolute -bottom-6 -left-6 bg-gold p-6">
                                    <div className="flex gap-8">
                                        <div className="text-center">
                                            <span className="block text-3xl font-bold text-navy">+15</span>
                                            <span className="text-navy/70 text-sm">سنة خبرة</span>
                                        </div>
                                        <div className="w-px bg-navy/20" />
                                        <div className="text-center">
                                            <span className="block text-3xl font-bold text-navy">+10K</span>
                                            <span className="text-navy/70 text-sm">متدرب</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Content Side */}
                        <motion.div
                            className="lg:col-span-6 lg:col-start-7"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-3 h-3 bg-gold" />
                                <div className="w-12 h-px bg-gold" />
                                <span className="text-gold text-sm font-bold tracking-widest uppercase">قصة البداية</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                                من فكرة إلى
                                <br />
                                <span className="text-gold">منصة رائدة</span>
                            </h2>

                            <div className="relative pr-6 border-r-2 border-gold/30 mb-8">
                                <p className="text-gray-300 text-lg leading-loose">
                                    في عام 2015، لاحظت فجوة كبيرة في المحتوى التعليمي العربي. كان الهدف واضحاً: خلق مساحة تجمع بين العمق الأكاديمي والتطبيق العملي المعاصر.
                                </p>
                            </div>

                            {/* Quote Block */}
                            <div className="relative">
                                {/* Quote badge */}
                                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gold flex items-center justify-center">
                                    <span className="text-navy text-2xl font-bold">"</span>
                                </div>

                                <div className="p-8 bg-white/5 border-r-2 border-gold">
                                    <p className="text-white italic text-xl leading-relaxed mb-4">
                                        نحن لا نبيع معلومات، نحن نصنع تحولاً حقيقياً في طريقة التفكير والعمل.
                                    </p>
                                    <span className="block font-bold text-gold">— محمد الحبسي، المؤسس</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Timeline Section - Creative Horizontal Design */}
            <section className="py-28 bg-navy-dark/30 relative overflow-hidden">
                <div className="container relative z-10 mx-auto px-6">
                    {/* Header */}
                    <motion.div
                        className="grid lg:grid-cols-12 gap-8 mb-20"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="lg:col-span-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-3 h-3 bg-gold" />
                                <div className="w-12 h-px bg-gold" />
                                <span className="text-gold text-sm font-bold tracking-widest uppercase">رحلتنا</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white">
                                مسيرة <span className="text-gold">الإنجازات</span>
                            </h2>
                        </div>
                    </motion.div>

                    {/* Timeline */}
                    <div className="relative">
                        {/* Horizontal line */}
                        <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-white/10" />

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                            {timelineData.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="relative"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    {/* Diamond marker */}
                                    <div className="hidden md:flex absolute top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-navy border-2 border-gold rotate-45" />

                                    <div className="mt-16 md:mt-20">
                                        <span className="text-gold font-bold text-2xl block mb-2">{item.year}</span>
                                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-28 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    {/* Header */}
                    <motion.div
                        className="grid lg:grid-cols-12 gap-8 mb-20"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="lg:col-span-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-3 h-3 bg-gold" />
                                <div className="w-12 h-px bg-gold" />
                                <span className="text-gold text-sm font-bold tracking-widest uppercase">ما يميزنا</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white">
                                قيمنا <span className="text-gold">الأساسية</span>
                            </h2>
                        </div>
                    </motion.div>

                    {/* Values Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {coreValues.map((value, index) => (
                            <motion.div
                                key={index}
                                className="relative group"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                {/* Number badge */}
                                <div className="absolute -top-3 -right-3 w-14 h-14 bg-gold flex items-center justify-center z-10">
                                    <span className="text-navy font-bold">{value.number}</span>
                                </div>

                                {/* Card */}
                                <div className="p-8 pt-10 bg-white/5 border border-white/10 group-hover:border-gold/40 transition-colors">
                                    <value.icon className="w-10 h-10 text-gold mb-6" strokeWidth={1.5} />
                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gold transition-colors">{value.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{value.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-28 bg-navy-dark/30 relative">
                <div className="container mx-auto px-6">
                    {/* Header */}
                    <motion.div
                        className="grid lg:grid-cols-12 gap-8 mb-20"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="lg:col-span-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-3 h-3 bg-gold" />
                                <div className="w-12 h-px bg-gold" />
                                <span className="text-gold text-sm font-bold tracking-widest uppercase">فريق العمل</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white">
                                الفريق <span className="text-gold">خلف النجاح</span>
                            </h2>
                        </div>
                    </motion.div>

                    {/* Team Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                className="group text-center"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                {/* Avatar */}
                                <div className="relative w-24 h-24 mx-auto mb-6">
                                    <div className="w-full h-full bg-navy border-2 border-gold/30 flex items-center justify-center text-gold text-3xl font-bold group-hover:border-gold group-hover:bg-gold group-hover:text-navy transition-all">
                                        {member.initial}
                                    </div>
                                    {/* Corner accent */}
                                    <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-gold/50" />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                                <p className="text-gold text-sm font-medium">{member.title}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-28 relative overflow-hidden">
                {/* Diagonal stripe */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        background: 'repeating-linear-gradient(-45deg, transparent, transparent 60px, rgba(212,175,55,0.3) 60px, rgba(212,175,55,0.3) 61px)'
                    }}
                />

                <div className="container relative z-10 px-6 max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <div className="w-12 h-px bg-gold" />
                            <div className="w-3 h-3 bg-gold" />
                            <div className="w-12 h-px bg-gold" />
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            هل أنت مستعد <span className="text-gold">للانطلاق؟</span>
                        </h2>
                        <p className="text-gray-300 mb-10 text-xl leading-relaxed">
                            انضم إلى آلاف القادة ورواد الأعمال الذين غيروا مسار حياتهم المهنية
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/courses">
                                <Button variant="gold" size="lg" className="min-w-[200px] text-navy font-bold">
                                    تصفح الدورات
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button variant="luxury-outline" size="lg" className="min-w-[200px]">
                                    تواصل معنا <ArrowLeft className="mr-2 w-5 h-5" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}