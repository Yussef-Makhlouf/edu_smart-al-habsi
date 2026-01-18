"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Upload,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  User,
  BookOpen,
  Image as ImageIcon,
  Copy,
  Check,
} from "lucide-react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { clearCart } from "@/lib/redux/slices/enrollmentSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { user, isInitializing } = useSelector(
    (state: RootState) => state.auth
  );
  const { cartCourse } = useSelector((state: RootState) => state.enrollment);
  const dispatch = useDispatch();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Protect Route - wait for initialization
  useEffect(() => {
    if (!isInitializing) {
      if (!user) {
        router.push("/login?redirect=/checkout");
      } else if (user.role === "Admin") {
        router.push("/dashboard/courses");
      }
    }
  }, [user, isInitializing, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleCopyIban = () => {
    navigator.clipboard.writeText("SA00 0000 0000 0000 0000 0000");
    setCopied(true);
    toast.success("تم نسخ الآيبان");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast.error("يرجى إرفاق صورة التحويل البنكي");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call for now as requested
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(
        "تم إرسال طلب الاشتراك بنجاح. سيتم مراجعته من قبل الإدارة."
      );
      dispatch(clearCart());
      router.push("/courses");
    }, 2000);
  };

  if (isInitializing || !user) return null;

  if (!cartCourse) {
    return (
      <main className="bg-paper min-h-screen flex flex-col">
        <Navbar lightVariant={true} />
        <div className="flex-1 container mx-auto px-6 py-24 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <BookOpen className="text-gray-400" size={32} />
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

  const tax = cartCourse.priceValue * 0.15;
  const total = cartCourse.priceValue + tax;

  return (
    <main className="bg-paper min-h-screen flex flex-col" dir="rtl">
      <Navbar lightVariant={true} />

      <div className="flex-1 container mx-auto px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <Link
            href={`/courses/${cartCourse._id}`}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-navy mb-8 transition-colors"
          >
            <ArrowRight size={16} />
            العودة لتفاصيل الدورة
          </Link>
          <h1 className="text-3xl font-bold text-navy mb-8">
            إتمام طلب الاشتراك
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Right Column: Order Summary */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="bg-white rounded-xl border border-gray-100 p-6 sticky top-24 shadow-sm">
                <h3 className="font-bold text-navy text-lg mb-4">
                  ملخص الدورة
                </h3>

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
                    <p className="text-gold font-bold mt-1">
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
                    <span>{tax.toFixed(2)} ر.س</span>
                  </div>
                  <div className="flex justify-between font-bold text-navy text-lg pt-4 border-t border-gray-100 mt-2">
                    <span>الإجمالي</span>
                    <span>{total.toFixed(2)} ر.س</span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="mt-6 bg-gray-50 p-4 rounded-xl flex items-start gap-3 text-xs text-gray-500">
                  <ShieldCheck
                    className="text-green-600 flex-shrink-0 mt-0.5"
                    size={18}
                  />
                  <p>
                    سيتم تفعيل الدورة في حسابك فور مراجعة صورة التحويل 
                    والتأكد من العملية.
                  </p>
                </div>
              </div>
            </div>

            {/* Left Column: Form & Transfer */}
            <div className="lg:col-span-2 order-1 lg:order-2 space-y-6">
              {/* Account & Course Info */}
              <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
                <h3 className="font-bold text-navy text-lg mb-6 flex items-center gap-2">
                  <CheckCircle2 className="text-green-500" size={20} />
                  بيانات الطلب
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                      <User size={14} /> اسم المستخدم
                    </label>
                    <div className="w-full h-12 flex items-center px-4 bg-gray-50 border border-gray-100 rounded-lg text-navy font-bold">
                      {user.userName}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                      <BookOpen size={14} /> الدورة المختارة
                    </label>
                    <div className="w-full h-12 flex items-center px-4 bg-gray-50 border border-gray-100 rounded-lg text-navy font-bold truncate">
                      {cartCourse.title}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bank Details */}
              {/* <div className="bg-navy rounded-xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-bl-full -mr-16 -mt-16" />
                <h3 className="font-bold text-xl mb-6 relative z-10 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center text-gold text-sm font-bold">
                    1
                  </span>
                  بيانات التحويل البنكي
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                  <div className="space-y-4">
                    <div>
                      <p className="text-white/50 text-xs mb-1 uppercase tracking-wider">
                        اسم البنك
                      </p>
                      <p className="font-bold text-lg">مصرف الراجحي</p>
                    </div>
                    <div>
                      <p className="text-white/50 text-xs mb-1 uppercase tracking-wider">
                        اسم المستفيد
                      </p>
                      <p className="font-bold">مؤسسة محمد الحبسي للتدريب</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="group relative">
                      <p className="text-white/50 text-xs mb-1 uppercase tracking-wider">
                        رقم الآيبان (IBAN)
                      </p>
                      <div className="flex items-center gap-3">
                        <p
                          className="font-bold text-gold tracking-wider"
                          dir="ltr"
                        >
                          SA00 0000 0000 0000 0000 0000
                        </p>
                        <button
                          onClick={handleCopyIban}
                          className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-gold hover:text-navy transition-all"
                        >
                          {copied ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Receipt Upload */}
              <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
                <h3 className="font-bold text-navy text-lg mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-navy/5 flex items-center justify-center text-navy text-sm font-bold">
                    2
                  </span>
                  إرفاق إيصال التحويل
                </h3>

                <div className="space-y-6">
                  <div
                    className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 ${
                      previewUrl
                        ? "border-gold/50 bg-gold/5"
                        : "border-gray-200 hover:border-gold/30 bg-gray-50 hover:bg-white"
                    }`}
                  >
                    <input
                      type="file"
                      id="receipt-upload"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />

                    {previewUrl ? (
                      <div className="p-4 flex items-center gap-6">
                        <div className="w-24 h-24 relative rounded-lg overflow-hidden border border-gold/20 flex-shrink-0">
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-navy mb-1">
                            {selectedFile?.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {(selectedFile!.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedFile(null);
                              setPreviewUrl(null);
                            }}
                            className="text-xs text-red-500 font-bold mt-2 hover:underline relative z-20"
                          >
                            حذف الصورة وتغييرها
                          </button>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                          <CheckCircle2 size={24} />
                        </div>
                      </div>
                    ) : (
                      <div className="py-12 flex flex-col items-center justify-center text-center px-6">
                        <div className="w-16 h-16 rounded-full bg-navy/5 flex items-center justify-center text-navy/40 mb-4">
                          <Upload size={32} />
                        </div>
                        <h4 className="font-bold text-navy mb-2">
                          اضغط لرفع صورة التحويل
                        </h4>
                        <p className="text-sm text-gray-400">
                          بصيغة JPG أو PNG، بحد أقصى 5 ميجا بايت
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3 text-gold">
                      <ImageIcon size={20} />
                      <span className="text-sm font-bold">
                        تأكد من وضوح بيانات التحويل في الصورة
                      </span>
                    </div>

                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting || !selectedFile}
                      className="w-full md:w-auto h-14 px-12 text-lg bg-gold hover:bg-gold-dim text-navy font-bold gap-3 shadow-lg shadow-gold/20"
                    >
                      {isSubmitting ? (
                        <>جاري الإرسال...</>
                      ) : (
                        <>
                          <CheckCircle2 size={20} />
                          تأكيد الاشتراك
                        </>
                      )}
                    </Button>
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
