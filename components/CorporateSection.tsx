"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function CorporateSection() {
    return (
        <section className="py-block bg-paper border-t border-navy/5">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-heading-3 font-bold text-navy mb-4">هل تبحث عن حلول للمؤسسات؟</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-sm md:text-base">
                    نقدم برامج تدريبية مخصصة للشركات والجهات الحكومية، مصممة خصيصاً لتلبية احتياجات فريقك وتحقيق أهدافك الاستراتيجية.
                </p>
                <div className="flex justify-center gap-4">
                    <Link href="/corporate">
                        <Button variant="default" className="bg-navy text-white hover:bg-navy-light px-8 h-12">
                            حلول الشركات
                        </Button>
                    </Link>
                    <Link href="/contact">
                        <Button variant="outline" className="border-navy/20 text-navy hover:bg-navy/5 px-8 h-12">
                            تواصل معنا
                            <ArrowLeft className="mr-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
