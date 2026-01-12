"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/Navbar";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { Footer } from "@/components/Footer";

export default function LoginPage() {
  const router = useRouter();
  const { login, user } = useStore();
  const [email, setEmail] = useState("student@edusmart.com");
  const [password, setPassword] = useState("123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Auto redirect if already logged in
  React.useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/my-courses");
      }
    }
  }, [user, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Detect role based on email automatically
    let role: "admin" | "student" = "student";
    if (email.toLowerCase() === "admin@edusmart.com") {
      role = "admin";
    } else {
      role = "student";
    }
    
    const loginSuccess = login(email, role);
    
    if (loginSuccess) {
      // Redirect based on role automatically
      if (role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/my-courses");
      }
    }
  };

  return (
    <main
      className="min-h-screen bg-white relative flex flex-col font-sans"
      dir="rtl"
    >
      {/* Header Section - Colored Background per request (Top Hero Only) */}
      <section className="bg-navy relative w-full h-[55vh] pt-32 pb-24 overflow-hidden text-center z-10">
        {/* Background Particles/Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            تسجيل الدخول <span className="text-gold">الآن</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-white mb-6">
            تسجيل الدخول الآن لتتعلم الأفضل
          </h2>
          <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
            أهلاً وسهلاً بكم في الموقع الرسمي للدكتور محمد الحبسي، قم بإدخال
            البريد الإلكتروني و كلمة المرور للإستمرار
          </p>
        </div>
      </section>

      {/* Navbar Positioned on top */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navbar lightVariant={false} />
      </div>

      {/* Form Section - White Background */}
      <section className="flex-1 bg-white relative z-20 container mx-auto px-4 max-w-4xl">
        <div className="w-full max-w-lg mx-auto py-16">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 text-right">
              <Label
                htmlFor="email"
                className="text-navy text-sm font-bold block"
              >
                البريد الإلكتروني <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="e.g johndoe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 rounded-full border border-gray-200 bg-white text-gray-800 placeholder:text-gray-300 px-6 text-sm focus:border-gold focus:ring-1 focus:ring-gold"
              />
            </div>

            <div className="space-y-2 text-right">
              <Label
                htmlFor="password"
                className="text-navy text-sm font-bold block"
              >
                كلمة المرور <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="......"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 rounded-full border border-gray-200 bg-white text-gray-800 placeholder:text-gray-300 px-6 text-sm focus:border-gold focus:ring-1 focus:ring-gold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-full bg-gold hover:bg-gold-dim text-navy font-bold text-lg shadow-none mt-4"
            >
              تسجيل الدخول
            </Button>

            <div className="flex items-center justify-between text-navy text-xs px-2 pt-2">
              <div className="flex gap-1">
                <Link href="#" className="font-bold text-gold hover:underline">
                  هل نسيت كلمة المرور؟
                </Link>
                <span className="text-gray-400">|</span>
                <Link
                  href="/contact"
                  className="font-bold text-gold hover:underline"
                >
                  إنشاء حساب
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <label
                  htmlFor="remember"
                  className="cursor-pointer text-gray-500"
                >
                  تذكرني
                </label>
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded border-gray-300 text-gold focus:ring-gold accent-gold"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              </div>
            </div>
          </form>

          <div className="mt-8 pt-4">
            <Button
              variant="ghost"
              className="w-full h-12 rounded-full bg-navy text-white font-bold text-lg hover:text-light-50 hover:bg-navy-light shadow-none"
              onClick={() => router.push("/")}
            >
              الاستمرار كزائر
            </Button>
          </div>
        </div>
      </section>

      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}
