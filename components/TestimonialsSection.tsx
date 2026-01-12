"use client";

import { motion } from "framer-motion";
import { TestimonialCard } from "@/components/TestimonialCard";

const testimonials = [
    {
        quote: "غيّرت هذه الدورة طريقة تفكيري بالكامل. أصبحت أرى الفرص بشكل مختلف وأتخذ قرارات أفضل في عملي.",
        name: "أحمد الشمري",
        title: "مدير تنفيذي",
        rating: 5,
        featured: true,
    },
    {
        quote: "المحتوى عميق وعملي في نفس الوقت. أفضل استثمار قمت به في نفسي. النتائج ظهرت خلال أسابيع.",
        name: "سارة القحطاني",
        title: "رائدة أعمال",
        rating: 5,
        featured: false,
    },
    {
        quote: "أخيراً محتوى عربي يستحق. الدكتور محمد يقدم خبرة حقيقية ومنهجية واضحة للنجاح.",
        name: "خالد العمري",
        title: "مستثمر",
        rating: 5,
        featured: false,
    },
];

export function TestimonialsSection() {
    return (
        <section className="py-28 bg-paper relative overflow-hidden">
            {/* Large decorative number in background */}
            <div className="absolute top-0 left-0 pointer-events-none select-none">
                <span className="text-[400px] font-bold text-navy/[0.02] leading-none">
                    "
                </span>
            </div>

            <div className="container relative z-10 mx-auto px-6">
                {/* Header - Unique Layout */}
                <div className="grid lg:grid-cols-12 gap-8 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-7"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-3 h-3 bg-gold" />
                            <div className="w-12 h-px bg-gold" />
                            <span className="text-gold text-sm font-bold tracking-widest uppercase">آراء المتدربين</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy">
                            ماذا قال
                            <span className="text-gold"> متدربونا؟</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="lg:col-span-4 lg:col-start-9 flex items-end"
                    >
                        <p className="text-gray-600 text-lg">
                            قصص نجاح حقيقية من قادة ورواد أعمال غيّروا مسارهم المهني
                        </p>
                    </motion.div>
                </div>

                {/* Testimonials - Asymmetric Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Featured testimonial - larger */}
                    <div className="lg:col-span-6 lg:row-span-2">
                        <TestimonialCard
                            quote={testimonials[0].quote}
                            name={testimonials[0].name}
                            title={testimonials[0].title}
                            rating={testimonials[0].rating}
                            featured={true}
                            className="h-full"
                        />
                    </div>

                    {/* Other testimonials */}
                    {testimonials.slice(1).map((testimonial, index) => (
                        <div key={index} className="lg:col-span-6">
                            <TestimonialCard
                                quote={testimonial.quote}
                                name={testimonial.name}
                                title={testimonial.title}
                                rating={testimonial.rating}
                                featured={false}
                                delay={0.1 * (index + 1)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
