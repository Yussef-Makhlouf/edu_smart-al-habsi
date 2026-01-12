"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, BookOpen, Award, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/lib/store";

const navItems = [
  { name: "الرئيسية", href: "/" },
  // { name: "عن الدكتور", href: "/about" },
  { name: "الدورات", href: "/courses" },
  { name: "تواصل معنا", href: "/contact" },
];

interface NavbarProps {
  lightVariant?: boolean;
}

export function Navbar({ lightVariant = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    router.push("/");
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
          scrolled
            ? "bg-navy py-3 border-b border-white/10"
            : "bg-transparent py-5 lg:py-6"
        )}
      >
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50">
            <Logo
              className={cn(
                "transition-colors duration-200",
                scrolled
                  ? "text-white"
                  : lightVariant
                    ? "text-navy"
                    : "text-white"
              )}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm font-bold tracking-wide uppercase transition-colors duration-200 underline-expand",
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
              </Link>
            ))}
          </nav>

          {/* User Menu - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                  className="flex justify-center items-center gap-2 px-5 py-2.5 rounded-md border border-gold/40 hover:border-gold transition-all bg-navy/40 hover:bg-navy/60"
                >
                  <ChevronDown
                    size={16}
                    className={cn(
                      "transition-transform text-gold",
                      dropdownOpen && "rotate-180"
                    )}
                  />
                  <span className={cn(
                    "text-sm font-bold",
                    scrolled ? "text-white" : lightVariant ? "text-navy" : "text-white"
                  )}>
                    {user?.name || "المستخدم"}
                  </span>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 mt-2 w-48 bg-white rounded-md border border-gray-100 overflow-hidden z-50"
                    >
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gold/5 transition-colors border-b border-gray-100"
                      >
                        <User size={18} className="text-gold" />
                        <span className="font-semibold">الملف الشخصي</span>
                      </Link>
                      <Link
                        href="/my-courses"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gold/5 transition-colors border-b border-gray-100"
                      >
                        <BookOpen size={18} className="text-gold" />
                        <span className="font-semibold">دوراتي</span>
                      </Link>
                      <Link
                        href="/my-certificates"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gold/5 transition-colors border-b border-gray-100"
                      >
                        <Award size={18} className="text-gold" />
                        <span className="font-semibold">شهاداتي</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-right"
                      >
                        <LogOut size={18} />
                        <span className="font-semibold">تسجيل الخروج</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/login">
                <Button
                  variant="luxury-outline"
                  className={cn(
                    "px-6 font-bold",
                    !scrolled && !lightVariant ? "bg-transparent" : ""
                  )}
                >
                  تسجيل الدخول
                </Button>
              </Link>
            )}
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
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-navy flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {/* Geometric accent */}
            <div className="absolute top-20 right-10 w-32 h-32 border border-gold/10 rotate-45" />
            <div className="absolute bottom-20 left-10 w-24 h-24 border border-gold/5 rotate-45" />

            <nav className="flex flex-col items-center gap-4 relative z-10 w-full px-10">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="w-full text-center"
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "block text-2xl font-bold transition-colors py-3",
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
                className="w-full mt-8 pt-8 border-t border-white/10"
              >
                {user ? (
                  <div className="px-4">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <Link
                        href="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex flex-col items-center justify-center gap-2 bg-white/5 hover:bg-white/10 transition-colors rounded-md p-4 border border-gold/20"
                      >
                        <User size={24} className="text-gold" />
                        <span className="text-xs font-bold text-white">الملف الشخصي</span>
                      </Link>

                      <Link
                        href="/my-courses"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex flex-col items-center justify-center gap-2 bg-white/5 hover:bg-white/10 transition-colors rounded-md p-4 border border-gold/20"
                      >
                        <BookOpen size={24} className="text-gold" />
                        <span className="text-xs font-bold text-white">دوراتي</span>
                      </Link>

                      <Link
                        href="/my-certificates"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex flex-col items-center justify-center gap-2 bg-white/5 hover:bg-white/10 transition-colors rounded-md p-4 border border-gold/20"
                      >
                        <Award size={24} className="text-gold" />
                        <span className="text-xs font-bold text-white">شهاداتي</span>
                      </Link>

                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="flex flex-col items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 transition-colors rounded-md p-4 border border-red-500/30"
                      >
                        <LogOut size={24} className="text-red-400" />
                        <span className="text-xs font-bold text-red-400">خروج</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center px-4">
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full"
                    >
                      <Button
                        variant="gold"
                        className="w-full px-12 font-bold text-navy"
                      >
                        تسجيل الدخول
                      </Button>
                    </Link>
                  </div>
                )}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}