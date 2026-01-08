"use client";

import { Button } from "@/components/ui/button";
import { Book, LayoutDashboard, Settings, User, LogOut, Users, CreditCard, BarChart3 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";

export function DashboardSidebar() {
    const pathname = usePathname();

    const links = [
        { name: "الرئيسية", icon: LayoutDashboard, href: "/dashboard" },
        { name: "إدارة الدورات", icon: Book, href: "/dashboard/courses" },
        { name: "الطلاب", icon: Users, href: "/dashboard/students" },
        { name: "الاشتراكات", icon: CreditCard, href: "/dashboard/enrollments" },
        { name: "الإحصائيات", icon: BarChart3, href: "/dashboard/analytics" },
        { name: "الملف الشخصي", icon: User, href: "/dashboard/profile" },
        { name: "الإعدادات", icon: Settings, href: "/dashboard/settings" },
    ];

    return (
        <aside className="w-64 bg-navy text-white min-h-screen fixed right-0 top-0 border-l border-white/10 hidden lg:flex flex-col z-50">
            <div className="p-8 border-b border-white/10">
                <Link href="/">
                    <Logo className="text-white" />
                </Link>
            </div>
            <nav className="flex-1 p-6 space-y-2">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex items-center gap-4 px-4 py-3 rounded-md transition-all ${isActive ? "bg-gold text-navy font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                        >
                            <link.icon size={20} />
                            {link.name}
                        </Link>
                    )
                })}
            </nav>
            <div className="p-6 border-t border-white/10">
                <button className="flex items-center gap-4 text-red-400 hover:text-red-300 transition-colors w-full px-4 py-2">
                    <LogOut size={20} />
                    تسجيل الخروج
                </button>
            </div>
        </aside>
    )
}
