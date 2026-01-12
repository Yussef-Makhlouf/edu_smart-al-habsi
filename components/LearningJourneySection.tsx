"use client";

import { motion } from "framer-motion";
import { Search, PlayCircle, Briefcase, Award } from "lucide-react";

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
        <section className="py-24 bg-navy relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-navy-dark to-navy z-0" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent opacity-50" />

            <div className="container relative z-10 mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-gold font-bold tracking-widest uppercase text-sm mb-4 block">
                        كيف تبدأ
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        رحلة <span className="text-gold">التعلم</span>
                    </h2>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        أربع خطوات بسيطة تفصلك عن تحقيق أهدافك المهنية
                    </p>
                </motion.div>

                {/* Desktop Layout */}
                <div className="hidden md:grid grid-cols-4 gap-8 relative">
                    {/* Connecting line */}
                    <div className="absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-gold/20 via-gold to-gold/20" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="relative text-center"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                        >
                            {/* Step circle */}
                            <div className="w-32 h-32 mx-auto mb-6 relative">
                                <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl" />
                                <div className="relative w-full h-full bg-navy border-2 border-gold rounded-full flex items-center justify-center group hover:bg-gold transition-colors duration-300">
                                    <step.icon className="w-10 h-10 text-gold group-hover:text-navy transition-colors duration-300" />
                                </div>
                                {/* Number badge */}
                                <div className="absolute -top-2 -right-2 w-10 h-10 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-sm ">
                                    {step.number}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-3">
                                {step.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed px-2">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden space-y-6">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="flex gap-4"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {/* Left side - number and line */}
                            <div className="flex flex-col items-center">
                                <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center text-navy font-bold shrink-0">
                                    {step.number}
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="w-0.5 flex-1 bg-gradient-to-b from-gold to-gold/20 mt-2" />
                                )}
                            </div>

                            {/* Right side - content */}
                            <div className="flex-1 pb-6">
                                <div className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                                    <div className="flex items-center gap-3 mb-2">
                                        <step.icon className="w-5 h-5 text-gold" />
                                        <h3 className="text-lg font-bold text-white">{step.title}</h3>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
