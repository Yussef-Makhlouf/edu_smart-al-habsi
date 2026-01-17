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
  ArrowUpRight,
} from "lucide-react";
import { useState } from "react";

export function Footer() {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();

  const courses = [
    { name: "دورة الملك الحقيقي", href: "/courses" },
    { name: "دورة المستوى الاحترافي للأعمال - 2", href: "/courses" },
    { name: "دورة المستوى الاحترافي للأعمال", href: "/courses" },
    { name: "البرنامج الداخلي للأعمال والثراء", href: "/courses" },
  ];

  const quickLinks = [
    { name: "جميع الدورات", href: "/courses" },
    { name: "تسجيل الدخول", href: "/login" },
    { name: "اتصل بنا", href: "/contact" },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
  ];

  return (
    <footer className="relative bg-navy text-white overflow-hidden" dir="rtl">
      {/* Geometric accents */}
      <div className="absolute top-0 left-0 w-px h-20 bg-gradient-to-b from-gold to-transparent" />
      <div className="absolute top-0 left-0 w-20 h-px bg-gradient-to-r from-gold to-transparent" />

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Column 1: Brand & About */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-2">
                <span className="text-gold">MOHAMMED</span> ALHABSI
              </h2>
              <div className="section-line" />
            </div>
            <p className="text-white/60 leading-relaxed text-sm">
              منصة تعليمية رائدة تهدف إلى تمكين القادة ورواد الأعمال من خلال معرفة استثنائية وأدوات عملية لبناء المستقبل.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 pt-2">
              <a href="mailto:info@alhabsi.com" className="flex items-center gap-3 text-white/60 hover:text-gold transition-colors text-sm">
                <Mail size={14} className="text-gold" />
                <span>info@alhabsi.com</span>
              </a>
              <a href="tel:+966500000000" className="flex items-center gap-3 text-white/60 hover:text-gold transition-colors text-sm">
                <Phone size={14} className="text-gold" />
                <span dir="ltr">+966 50 000 0000</span>
              </a>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <MapPin size={14} className="text-gold" />
                <span>الرياض، المملكة العربية السعودية</span>
              </div>
            </div>
          </div>

          {/* Column 2: Courses */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-bold text-white mb-2">الدورات</h4>
              <div className="w-8 h-0.5 bg-gold" />
            </div>
            <ul className="space-y-3">
              {courses.map((course, index) => (
                <li key={index}>
                  <Link
                    href={course.href}
                    className="group flex items-center gap-2 text-white/60 hover:text-gold transition-colors text-sm"
                    onMouseEnter={() => setIsHovered(`course-${index}`)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    <ArrowUpRight
                      size={14}
                      className={`transition-opacity ${isHovered === `course-${index}` ? 'opacity-100' : 'opacity-0'}`}
                    />
                    <span>{course.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-bold text-white mb-2">روابط سريعة</h4>
              <div className="w-8 h-0.5 bg-gold" />
            </div>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-white/60 hover:text-gold transition-colors text-sm"
                    onMouseEnter={() => setIsHovered(`link-${index}`)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    <ArrowUpRight
                      size={14}
                      className={`transition-opacity ${isHovered === `link-${index}` ? 'opacity-100' : 'opacity-0'}`}
                    />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Social */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-bold text-white mb-2">تابعنا</h4>
              <div className="w-8 h-0.5 bg-gold" />
            </div>

            {/* Social Icons */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/60 hover:bg-gold hover:text-navy hover:border-gold transition-all"
                >
                  <social.icon size={18} />
                </a>
              ))}
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
                href="#"
                className="text-white/50 hover:text-gold transition-colors"
              >
                سياسة الخصوصية
              </Link>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <Link
                href="#"
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
