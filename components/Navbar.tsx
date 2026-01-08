"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen, Award, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "الرئيسية", href: "/" },
  { name: "عن الدكتور", href: "/about" },
  { name: "الدورات", href: "/courses" },
  { name: "تواصل معنا", href: "/contact" },
];

interface NavbarProps {
  lightVariant?: boolean;
}

export function Navbar({ lightVariant = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-navy/95 backdrop-blur-md py-3 shadow-lg border-b border-white/5"
            : "bg-transparent py-5 lg:py-6"
        )}
      >
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50">
            <Logo
              className={cn(
                "transition-colors duration-300",
                scrolled
                  ? "text-white"
                  : lightVariant
                  ? "text-navy"
                  : "text-white"
              )}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm font-bold tracking-wide uppercase transition-colors duration-300 group",
                  pathname === item.href
                    ? "text-gold"
                    : scrolled
                    ? "text-white/90 hover:text-gold"
                    : lightVariant
                    ? "text-navy hover:text-gold"
                    : "text-white/90 hover:text-gold"
                )}
              >
                {item.name}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300",
                    pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            ))}
          </nav>

          {/* User Menu (Mocked Logged In) */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative group">
              <button className="flex items-center gap-2 focus:outline-none">
                <div className="w-10 h-10 rounded-full bg-gold text-navy font-bold flex items-center justify-center border-2 border-white/20">
                  م
                </div>
                <div
                  className={cn(
                    "text-right hidden lg:block",
                    scrolled
                      ? "text-navy"
                      : lightVariant
                      ? "text-navy"
                      : "text-white"
                  )}
                >
                  <p className="text-sm font-bold">محمد علي</p>
                  <p className="text-xs opacity-80">طالب</p>
                </div>
              </button>

              {/* Dropdown */}
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left z-50">
                <div className="p-2">
                  <Link
                    href="/my-courses"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-navy/5 rounded-lg transition-colors"
                  >
                    <BookOpen size={16} className="text-gold" /> دوراتي
                  </Link>
                  <Link
                    href="/my-certificates"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-navy/5 rounded-lg transition-colors"
                  >
                    <Award size={16} className="text-gold" /> شهاداتي
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-navy/5 rounded-lg transition-colors"
                  >
                    <User size={16} className="text-gold" /> الملف الشخصي
                  </Link>
                  <div className="h-px bg-gray-100 my-1 font-bold"></div>
                  <Link
                    href="/"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut size={16} /> تسجيل الخروج
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className={cn(
              "md:hidden hover:text-gold transition-colors relative z-50",
              scrolled
                ? "text-white"
                : lightVariant
                ? "text-navy"
                : "text-white"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                >
                  <X size={28} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                >
                  <Menu size={28} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-navy flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {/* Background Pattern */}
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, #d4af37 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }}
            />

            <nav className="flex flex-col items-center gap-3 md:gap-6 relative z-10 w-full px-10">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="w-full text-center"
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "block text-2xl font-bold transition-colors py-2",
                      pathname === item.href
                        ? "text-gold"
                        : "text-white/80 hover:text-gold"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="w-full mt-6 pt-6 border-t border-white/10"
              >
                {/* Mocked Mobile User Menu */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-center gap-3 text-white mb-2">
                    <div className="w-10 h-10 rounded-full bg-gold text-navy font-bold flex items-center justify-center">
                      م
                    </div>
                    <span className="font-bold">محمد علي</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/my-courses"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="bg-white/5 p-2 rounded-lg text-center hover:bg-white/10 transition-colors">
                        <BookOpen
                          size={20}
                          className="text-gold mx-auto mb-1"
                        />
                        <span className="text-xs text-white">دوراتي</span>
                      </div>
                    </Link>
                    <Link
                      href="/my-certificates"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="bg-white/5 p-2 rounded-lg text-center hover:bg-white/10 transition-colors">
                        <Award size={20} className="text-gold mx-auto mb-1" />
                        <span className="text-xs text-white">شهاداتي</span>
                      </div>
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="bg-white/5 p-2 rounded-lg text-center hover:bg-white/10 transition-colors">
                        <User size={20} className="text-gold mx-auto mb-1" />
                        <span className="text-xs text-white">الملف الشخصي</span>
                      </div>
                    </Link>
                    <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                      <div className="bg-red-500/10 p-2 rounded-lg text-center hover:bg-red-500/20 transition-colors border border-red-500/20">
                        <LogOut
                          size={20}
                          className="text-red-400 mx-auto mb-1"
                        />
                        <span className="text-xs text-red-400">خروج</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
