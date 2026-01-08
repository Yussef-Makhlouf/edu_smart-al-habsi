import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import Link from "next/link";
import { ArrowRight, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
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
                    <form className="space-y-6">
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
                                    placeholder="••••••••"
                                    className="pr-12 py-6 bg-white border-gray-200 focus:border-gold focus:ring-gold/20 text-left"
                                    dir="ltr"
                                />
                                <button type="button" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy">
                                    <EyeOff size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Remember Me */}
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

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-paper text-gray-500">أو</span>
                            </div>
                        </div>

                        {/* Social Login Placeholder */}
                        <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            className="w-full border-gray-200 text-navy hover:bg-gray-50 py-6"
                        >
                            <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                            </svg>
                            الدخول بحساب Google
                        </Button>
                    </form>

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
