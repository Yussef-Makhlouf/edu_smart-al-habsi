"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();

  const courses = [
    { name: "دورة الملك الحقيقي", href: "/courses" },
    { name: "دورة المستوى الاحترافي للأعمال - 2", href: "/courses" },
    { name: "دورة المستوى الاحترافي للأعمال", href: "/courses" },
    { name: "البرنامج الداخلي للأعمال والثراء", href: "/courses" },
  ];

  const quickLinks = [
    { name: "عن المؤسس", href: "/about" },
    { name: "جميع الدورات", href: "/courses" },
    { name: "تسجيل الدخول", href: "/login" },
    { name: "اتصل بنا", href: "/contact" },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "#0077B5" },
    { icon: Youtube, href: "#", label: "YouTube", color: "#FF0000" },
    { icon: Instagram, href: "#", label: "Instagram", color: "#E4405F" },
    { icon: Twitter, href: "#", label: "Twitter", color: "#1DA1F2" },
    { icon: Facebook, href: "#", label: "Facebook", color: "#1877F2" },
  ];

  return (
    <footer className="relative bg-navy text-white overflow-hidden" dir="rtl">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(212, 175, 55, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>




      {/* Main Footer Content */}
      <div className="relative container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Column 1: Brand & About */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-2">
                <span className="text-gold">MOHAMMED</span> ALHABSI
              </h2>
              <div className="w-12 h-1 bg-gradient-to-l from-gold to-gold/30 rounded-full" />
            </div>
            <p className="text-white/60 leading-relaxed text-sm">
              منصة تعليمية رائدة تهدف إلى تمكين القادة ورواد الأعمال من خلال معرفة استثنائية وأدوات عملية لبناء المستقبل.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 pt-2">
              <a href="mailto:info@alhabsi.com" className="flex items-center gap-3 text-white/60 hover:text-gold transition-colors text-sm group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                  <Mail size={14} className="text-gold" />
                </div>
                <span>info@alhabsi.com</span>
              </a>
              <a href="tel:+966500000000" className="flex items-center gap-3 text-white/60 hover:text-gold transition-colors text-sm group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                  <Phone size={14} className="text-gold" />
                </div>
                <span dir="ltr">+966 50 000 0000</span>
              </a>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <MapPin size={14} className="text-gold" />
                </div>
                <span>الرياض، المملكة العربية السعودية</span>
              </div>
            </div>
          </div>

          {/* Column 2: Courses */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-bold text-white mb-2">الدورات</h4>
              <div className="w-8 h-0.5 bg-gold/50 rounded-full" />
            </div>
            <ul className="space-y-3">
              {courses.map((course, index) => (
                <li key={index}>
                  <Link
                    href={course.href}
                    className="group flex items-center gap-2 text-white/60 hover:text-gold transition-all duration-300 text-sm"
                    onMouseEnter={() => setIsHovered(`course-${index}`)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    <ArrowUpRight
                      size={14}
                      className={`transition-all duration-300 ${isHovered === `course-${index}` ? 'opacity-100 -translate-y-0.5 translate-x-0.5' : 'opacity-0'}`}
                    />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{course.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-bold text-white mb-2">روابط سريعة</h4>
              <div className="w-8 h-0.5 bg-gold/50 rounded-full" />
            </div>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-white/60 hover:text-gold transition-all duration-300 text-sm"
                    onMouseEnter={() => setIsHovered(`link-${index}`)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    <ArrowUpRight
                      size={14}
                      className={`transition-all duration-300 ${isHovered === `link-${index}` ? 'opacity-100 -translate-y-0.5 translate-x-0.5' : 'opacity-0'}`}
                    />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Social & Extra */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-bold text-white mb-2">تابعنا</h4>
              <div className="w-8 h-0.5 bg-gold/50 rounded-full" />
            </div>

            {/* Social Icons */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="group w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:bg-gold hover:text-navy transition-all duration-300 hover:scale-110"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>

            {/* Extra Info Card */}
            <div className="bg-white/5 rounded-xl p-5 border border-white/5">
              <h5 className="text-sm font-bold text-gold mb-2">ساعات العمل</h5>
              <p className="text-white/60 text-xs leading-relaxed">
                الأحد - الخميس: 9 صباحاً - 6 مساءً
                <br />
                الجمعة والسبت: مغلق
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Legal Links */}
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-white/50 hover:text-gold transition-colors"
              >
                سياسة الخصوصية
              </Link>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <Link
                href="/terms"
                className="text-white/50 hover:text-gold transition-colors"
              >
                الشروط والأحكام
              </Link>
            </div>

            {/* Copyright */}
            <div className="text-white/40 text-sm" dir="ltr">
              © {currentYear} Mohammed AlHabsi. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Previous Footer Implementation (Commented Out as requested)
/*
import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
    return (
        <footer className="bg-navy text-white pt-24 pb-10 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

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

                    <div>
                        <h4 className="text-lg text-gold mb-6 font-bold">روابط سريعة</h4>
                        <ul className="space-y-4 text-sm text-gray-300">
                            <li><Link href="/about" className="hover:text-gold transition-colors">عن المؤسس</Link></li>
                            <li><Link href="/courses" className="hover:text-gold transition-colors">جميع الدورات</Link></li>
                            <li><Link href="/login" className="hover:text-gold transition-colors">تسجيل الدخول</Link></li>
                            <li><Link href="/dashboard" className="hover:text-gold transition-colors">لوحة التحكم</Link></li>
                        </ul>
                    </div>

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
*/
