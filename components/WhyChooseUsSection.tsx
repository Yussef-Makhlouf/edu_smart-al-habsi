"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
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
        description: "نصنع محتوانا من الصفر، مصمم خصيصاً للسوق العربي وتحدياته الفريدة. لا ترجمة، لا نسخ.",
    },
    {
        icon: Lightbulb,
        title: "تطبيق عملي",
        description: "كل درس مرتبط بتطبيقات عملية وتجارب حقيقية من السوق العربي والعالمي.",
    },
    {
        icon: BookOpen,
        title: "خبرة حقيقية",
        description: "+15 سنة من الخبرة الميدانية في القيادة وريادة الأعمال مكثفة في كل دورة.",
    },
    {
        icon: Users,
        title: "مجتمع النخبة",
        description: "انضم لمجتمع حصري من القادة ورواد الأعمال للتواصل وتبادل الخبرات.",
    },
    {
        icon: Smartphone,
        title: "تعلم مرن",
        description: "تعلم في أي وقت ومن أي مكان مع وصول مدى الحياة لكل الدورات.",
    },
    {
        icon: GraduationCap,
        title: "شهادات معتمدة",
        description: "احصل على شهادة إتمام معتمدة تضيف قيمة حقيقية لسيرتك المهنية.",
    },
];

export function WhyChooseUsSection() {
    return (
        <section className="py-24 bg-paper relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy/5 rounded-full blur-3xl" />

            <div className="container relative z-10 mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-gold font-bold tracking-widest uppercase text-sm mb-4 block">
                        ما يميزنا
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
                        لماذا منصة الحبسي <span className="text-gold">مختلفة؟</span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        نجمع بين العمق الأكاديمي والتطبيق العملي لنقدم لك تجربة تعليمية استثنائية
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
