"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, BookOpen, Briefcase, Lock, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";

export function ProfileSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useStore();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const navItems = [
    {
      href: "/my-courses",
      label: "دوراتي",
      icon: BookOpen,
    },
    // {
    //   href: "/mohamed-companies",
    //   label: "شركات محمد",
    //   icon: Briefcase,
    // },
    {
      href: "/my-certificates",
      label: "شهاداتي",
      icon: BookOpen,
    },
    // {
    //   href: "/profile",
    //   label: "تغيير كلمة المرور",
    //   icon: Lock,
    // },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
      {/* Header */}
      <Link
        href="/profile"
        className={cn(
          "p-4 border-b border-gray-200 flex flex-row-reverse items-center justify-end gap-2 transition-all",
          isActive("/profile")
            ? "bg-primary text-white"
            : " hover:from-[#5D1826]/10"
        )}
      >
        <span className={cn(
          "text-base",
          isActive("/profile") ? "font-bold" : "font-bold text-gray-800"
        )}>
          الملف الشخصي
        </span>
        <User size={20} className={cn(
          isActive("/profile") ? "text-white" : "text-[#DAA520]"
        )} />
      </Link>

      <nav className="flex flex-col">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-row-reverse items-center justify-end gap-3 px-5 py-4 transition-all border-b border-gray-100 last:border-0",
                active
                  ? "bg-primary text-white hover:bg-primary"
                  : "text-gray-700 hover:bg-gradient-to-l hover:from-[#5D1826]/5 hover:to-transparent"
              )}
            >
              <span
                className={cn(
                  "text-sm",
                  active ? "font-bold" : "font-semibold"
                )}
              >
                {item.label}
              </span>
              <Icon size={20} className={cn(
                active ? "text-white" : "text-[#DAA520]"
              )} />
            </Link>
          );
        })}

        <button
          onClick={handleLogout}
          className="flex flex-row-reverse items-center justify-end gap-3 px-5 py-4 text-gray-700 hover:bg-gradient-to-l hover:from-[#5D1826]/5 hover:to-transparent transition-all w-full text-right"
        >
          <span className="font-semibold text-sm">تسجيل الخروج</span>
          <LogOut size={20} className="text-[#DAA520]" />
        </button>
      </nav>
    </div>
  );
}