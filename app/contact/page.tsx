"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Send, Clock, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-paper">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 bg-navy overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy to-navy z-0" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent opacity-50" />

                <div className="container relative z-10 mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-gold font-bold tracking-widest uppercase mb-4 block">تواصل معنا</span>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            لنبدأ الحديث عن <span className="text-gold">مستقبلك</span>
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            سواء كنت تبحث عن استشارة خاصة، أو ترغب في الانضمام لبرنامج تدريبي، فريقنا هنا للاستماع وتقديم الدعم الذي تحتاجه.
                        </p>
                    </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-10 left-10 w-24 h-24 border-l-2 border-b-2 border-gold/10" />
                <div className="absolute top-10 right-10 w-24 h-24 border-r-2 border-t-2 border-gold/10" />
            </section>

            {/* Content Section */}
            <section className="py-20 -mt-10 relative z-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Contact Info Cards */}
                        <div className="lg:col-span-1 space-y-6">
                            <ContactCard
                                icon={<Mail />}
                                title="البريد الإلكتروني"
                                value="info@alhabsi.com"
                                detail="نرد عادة خلال 24 ساعة"
                            />
                            <ContactCard
                                icon={<Phone />}
                                title="الهاتف"
                                value="+966 50 000 0000"
                                detail="الأحد - الخميس: 9ص - 5م"
                            />
                            <ContactCard
                                icon={<MapPin />}
                                title="العنوان"
                                value="برج الفيصلية"
                                detail="الرياض، المملكة العربية السعودية"
                            />

                            {/* Additional Info Box */}
                            <div className="p-8 bg-navy text-white rounded-lg mt-8 relative overflow-hidden">
                                <div className="absolute -top-10 -left-10 w-32 h-32 bg-gold/10 rounded-full blur-2xl" />
                                <h3 className="text-xl font-bold text-gold mb-4">هل لديك استفسار عاجل؟</h3>
                                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                                    يمكنك التواصل معنا مباشرة عبر واتساب للحصول على رد سريع بخصوص الدورات القادمة.
                                </p>
                                <Button variant="outline" className="w-full border-gold text-gold hover:bg-gold hover:text-navy">
                                    تواصل عبر واتساب
                                </Button>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <motion.div
                                className="bg-white p-8 md:p-12 rounded-lg shadow-xl shadow-navy/5 border border-gray-100"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <h2 className="text-3xl font-bold text-navy mb-8 flex items-center gap-3">
                                    <Send className="text-gold w-6 h-6" />
                                    أرسل رسالة
                                </h2>

                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-navy-950 mb-2">الاسم الكامل</label>
                                            <input
                                                type="text"
                                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                                                placeholder="الاسم الثلاثي"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-navy-950 mb-2">البريد الإلكتروني</label>
                                            <input
                                                type="email"
                                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                                                placeholder="name@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-navy-950 mb-2">رقم الهاتف</label>
                                            <input
                                                type="tel"
                                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                                                placeholder="+966 50..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-navy-950 mb-2">نوع الاستفسار</label>
                                            <div className="relative">
                                                <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors appearance-none cursor-pointer">
                                                    <option>استفسار عام</option>
                                                    <option>حجز دورة خاصة</option>
                                                    <option>استشارة أعمال</option>
                                                    <option>شراكة / رعاية</option>
                                                </select>
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-navy-950 mb-2">الرسالة</label>
                                        <textarea
                                            rows={6}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors resize-none"
                                            placeholder="كيف يمكننا مساعدتك؟"
                                        ></textarea>
                                    </div>

                                    <Button variant="gold" size="lg" className="w-full text-navy font-bold text-lg h-14 shadow-lg shadow-gold/20 hover:shadow-gold/40">
                                        إرسال الرسالة
                                    </Button>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

function ContactCard({ icon, title, value, detail }: { icon: React.ReactNode, title: string, value: string, detail: string }) {
    return (
        <motion.div
            className="bg-white p-6 rounded-lg shadow-lg shadow-navy/5 border border-gray-100 group hover:border-gold/30 transition-all duration-300"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-navy/5 text-navy rounded-lg flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-all duration-300">
                    {icon}
                </div>
                <div>
                    <h4 className="text-gray-500 text-sm mb-1 font-medium">{title}</h4>
                    <p className="font-bold text-navy text-lg mb-1">{value}</p>
                    <p className="text-xs text-gold font-medium">{detail}</p>
                </div>
            </div>
        </motion.div>
    )
}
