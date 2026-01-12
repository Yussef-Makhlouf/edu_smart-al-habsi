"use client";

import { motion } from "framer-motion";
import { Search, PlayCircle, Briefcase, Award, ArrowLeft } from "lucide-react";

const steps = [
    {
        number: "01",
        icon: Search,
        title: "اختر مسارك",
        description: "تصفح الدورات المتاحة واختر المسار الذي يناسب أهدافك وطموحاتك المهنية.",
    },
    {
        number: "02",
        icon: PlayCircle,
        title: "ابدأ التعلم",
        description: "استمتع بدروس فيديو عالية الجودة مع مصادر إضافية وتمارين تفاعلية.",
    },
    {
        number: "03",
        icon: Briefcase,
        title: "طبّق المعرفة",
        description: "نفّذ مشاريع تطبيقية واقعية تساعدك على ترسيخ ما تعلمته عملياً.",
    },
    {
        number: "04",
        icon: Award,
        title: "احصل على الشهادة",
        description: "استلم شهادة إتمام معتمدة وانضم لمجتمع النخبة الحصري.",
    },
];

export function LearningJourneySection() {
    return (
        <section className="py-28 bg-navy relative overflow-hidden">
            {/* Diagonal accent stripe */}
            <div
                className="absolute top-0 left-0 w-full h-full opacity-5"
                style={{
                    background: 'repeating-linear-gradient(-45deg, transparent, transparent 80px, rgba(212,175,55,0.3) 80px, rgba(212,175,55,0.3) 81px)'
                }}
            />

            <div className="container relative z-10 mx-auto px-6">
                {/* Header with unique layout */}
                <div className="grid lg:grid-cols-12 gap-8 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-6"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-3 h-3 bg-gold" />
                            <div className="w-12 h-px bg-gold" />
                            <span className="text-gold text-sm font-bold tracking-widest uppercase">الخطوات</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                            رحلة
                            <span className="text-gold"> التعلم</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="lg:col-span-4 lg:col-start-9 flex items-end"
                    >
                        <p className="text-gray-400 text-lg leading-relaxed">
                            أربع خطوات بسيطة تفصلك عن تحقيق أهدافك المهنية
                        </p>
                    </motion.div>
                </div>

                {/* Steps - Horizontal Timeline Design */}
                <div className="hidden lg:block relative">
                    {/* Main horizontal line */}
                    <div className="absolute top-24 left-0 right-0 h-px bg-white/10" />

                    <div className="grid grid-cols-4 gap-0">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                className="relative"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                            >
                                {/* Large number watermark */}
                                <div className="mb-4">
                                    <span className="text-8xl font-bold text-white/[0.03]">{step.number}</span>
                                </div>

                                {/* Connection point */}
                                <div className="absolute top-24 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <div className="w-4 h-4 bg-navy border-2 border-gold rotate-45" />
                                </div>

                                {/* Arrow to next (except last) */}
                                {index < steps.length - 1 && (
                                    <div className="absolute top-24 right-0 translate-x-1/2 -translate-y-1/2 text-gold/30">
                                        <ArrowLeft size={20} className="rotate-180" />
                                    </div>
                                )}

                                {/* Content card */}
                                <div className="mt-16 pr-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 border border-gold/50 flex items-center justify-center">
                                            <step.icon className="w-5 h-5 text-gold" />
                                        </div>
                                        <span className="text-gold font-bold text-sm">{step.number}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Mobile Layout - Vertical Timeline */}
                <div className="lg:hidden relative pr-8">
                    {/* Vertical line */}
                    <div className="absolute right-3 top-0 bottom-0 w-px bg-white/10" />

                    <div className="space-y-12">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                className="relative"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                {/* Timeline dot */}
                                <div className="absolute right-0 top-0 w-6 h-6 bg-navy border-2 border-gold rotate-45 -translate-x-1/2" />

                                {/* Content */}
                                <div className="mr-8">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-gold font-bold">{step.number}</span>
                                        <step.icon className="w-5 h-5 text-gold" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
