"use client";

import { motion } from "framer-motion";
import { TestimonialCard } from "@/components/TestimonialCard";

const testimonials = [
    {
        quote: "غيّرت هذه الدورة طريقة تفكيري بالكامل. أصبحت أرى الفرص بشكل مختلف وأتخذ قرارات أفضل في عملي.",
        name: "أحمد الشمري",
        title: "مدير تنفيذي",
        rating: 5,
    },
    {
        quote: "المحتوى عميق وعملي في نفس الوقت. أفضل استثمار قمت به في نفسي. النتائج ظهرت خلال أسابيع.",
        name: "سارة القحطاني",
        title: "رائدة أعمال",
        rating: 5,
    },
    {
        quote: "أخيراً محتوى عربي يستحق. الدكتور محمد يقدم خبرة حقيقية ومنهجية واضحة للنجاح.",
        name: "خالد العمري",
        title: "مستثمر",
        rating: 5,
    },
];

export function TestimonialsSection() {
    return (
        <section className="py-24 bg-paper relative overflow-hidden">
            {/* Background pattern */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(26, 58, 82, 0.03) 1px, transparent 1px)`,
                    backgroundSize: "24px 24px",
                }}
            />

            <div className="container relative z-10 mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-gold font-bold tracking-widest uppercase text-sm mb-4 block">
                        آراء المتدربين
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
                        ماذا قال <span className="text-gold">متدربونا؟</span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        قصص نجاح حقيقية من قادة ورواد أعمال غيّروا مسارهم المهني
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard
                            key={index}
                            quote={testimonial.quote}
                            name={testimonial.name}
                            title={testimonial.title}
                            rating={testimonial.rating}
                            delay={index * 0.15}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
