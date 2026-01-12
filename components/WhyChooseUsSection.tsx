"use client";

import { motion } from "framer-motion";
import { FeatureCard } from "@/components/FeatureCard";
import {
    Target,
    Lightbulb,
    BookOpen,
    Users,
    Smartphone,
    GraduationCap
} from "lucide-react";

const features = [
    {
        icon: Target,
        title: "محتوى أصيل",
        description: "نصنع محتوانا من الصفر، مصمم خصيصاً للسوق العربي وتحدياته الفريدة.",
        number: "01"
    },
    {
        icon: Lightbulb,
        title: "تطبيق عملي",
        description: "كل درس مرتبط بتطبيقات عملية وتجارب حقيقية من السوق العربي والعالمي.",
        number: "02"
    },
    {
        icon: BookOpen,
        title: "خبرة حقيقية",
        description: "+15 سنة من الخبرة الميدانية في القيادة وريادة الأعمال.",
        number: "03"
    },
    {
        icon: Users,
        title: "مجتمع النخبة",
        description: "انضم لمجتمع حصري من القادة ورواد الأعمال للتواصل وتبادل الخبرات.",
        number: "04"
    },
    {
        icon: Smartphone,
        title: "تعلم مرن",
        description: "تعلم في أي وقت ومن أي مكان مع وصول مدى الحياة لكل الدورات.",
        number: "05"
    },
    {
        icon: GraduationCap,
        title: "شهادات معتمدة",
        description: "احصل على شهادة إتمام معتمدة تضيف قيمة حقيقية لسيرتك المهنية.",
        number: "06"
    },
];

export function WhyChooseUsSection() {
    return (
        <section className="py-28 bg-paper relative overflow-hidden">
            {/* Large decorative text in background */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none select-none">
                <span className="text-[300px] font-bold text-navy/[0.02] leading-none whitespace-nowrap">
                    الحبسي
                </span>
            </div>

            <div className="container relative z-10 mx-auto px-6">
                {/* Section Header - Unique Split Layout */}
                <div className="grid lg:grid-cols-12 gap-8 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-1 flex items-start"
                    >
                        {/* Vertical text */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-px h-16 bg-gradient-to-b from-gold to-transparent" />
                            <span className="text-xs font-bold text-gold tracking-widest [writing-mode:vertical-rl] rotate-180">
                                المميزات
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-6 lg:col-start-2"
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy leading-tight">
                            لماذا منصة
                            <br />
                            <span className="text-gold">الحبسي مختلفة؟</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="lg:col-span-4 lg:col-start-9 flex items-end"
                    >
                        <div className="relative pr-6 border-r-2 border-gold/30">
                            <p className="text-gray-600 text-lg leading-relaxed">
                                نجمع بين العمق الأكاديمي والتطبيق العملي لنقدم لك تجربة تعليمية استثنائية
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Features Grid - Unique Staggered Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className={index % 2 === 1 ? 'lg:mt-12' : ''}
                        >
                            <FeatureCard
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                                number={feature.number}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
