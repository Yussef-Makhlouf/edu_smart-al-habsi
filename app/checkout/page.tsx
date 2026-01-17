"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Lock,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { enrollInCourse, clearCart } from "@/lib/redux/slices/enrollmentSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function CheckoutPage() {
  const { user, isInitializing } = useSelector(
    (state: RootState) => state.auth
  );
  const { cartCourse } = useSelector((state: RootState) => state.enrollment);
  const dispatch = useDispatch();
  const router = useRouter();

  // Protect Route - wait for initialization
  useEffect(() => {
    if (!isInitializing) {
      if (!user) {
        // If not logged in, redirect to login with return url
        router.push("/login");
      } else if (user.role === "admin") {
        router.push("/dashboard/courses");
      }
    }
  }, [user, isInitializing, router]);

  const handlePayment = () => {
    if (cartCourse) {
      dispatch(enrollInCourse(cartCourse.id));
      dispatch(clearCart());
      router.push("/my-courses");
    }
  };

  // Show loading while initializing
  if (isInitializing || !user) return null;

  if (!cartCourse) {
    return (
      <main className="bg-paper min-h-screen flex flex-col">
        <Navbar lightVariant={true} />
        <div className="flex-1 container mx-auto px-6 py-24 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <CreditCard className="text-gray-400" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-navy mb-4">السلة فارغة</h1>
          <p className="text-gray-500 mb-8">لم تقم باختيار أي دورة للشراء.</p>
          <Link href="/courses">
            <Button variant="gold" className="font-bold text-navy">
              تصفح الدورات
            </Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const tax = cartCourse.priceValue * 0.15; // 15% VAT
  const total = cartCourse.priceValue + tax;

  return (
    <main className="bg-paper min-h-screen flex flex-col">
      <Navbar lightVariant={true} />

      <div className="flex-1 container mx-auto px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <Link
            href={`/courses/${cartCourse.slug}`}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-navy mb-8 transition-colors"
          >
            <ArrowRight size={16} />
            العودة لتفاصيل الدورة
          </Link>
          <h1 className="text-3xl font-bold text-navy mb-8">إتمام الطلب</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Right Column: Order Summary */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="bg-white rounded-xl border border-gray-100  p-6 sticky top-24">
                <h3 className="font-bold text-navy text-lg mb-4">ملخص الطلب</h3>

                {/* Course Item */}
                <div className="flex gap-4 mb-6 pb-6 border-b border-gray-100">
                  <div className="w-20 h-20 bg-navy/5 rounded-lg flex-shrink-0 relative overflow-hidden">
                    <Image
                      src={cartCourse.image}
                      alt={cartCourse.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-navy text-sm line-clamp-2 leading-relaxed">
                      {cartCourse.title}
                    </h4>
                    <p className="text-gold font-bold mt-2">
                      {cartCourse.price}
                    </p>
                  </div>
                </div>

                {/* Totals */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>سعر الدورة</span>
                    <span>{cartCourse.priceValue} ر.س</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>الضريبة (15%)</span>
                    <span>{tax} ر.س</span>
                  </div>
                  <div className="flex justify-between font-bold text-navy text-lg pt-4 border-t border-gray-100 mt-2">
                    <span>الإجمالي</span>
                    <span>{total} ر.س</span>
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
              <div className="bg-white rounded-xl border border-gray-100  p-8">
                <h3 className="font-bold text-navy text-lg mb-6 flex items-center gap-2">
                  <CheckCircle2 className="text-green-500" size={20} />
                  بيانات الحساب
                </h3>
                <div className="flex gap-4 items-center bg-gray-50 p-4 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-navy text-gold flex items-center justify-center font-bold text-lg">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-navy">
                      مسجل الدخول باسم: {user.name}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl border border-gray-100  p-8">
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
                    <Button
                      onClick={handlePayment}
                      className="w-full h-14 text-lg bg-gold hover:bg-gold-dim text-navy font-bold gap-2"
                    >
                      <Lock size={18} />
                      إتمام الدفع ({total} ر.س)
                    </Button>
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
