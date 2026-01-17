"use client";

import { Button } from "@/components/ui/button";
import {
  Book,
  LayoutDashboard,
  Settings,
  User,
  LogOut,
  Users,
  CreditCard,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/redux/slices/authSlice";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function DashboardSidebar({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const links = [
    { name: "إدارة الدورات", icon: Book, href: "/dashboard/courses" },
    { name: "التصنيفات", icon: BarChart3, href: "/dashboard/categories" },
    { name: "الطلاب", icon: Users, href: "/dashboard/students" },
    { name: "الاشتراكات", icon: CreditCard, href: "/dashboard/enrollments" },
    { name: "الملف الشخصي", icon: User, href: "/dashboard/profile" },
  ];

  const content = (
    <>
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
              className={`flex items-center gap-4 px-4 py-3 rounded-md transition-all ${
                isActive
                  ? "bg-gold text-navy font-bold"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <link.icon size={20} />
              {link.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-6 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 text-red-400 hover:text-red-300 transition-colors w-full px-4 py-2 rounded-md hover:bg-red-500/10"
        >
          <LogOut size={20} />
          تسجيل الخروج
        </button>
      </div>
    </>
  );

  if (mobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden text-navy">
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="p-0 bg-navy border-l-white/10 w-64"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>قائمة التنقل الجانبية</SheetTitle>
            <SheetDescription>
              استخدم هذه القائمة للتنقل بين أقسام لوحة التحكم المختلفة
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col h-full">{content}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className="w-64 bg-navy text-white min-h-screen fixed right-0 top-0 border-l border-white/10 hidden lg:flex flex-col z-40">
      {content}
    </aside>
  );
}
