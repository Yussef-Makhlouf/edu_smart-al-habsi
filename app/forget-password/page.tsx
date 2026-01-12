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
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useForgetPassword } from "@/lib/hooks/useForgetPassword";
import { Toaster } from "@/components/ui/sonner";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ForgetPasswordPage() {
  const { form, onSubmit, isLoading, isSuccess } = useForgetPassword();

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
            كلمة المرور
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
              نسيت كلمة <span className="text-gold">المرور؟</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
              أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور
              الخاصة بك.
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
            {isSuccess ? (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                  <div className="w-10 h-10 bg-green-500 rounded-full" />
                </div>
                <h3 className="text-2xl font-bold text-navy">
                  تحقق من بريدك الإلكتروني
                </h3>
                <p className="text-gray-500">
                  لقد أرسلنا رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.
                  يرجى مراجعة صندوق الوارد (أو مجلد الرسائل غير المرغوب فيها).
                </p>
                <Button
                  className="w-full h-12 bg-gold hover:bg-gold-dim text-navy font-bold"
                  onClick={() => (window.location.href = "/login")}
                >
                  العودة لتسجيل الدخول
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="text-right">
                        <FormLabel className="text-navy text-sm font-bold block">
                          البريد الإلكتروني{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="example@email.com"
                            {...field}
                            className="w-full h-12 border border-gray-200 bg-gray-50 text-gray-800 px-4 text-sm focus:border-gold focus:ring-1 focus:ring-gold"
                            dir="ltr"
                          />
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
                    {isLoading ? "جاري الإرسال..." : "إرسال رابط التعيين"}
                  </Button>

                  <div className="text-center pt-2">
                    <Link
                      href="/login"
                      className="font-bold text-gold hover:underline inline-flex items-center gap-2"
                    >
                      <ArrowRight size={16} /> العودة لتسجيل الدخول
                    </Link>
                  </div>
                </form>
              </Form>
            )}
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
