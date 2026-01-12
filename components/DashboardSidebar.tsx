"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  User,
  BookOpen,
  Award,
  Lock,
  LogOut,
  Camera,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { logout } from "@/lib/redux/slices/authSlice";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const links = [
    {
      label: "الملف الشخصي",
      href: "/profile",
      icon: User,
    },
    {
      label: "دوراتي",
      href: "/my-courses",
      icon: BookOpen,
    },
    {
      label: "شركات عمار",
      href: "#", // Placeholder as per image description
      icon: Briefcase,
    },
    {
      label: "تغيير كلمة المرور",
      href: "/profile#security", // Assuming anchor link or separate page
      icon: Lock,
    },
    {
      label: "تسجيل الخروج",
      href: "#logout",
      icon: LogOut,
      action: handleLogout,
      variant: "destructive",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Card Header */}
      <h3 className="text-right font-bold text-navy mb-4 pr-1 border-r-4 border-gold">
        الملف الشخصي
      </h3>

      <div className="bg-white rounded-none border-0 overflow-hidden">
        {/* Navigation */}
        <nav className="w-full">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            if (link.label === "تسجيل الخروج") {
              return (
                <button
                  key={link.label}
                  onClick={() => link.action && link.action()}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-4 text-sm font-bold transition-all duration-200 border-b border-gray-50",
                    "text-navy hover:bg-gray-50",
                    "group"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-gold">
                      <Icon size={18} />
                    </span>
                    <span>{link.label}</span>
                  </div>
                  <span className="text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                    ←
                  </span>
                </button>
              );
            }

            return (
              <Link key={link.href} href={link.href} className="block">
                <div
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-4 text-sm font-bold transition-all duration-200 border-b border-gray-50",
                    isActive
                      ? "bg-navy text-white border-r-4 border-gold"
                      : "text-navy hover:bg-gray-50 group"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className={cn(isActive ? "text-white" : "text-gold")}>
                      <Icon size={18} />
                    </span>
                    <span>{link.label}</span>
                  </div>
                  {!isActive && (
                    <span className="text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                      ←
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
