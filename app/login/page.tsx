"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import Link from "next/link";
import { ArrowRight, Mail, Lock, Eye, EyeOff, Info } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useStore();
    const [email, setEmail] = useState("student@edusmart.com"); // Pre-filled for demo
    const [password, setPassword] = useState("123456"); // Pre-filled for demo
    const [role, setRole] = useState<"student" | "admin">("student");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(email, role);

        if (role === "admin") {
            router.push("/dashboard");
        } else {
            router.push("/my-courses");
        }
    };

    return (
        <main className="min-h-screen bg-navy flex">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-gold/20 via-navy to-navy" />
                <div className="absolute inset-0 flex flex-col justify-center items-center p-12 z-10">
                    <div className="max-w-md text-center">
                        <Link href="/">
                            <Logo className="text-white mb-12 mx-auto scale-150" />
                        </Link>
                        <h1 className="text-4xl font-bold text-white mb-6">
                            مرحباً بك في <span className="text-gold">منصة الحبسي</span>
                        </h1>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            المنصة التعليمية الفاخرة للقادة والمتميزين. ابدأ رحلة التعلم الخاصة بك اليوم.
                        </p>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute bottom-10 left-10 right-10 flex justify-between text-gray-500 text-sm">
                        <span>© 2024 Al-Habsi Platform</span>
                        <span>جميع الحقوق محفوظة</span>
                    </div>
                </div>

                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }} />
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-paper">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-10">
                        <Link href="/">
                            <Logo className="text-navy mx-auto mb-4" />
                        </Link>
                    </div>

                    {/* Form Header */}
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-navy mb-2">تسجيل الدخول</h2>
                        <p className="text-gray-500">أدخل بيانات حسابك للمتابعة</p>
                    </div>

                    {/* Login Form */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Role Selection Toggle */}
                        <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
                            <button
                                type="button"
                                onClick={() => setRole("student")}
                                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${role === "student" ? "bg-white text-navy shadow-sm" : "text-gray-500 hover:text-navy"}`}
                            >
                                طالب
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole("admin")}
                                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${role === "admin" ? "bg-white text-navy shadow-sm" : "text-gray-500 hover:text-navy"}`}
                            >
                                مسؤول المنصة
                            </button>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-navy font-bold">
                                البريد الإلكتروني
                            </Label>
                            <div className="relative">
                                <Mail size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="example@email.com"
                                    className="pr-12 py-6 bg-white border-gray-200 focus:border-gold focus:ring-gold/20 text-left"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="password" className="text-navy font-bold">
                                    كلمة المرور
                                </Label>
                                <Link href="/forgot-password" className="text-sm text-gold hover:underline font-medium">
                                    نسيت كلمة المرور؟
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="pr-12 py-6 bg-white border-gray-200 focus:border-gold focus:ring-gold/20 text-left"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold"
                            />
                            <Label htmlFor="remember" className="text-gray-600 text-sm cursor-pointer">
                                تذكرني
                            </Label>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="gold"
                            size="lg"
                            className="w-full text-navy font-bold py-6 text-lg"
                        >
                            تسجيل الدخول
                        </Button>
                    </form>

                    {/* Info Box - Replaces Registration Link for Students */}
                    {role === "student" && (
                        <div className="mt-8 bg-blue-50 text-blue-800 p-4 rounded-lg flex gap-3 text-sm border border-blue-100">
                            <Info className="shrink-0 mt-0.5 text-blue-600" size={18} />
                            <div>
                                <p className="font-bold mb-1 text-blue-900">كيف يمكنني التسجيل؟</p>
                                <p className="leading-relaxed">
                                    حسابات الطلاب يتم إنشاؤها بعد مراجعة الطلب. يمكنك{" "}
                                    <Link href="/contact" className="font-bold underline hover:text-blue-900">
                                        تقديم طلب التحاق هنا
                                    </Link>
                                    .
                                </p>
                            </div>
                        </div>
                    )}

                    {role === "admin" && (
                        <div className="mt-8 text-center text-sm text-gray-400">
                            الوصول للوحة التحكم مخصص للمسؤولين فقط.
                        </div>
                    )}

                    {/* Back to Home */}
                    <div className="mt-8 text-center">
                        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-navy transition-colors">
                            <ArrowRight size={16} />
                            العودة للصفحة الرئيسية
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
