import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Lock, CreditCard, CheckCircle2, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage() {
  return (
    <main className="bg-paper min-h-screen flex flex-col">
      <Navbar lightVariant={true} />

      <div className="flex-1 container mx-auto px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-navy mb-8">إتمام الطلب</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Right Column: Order Summary */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sticky top-24">
                <h3 className="font-bold text-navy text-lg mb-4">ملخص الطلب</h3>

                {/* Course Item */}
                <div className="flex gap-4 mb-6 pb-6 border-b border-gray-100">
                  <div className="w-20 h-20 bg-navy/5 rounded-lg flex-shrink-0 relative overflow-hidden">
                    {/* Placeholder Image */}
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] text-navy/30 font-bold">
                      IMG
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-navy text-sm line-clamp-2 leading-relaxed">
                      أسرار القيادة الاستراتيجية: الطريق إلى القمة
                    </h4>
                    <p className="text-gold font-bold mt-2">1200 ر.س</p>
                  </div>
                </div>

                {/* Totals */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>سعر الدورة</span>
                    <span>1200 ر.س</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>الضريبة (15%)</span>
                    <span>180 ر.س</span>
                  </div>
                  <div className="flex justify-between font-bold text-navy text-lg pt-4 border-t border-gray-100 mt-2">
                    <span>الإجمالي</span>
                    <span>1380 ر.س</span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="mt-6 bg-gray-50 p-3 rounded-lg flex items-center gap-3 text-xs text-gray-500">
                  <ShieldCheck
                    className="text-green-600 flex-shrink-0"
                    size={20}
                  />
                  <p>جميع المعاملات مشفرة وآمنة تماماً بتقنية 256-bit SSL.</p>
                </div>
              </div>
            </div>

            {/* Left Column: Form & Payment */}
            <div className="lg:col-span-2 order-1 lg:order-2 space-y-6">
              {/* Account Info (Mocked as logged in) */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                <h3 className="font-bold text-navy text-lg mb-6 flex items-center gap-2">
                  <CheckCircle2 className="text-green-500" size={20} />
                  بيانات الحساب
                </h3>
                <div className="flex gap-4 items-center bg-gray-50 p-4 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-navy text-gold flex items-center justify-center font-bold text-lg">
                    م
                  </div>
                  <div>
                    <p className="font-bold text-navy">
                      مسجل الدخول باسم: محمد علي
                    </p>
                    <p className="text-sm text-gray-500">
                      mohammed@example.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-navy text-lg flex items-center gap-2">
                    <CreditCard className="text-gold" size={20} />
                    طريقة الدفع
                  </h3>
                  <div className="flex gap-2 opacity-50 grayscale hover:grayscale-0 transition-all">
                    {/* Icons placeholder for Visa/Mastercard/Mada */}
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Card Form Mock */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-navy">
                        اسم حامل البطاقة
                      </label>
                      <input
                        type="text"
                        placeholder="الاسم كما يظهر على البطاقة"
                        className="w-full h-11 px-4 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-navy">
                        رقم البطاقة
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          className="w-full h-11 px-4 pl-10 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/20"
                          dir="ltr"
                        />
                        <CreditCard
                          size={18}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-navy">
                          تاريخ الانتهاء
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full h-11 px-4 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/20 text-center"
                          dir="ltr"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-navy">
                          CVC
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full h-11 px-4 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/20 text-center"
                          dir="ltr"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Link href="/my-courses">
                      <Button className="w-full h-14 text-lg bg-gold hover:bg-gold-dim text-navy font-bold shadow-lg gap-2">
                        <Lock size={18} />
                        إتمام الدفع (1380 ر.س)
                      </Button>
                    </Link>
                    <p className="text-center text-xs text-gray-400 mt-4">
                      بإتمام الطلب، أنت توافق على شروط وأحكام المنصة.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
