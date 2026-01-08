import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
    return (
        <footer className="bg-navy text-white pt-24 pb-10 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="text-2xl font-bold tracking-tight">
                            MOHAMMED ALHABSI
                        </div>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            منصة تعليمية رائدة تهدف إلى تمكين القادة ورواد الأعمال من خلال معرفة استثنائية وأدوات عملية لبناء المستقبل.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <SocialIcon icon={<Twitter size={18} />} href="#" />
                            <SocialIcon icon={<Instagram size={18} />} href="#" />
                            <SocialIcon icon={<Youtube size={18} />} href="#" />
                            <SocialIcon icon={<Facebook size={18} />} href="#" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg text-gold mb-6 font-bold">روابط سريعة</h4>
                        <ul className="space-y-4 text-sm text-gray-300">
                            <li><Link href="/about" className="hover:text-gold transition-colors">عن المؤسس</Link></li>
                            <li><Link href="/courses" className="hover:text-gold transition-colors">جميع الدورات</Link></li>
                            <li><Link href="/login" className="hover:text-gold transition-colors">تسجيل الدخول</Link></li>
                            <li><Link href="/dashboard" className="hover:text-gold transition-colors">لوحة التحكم</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg text-gold mb-6 font-bold">تواصل معنا</h4>
                        <ul className="space-y-4 text-sm text-gray-300">
                            <li className="flex items-center gap-3">
                                <Mail size={16} className="text-gold" />
                                <span>info@alhabsi.com</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={16} className="text-gold" />
                                <span>+966 50 000 0000</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <MapPin size={16} className="text-gold" />
                                <span>الرياض، المملكة العربية السعودية</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg text-gold mb-6 font-bold">انظم للنخبة</h4>
                        <p className="text-gray-400 text-xs mb-4">اشترك في النشرة البريدية للحصول على أحدث المقالات والدورات.</p>
                        <div className="space-y-3">
                            <input
                                type="email"
                                placeholder="البريد الإلكتروني"
                                className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors text-white placeholder:text-gray-600"
                            />
                            <Button variant="gold" className="w-full font-bold text-navy">اشترك الآن</Button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>© 2024 جميع الحقوق محفوظة لمنصة محمد الحبسي.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">سياسة الخصوصية</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">الشروط والأحكام</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode, href: string }) {
    return (
        <a
            href={href}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-gold hover:text-navy transition-all duration-300"
        >
            {icon}
        </a>
    )
}
