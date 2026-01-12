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
} from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 font-sans" dir="rtl">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-right">
          {/* Column 1: Courses */}
          <div className="space-y-4">
            <h4 className="text-gray-700 font-bold mb-4 border-b-2 border-transparent inline-block">
              الدورات
            </h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link
                  href="#"
                  className="hover:text-gold transition-colors block"
                >
                  دورة الملك الحقيقي
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-gold transition-colors block"
                >
                  دورة المستوى الاحترافي للأعمال - 2 | كتاب نسختك الأفضل
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-gold transition-colors block"
                >
                  دورة المستوى الاحترافي للأعمال
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-gold transition-colors block"
                >
                  البرنامج الداخلي للأعمال والثراء
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Books */}
          <div className="space-y-4">
            <h4 className="text-gray-700 font-bold mb-4 border-b-2 border-transparent inline-block">
              الكتب
            </h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link
                  href="#"
                  className="hover:text-gold transition-colors block"
                >
                  كتاب الأسرار ال 7 للثراء
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-gold transition-colors block"
                >
                  كتاب نسختك الأفضل
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Events & Other Links */}
          <div className="space-y-4">
            {/* Events */}
            <div className="mb-8">
              <h4 className="text-gray-700 font-bold mb-4 border-b-2 border-transparent inline-block">
                الأحداث
              </h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <Link
                    href="#"
                    className="hover:text-gold transition-colors block"
                  >
                    حفل توقيع كتاب الأسرار ال 7 للثراء
                  </Link>
                </li>
              </ul>
            </div>
            {/* Other Links */}
            <div>
              <h4 className="text-gray-700 font-bold mb-4 border-b-2 border-transparent inline-block">
                روابط أخرى
              </h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-gold transition-colors block"
                  >
                    عن الدكتور
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="hover:text-gold transition-colors block"
                  >
                    تسجيل الدخول
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-gold transition-colors block"
                  >
                    اتصل بنا
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: App Download */}
          <div className="space-y-4 flex flex-col items-end md:items-start">
            <h4 className="text-gray-700 font-bold mb-4 w-full text-right">
              حمل التطبيق الآن
            </h4>
            <div className="flex flex-col gap-3 w-full items-end md:items-start">
              <Link
                href="#"
                className="block w-40 hover:opacity-90 transition-opacity"
              >
                {/* Placeholder for Google Play Badge */}
                <div className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 border border-black cursor-pointer">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 fill-current text-white"
                  >
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.3,12.5L17.38,15.42L15.12,13.17L20.3,8L21.35,9.5C21.69,10 21.69,10.69 21.35,11.22L20.3,12.5M16.81,8.88L14.54,11.15L6.05,2.66L16.81,8.88Z" />
                  </svg>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[9px] uppercase">Get it on</span>
                    <span className="text-sm font-bold">Google Play</span>
                  </div>
                </div>
              </Link>

              <Link
                href="#"
                className="block w-40 hover:opacity-90 transition-opacity"
              >
                {/* Placeholder for App Store Badge */}
                <div className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 border border-black cursor-pointer">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 fill-current text-white"
                  >
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                  </svg>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[9px]">Download on the</span>
                    <span className="text-sm font-bold">App Store</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100 bg-white py-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          {/* Social Media & Links */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-navy transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-navy transition-colors"
              >
                <Youtube size={18} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-navy transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-navy transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-navy transition-colors"
              >
                <Facebook size={18} />
              </a>
            </div>

            <span className="hidden md:inline h-4 w-px bg-gray-300"></span>

            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="hover:text-navy font-bold transition-colors"
              >
                الخصوصية
              </Link>
              <Link
                href="/terms"
                className="hover:text-navy font-bold transition-colors"
              >
                الشروط
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div
            className="text-center md:text-left text-gray-400 font-light"
            dir="ltr"
          >
            Copyright {new Date().getFullYear()} - All Rights Reserved
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
