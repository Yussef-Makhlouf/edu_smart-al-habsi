"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navItems = [
    { name: "الرئيسية", href: "/" },
    { name: "عن الدكتور", href: "/about" },
    { name: "الدورات", href: "/courses" },
    { name: "تواصل معنا", href: "/contact" },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                scrolled ? "bg-navy/95 backdrop-blur-md py-4 shadow-lg" : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">

                {/* Logo */}
                <Link href="/">
                    <Logo className={cn("transition-colors", scrolled ? "text-white" : "text-white")} />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-bold tracking-wide uppercase hover:text-gold transition-colors",
                                pathname === item.href ? "text-gold" : "text-white/90"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* CTA & Login */}
                <div className="hidden md:flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost" className="text-white/90 hover:text-gold hover:bg-white/10 border-white/20">
                            تسجيل الدخول
                        </Button>
                    </Link>
             
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-gold"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 top-[80px] bg-navy z-40 p-10 flex flex-col gap-8 animate-fade-in-up md:hidden border-t border-white/10">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-2xl text-white hover:text-gold"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full border-gold text-gold hover:bg-gold hover:text-navy border-white/20">
                            تسجيل الدخول
                        </Button>
                    </Link>
                </div>
            )}
        </header>
    )
}
