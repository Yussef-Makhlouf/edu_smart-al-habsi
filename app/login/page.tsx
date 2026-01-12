"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Navbar } from "@/components/Navbar";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { Footer } from "@/components/Footer";
import { useLoginForm } from "@/lib/hooks/useLoginForm";
import { useForgetPassword } from "@/lib/hooks/useForgetPassword";
import { Toaster } from "@/components/ui/sonner";

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
    <main
      className="min-h-screen bg-white relative flex flex-col font-sans"
      dir="rtl"
    >
      {/* Header Section - Colored Background per request (Top Hero Only) */}
      <section className="bg-navy relative w-full h-[55vh] pt-32 pb-24 overflow-hidden text-center z-10">
        {/* Background Particles/Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent" />
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
                <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm text-right">
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
                        className="w-full h-12 rounded-full border border-gray-200 bg-white text-gray-800 placeholder:text-gray-300 px-6 text-sm focus:border-gold focus:ring-1 focus:ring-gold"
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
                          placeholder="......"
                          {...field}
                          className="w-full h-12 rounded-full border border-gray-200 bg-white text-gray-800 placeholder:text-gray-300 px-6 text-sm focus:border-gold focus:ring-1 focus:ring-gold"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-right" />
                  </FormItem>
                )}
              />

              {/* Remember Me Field */}
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
                        className="w-4 h-4 rounded border-gray-300 text-gold focus:ring-gold accent-gold"
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
                className="w-full h-12 rounded-full bg-gold hover:bg-gold-dim text-navy font-bold text-lg shadow-none mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </Button>

              {/* Links */}
              <div className="flex items-center justify-between text-navy text-xs px-2 pt-2">
                <div className="flex gap-1">
                  <button
                    type="button"
                    className="font-bold text-gold hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setForgetPasswordOpen(true);
                    }}
                  >
                    هل نسيت كلمة المرور؟
                  </button>
                  <Dialog 
                    open={forgetPasswordOpen} 
                    onOpenChange={(open) => {
                      setForgetPasswordOpen(open);
                      if (!open) {
                        // Reset form when dialog closes
                        forgetPasswordForm.reset();
                      }
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
                            <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm text-right">
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
                  <span className="text-gray-400">|</span>
                  <Link
                    href="/contact"
                    className="font-bold text-gold hover:underline"
                  >
                    إنشاء حساب
                  </Link>
                </div>
              </div>
            </form>
          </Form>

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
      <Toaster position="top-center" dir="rtl" />
    </main>
  );
}
