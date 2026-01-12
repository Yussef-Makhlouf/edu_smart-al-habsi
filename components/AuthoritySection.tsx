"use client";

import { Trophy, BarChart3, Users } from "lucide-react";

export function AuthoritySection() {
    const highlights = [
        {
            icon: Trophy,
            title: "قيادة السوق",
            description: "استراتيجيات تم اختبارها في كبرى الشركات والمؤسسات"
        },
        {
            icon: Users,
            title: "بناء الفرق",
            description: "منهجيات عملية لتحويل المجموعات إلى فرق عمل عالية الأداء"
        },
        {
            icon: BarChart3,
            title: "نمو مستدام",
            description: "أدوات لتحقيق نمو مالي وإداري قابل للقياس والتطوير"
        }
    ];

    return (
        <section className="py-section bg-paper">
            <div className="container mx-auto px-6">
                <div className="max-w-content mx-auto">
                    {/* Minimal Heading */}
                    <div className="text-center mb-block">
                        <h2 className="text-heading-2 text-navy font-bold mb-4">
                            خبرة تتحدث عن <span className="text-gold">النتائج</span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-gold/20 via-gold to-gold/20 mx-auto rounded-full" />
                    </div>

                    {/* Structured Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {highlights.map((item, index) => (
                            <div key={index} className="group p-8 bg-white border border-navy/5 hover:border-gold/30 transition-all duration-300 rounded-lg shadow-sm hover:shadow-md">
                                <div className="w-12 h-12 bg-navy/5 text-navy group-hover:bg-gold group-hover:text-white rounded-lg flex items-center justify-center mb-6 transition-colors duration-300">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-navy mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
