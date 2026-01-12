"use client";

import { useSearchParams } from "next/navigation";
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
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useResetPassword } from "@/lib/hooks/useResetPassword";
import { Toaster } from "@/components/ui/sonner";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState, Suspense } from "react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const { form, onSubmit, isLoading } = useResetPassword(token);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!token) {
    return (
      <div className="text-center p-8 bg-white border border-gray-100">
        <h3 className="text-2xl font-bold text-navy mb-4">رابط غير صالح</h3>
        <p className="text-gray-500 mb-6">
          هذا الرابط غير صالح أو منتهي الصلاحية. يرجى طلب رابط جديد.
        </p>
        <Button
          className="w-full h-12 bg-gold hover:bg-gold-dim text-navy font-bold"
          onClick={() => (window.location.href = "/forget-password")}
        >
          طلب رابط جديد
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem className="text-right">
              <FormLabel className="text-navy text-sm font-bold block">
                كلمة المرور الجديدة <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="أدخل كلمة المرور الجديدة"
                    {...field}
                    className="w-full h-12 border border-gray-200 bg-gray-50 text-gray-800 px-4 text-sm focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-right" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="text-right">
              <FormLabel className="text-navy text-sm font-bold block">
                تأكيد كلمة المرور <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="أعد إدخال كلمة المرور"
                    {...field}
                    className="w-full h-12 border border-gray-200 bg-gray-50 text-gray-800 px-4 text-sm focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showConfirmPassword ? (
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

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-gold hover:bg-gold-dim text-navy font-bold text-lg disabled:opacity-50"
        >
          {isLoading ? "جاري التغيير..." : "تغيير كلمة المرور"}
        </Button>
      </form>
    </Form>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen bg-paper relative flex flex-col" dir="rtl">
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navbar lightVariant={false} />
      </div>

      <section className="relative pt-40 pb-28 bg-navy overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-navy" />
          <div
            className="absolute top-0 right-0 w-2/3 h-full bg-navy-dark"
            style={{ clipPath: "polygon(40% 0, 100% 0, 100% 100%, 0% 100%)" }}
          />
        </div>

        <div
          className="absolute inset-0 opacity-5"
          style={{
            background:
              "repeating-linear-gradient(135deg, transparent, transparent 80px, rgba(212,175,55,0.3) 80px, rgba(212,175,55,0.3) 81px)",
          }}
        />

        <div className="absolute bottom-0 right-0 pointer-events-none select-none">
          <span className="text-[180px] font-bold text-white/[0.02] leading-none">
            إعادة
          </span>
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
              إعادة تعيين <span className="text-gold">كلمة المرور</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
              قم بإنشاء كلمة مرور جديدة قوية لحسابك.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="flex-1 bg-paper relative z-20 container mx-auto px-4 max-w-lg py-16">
        <motion.div
          className="relative bg-white border border-gray-100 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="absolute top-0 left-0 w-0 h-0 border-t-[40px] border-t-gold border-r-[40px] border-r-transparent z-10" />

          <div className="p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-navy flex items-center justify-center">
                <Lock size={18} className="text-gold" />
              </div>
              <h3 className="font-bold text-navy text-lg">
                تعريف كلمة المرور الجديدة
              </h3>
            </div>

            <Suspense
              fallback={<div className="text-center py-8">جاري التحميل...</div>}
            >
              <ResetPasswordForm />
            </Suspense>
          </div>
        </motion.div>
      </section>

      <div className="mt-auto">
        <Footer />
      </div>
      <Toaster position="top-center" dir="rtl" />
    </main>
  );
}
