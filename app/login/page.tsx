"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Navbar } from "@/components/Navbar";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { Footer } from "@/components/Footer";
import { useLoginForm } from "@/lib/hooks/useLoginForm";
import { useForgetPassword } from "@/lib/hooks/useForgetPassword";
import { Toaster } from "@/components/ui/sonner";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const { user } = useStore();
  const { form, onSubmit, isLoading, error } = useLoginForm();
  const { form: forgetPasswordForm, onSubmit: onForgetPasswordSubmit, isLoading: isForgetPasswordLoading, isSuccess: isForgetPasswordSuccess } = useForgetPassword();
  const [showPassword, setShowPassword] = useState(false);
  const [forgetPasswordOpen, setForgetPasswordOpen] = useState(false);

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

  return (
    <main className="min-h-screen bg-paper relative flex flex-col" dir="rtl">
      {/* Navbar */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navbar lightVariant={false} />
      </div>

      {/* Hero Section */}
      <section className="relative pt-40 pb-28 bg-navy overflow-hidden">
        {/* Diagonal split */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-navy" />
          <div
            className="absolute top-0 right-0 w-2/3 h-full bg-navy-dark"
            style={{ clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 0% 100%)' }}
          />
        </div>

        {/* Diagonal stripe pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background: 'repeating-linear-gradient(135deg, transparent, transparent 80px, rgba(212,175,55,0.3) 80px, rgba(212,175,55,0.3) 81px)'
          }}
        />

        {/* Large decorative text */}
        <div className="absolute bottom-0 right-0 pointer-events-none select-none">
          <span className="text-[180px] font-bold text-white/[0.02] leading-none">دخول</span>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-12 h-px bg-gold" />
              <div className="w-3 h-3 bg-gold" />
              <div className="w-12 h-px bg-gold" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              تسجيل الدخول <span className="text-gold">الآن</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
              أهلاً وسهلاً بكم في الموقع الرسمي للدكتور محمد الحبسي
            </p>
          </motion.div>
        </div>

        {/* Corner decorative elements */}
        <div className="absolute bottom-10 left-10 w-px h-24 bg-gradient-to-t from-gold/50 to-transparent" />
        <div className="absolute bottom-10 left-10 w-24 h-px bg-gradient-to-r from-gold/50 to-transparent" />
      </section>

      {/* Form Section */}
      <section className="flex-1 bg-paper relative z-20 container mx-auto px-4 max-w-lg py-16">
        <motion.div
          className="relative bg-white border border-gray-100 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Corner accent */}
          <div className="absolute top-0 left-0 w-0 h-0 border-t-[40px] border-t-gold border-r-[40px] border-r-transparent z-10" />

          <div className="p-8 md:p-10">
            <Form {...form}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit(onSubmit)(e);
                }}
                className="space-y-6"
              >
                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-red-50 border-r-2 border-red-500 text-red-700 text-sm">
                    {error}
                  </div>
                )}

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="text-right">
                      <FormLabel className="text-navy text-sm font-bold block">
                        البريد الإلكتروني <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="e.g johndoe@example.com"
                          {...field}
                          className="w-full h-12 border border-gray-200 bg-gray-50 text-gray-800 placeholder:text-gray-400 px-4 text-sm focus:border-gold focus:ring-1 focus:ring-gold"
                        />
                      </FormControl>
                      <FormMessage className="text-right" />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="text-right">
                      <FormLabel className="text-navy text-sm font-bold block">
                        كلمة المرور <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="......
"
                            {...field}
                            className="w-full h-12 border border-gray-200 bg-gray-50 text-gray-800 placeholder:text-gray-400 px-4 text-sm focus:border-gold focus:ring-1 focus:ring-gold"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gold transition-colors"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-right" />
                    </FormItem>
                  )}
                />

                {/* Remember Me */}
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-end gap-2">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="w-4 h-4 border-gray-300 text-gold focus:ring-gold accent-gold"
                        />
                      </FormControl>
                      <FormLabel className="cursor-pointer text-gray-500 text-xs !mt-0">
                        تذكرني
                      </FormLabel>
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gold hover:bg-gold-dim text-navy font-bold text-lg disabled:opacity-50"
                >
                  {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                </Button>

                {/* Links */}
                <div className="flex items-center justify-center gap-4 text-sm pt-2">
                  <button
                    type="button"
                    className="font-bold text-gold hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setForgetPasswordOpen(true);
                    }}
                  >
                    نسيت كلمة المرور؟
                  </button>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <Link href="/contact" className="font-bold text-gold hover:underline">
                    إنشاء حساب
                  </Link>
                </div>
              </form>
            </Form>

            {/* Continue as Guest */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <Button
                variant="outline-dark"
                className="w-full h-12 font-bold"
                onClick={() => router.push("/")}
              >
                الاستمرار كزائر <ArrowLeft className="mr-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Forget Password Dialog */}
        <Dialog
          open={forgetPasswordOpen}
          onOpenChange={(open) => {
            setForgetPasswordOpen(open);
            if (!open) forgetPasswordForm.reset();
          }}
        >
          <DialogContent className="sm:max-w-[425px]" dir="rtl">
            <DialogHeader>
              <DialogTitle>إعادة تعيين كلمة المرور</DialogTitle>
              <DialogDescription>
                أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة تعيين كلمة المرور
              </DialogDescription>
            </DialogHeader>
            <Form {...forgetPasswordForm}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  forgetPasswordForm.handleSubmit(onForgetPasswordSubmit)(e);
                }}
                className="space-y-4 mt-4"
              >
                <FormField
                  control={forgetPasswordForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>البريد الإلكتروني</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@email.com"
                          {...field}
                          dir="ltr"
                          disabled={isForgetPasswordLoading || isForgetPasswordSuccess}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {isForgetPasswordSuccess && (
                  <div className="p-3 bg-green-50 border-r-2 border-green-500 text-green-700 text-sm">
                    تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني
                  </div>
                )}
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setForgetPasswordOpen(false);
                      forgetPasswordForm.reset();
                    }}
                    disabled={isForgetPasswordLoading}
                  >
                    إلغاء
                  </Button>
                  <Button
                    type="submit"
                    disabled={isForgetPasswordLoading || isForgetPasswordSuccess}
                    className="bg-gold hover:bg-gold-dim text-navy"
                  >
                    {isForgetPasswordLoading ? "جاري الإرسال..." : "إرسال"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </section>

      <div className="mt-auto">
        <Footer />
      </div>
      <Toaster position="top-center" dir="rtl" />
    </main>
  );
}
