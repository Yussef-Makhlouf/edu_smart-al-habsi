"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Send, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "استفسار عام",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (formData.name.trim().length < 3) {
      toast.error("يرجى إدخال الاسم الكامل (3 أحرف على الأقل)");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("يرجى إدخال بريد إلكتروني صحيح");
      return;
    }

    const phoneRegex = /^[0-9]+$/;
    if (
      formData.phone.trim().length < 8 ||
      !phoneRegex.test(formData.phone.trim())
    ) {
      toast.error("يرجى إدخال رقم هاتف صحيح (أرقام فقط)");
      return;
    }

    if (formData.message.trim().length < 10) {
      toast.error("يرجى كتابة رسالة توضح استفسارك (10 أحرف على الأقل)");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("تم إرسال رسالتك بنجاح");
        setIsSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          type: "استفسار عام",
          message: "",
        });
      } else {
        toast.error("حدث خطأ أثناء إرسال الرسالة، يرجى المحاولة لاحقاً");
      }
    } catch (error) {
      toast.error("فشل الاتصال بالخادم");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-paper">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-28 bg-navy overflow-hidden">
        {/* Diagonal split */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-navy" />
          <div
            className="absolute top-0 right-0 w-2/3 h-full bg-navy-dark"
            style={{ clipPath: "polygon(35% 0, 100% 0, 100% 100%, 0% 100%)" }}
          />
        </div>

        {/* Diagonal stripe pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background:
              "repeating-linear-gradient(135deg, transparent, transparent 80px, rgba(212,175,55,0.3) 80px, rgba(212,175,55,0.3) 81px)",
          }}
        />

        {/* Large decorative text */}
        <div className="absolute bottom-0 right-0 pointer-events-none select-none">
          <span className="text-[180px] font-bold text-white/[0.02] leading-none">
            تواصل
          </span>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-3 h-3 bg-gold" />
              <div className="w-12 h-px bg-gold" />
              <span className="text-gold text-sm font-bold tracking-widest uppercase">
                تواصل معنا
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
              لنبدأ الحديث عن
              <br />
              <span className="text-gold">مستقبلك</span>
            </h1>

            <div className="relative pr-6 border-r-2 border-gold/30">
              <p className="text-xl text-white/70 leading-relaxed">
                سواء كنت تبحث عن استشارة خاصة، أو ترغب في الانضمام لبرنامج
                تدريبي، فريقنا هنا للاستماع
              </p>
            </div>
          </motion.div>
        </div>

        {/* Corner decorative elements */}
        <div className="absolute bottom-10 left-10 w-px h-24 bg-gradient-to-t from-gold/50 to-transparent" />
        <div className="absolute bottom-10 left-10 w-24 h-px bg-gradient-to-r from-gold/50 to-transparent" />
      </section>

      {/* Content Section */}
      <section className="py-20 relative z-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Contact Info Cards */}
            <div className="lg:col-span-4 space-y-6">
              <ContactCard
                icon={<Mail className="w-5 h-5" />}
                title="البريد الإلكتروني"
                value="info@alhabsi.com"
                detail="نرد عادة خلال 24 ساعة"
              />
              <ContactCard
                icon={<Phone className="w-5 h-5" />}
                title="الهاتف"
                value="+966 50 000 0000"
                detail="الأحد - الخميس: 9ص - 5م"
              />
              {/* <ContactCard
                                icon={<MapPin className="w-5 h-5" />}
                                title="العنوان"
                                value="برج الفيصلية"
                                detail="الرياض، المملكة العربية السعودية"
                            /> */}

              {/* WhatsApp Box */}
              <div className="relative overflow-hidden">
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-gold border-l-[40px] border-l-transparent z-10" />

                <div className="p-8 bg-navy text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <MessageSquare className="w-5 h-5 text-gold" />
                    <h3 className="text-lg font-bold text-gold">
                      استفسار عاجل؟
                    </h3>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    يمكنك التواصل معنا مباشرة عبر واتساب للحصول على رد سريع
                  </p>
                  <Button variant="luxury-outline" className="w-full">
                    تواصل عبر واتساب
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-8">
              <motion.div
                className="relative bg-white border border-gray-100 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Corner accent */}
                <div className="absolute top-0 left-0 w-0 h-0 border-t-[50px] border-t-gold border-r-[50px] border-r-transparent z-10" />

                <div className="p-8 md:p-12">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-navy flex items-center justify-center">
                      <Send className="text-gold w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-navy">أرسل رسالة</h2>
                  </div>

                  {/* Success View */}
                  {isSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="text-green-500 w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-bold text-navy mb-4">
                        تم إرسال رسالتك بنجاح!
                      </h3>
                      <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                        شكراً لتواصلك معنا. سنقوم بمراجعة طلبك والرد عليك في
                        أقرب وقت ممكن عبر البريد الإلكتروني.
                      </p>
                      <Button
                        variant="gold"
                        onClick={() => setIsSuccess(false)}
                        className="font-bold px-8 text-navy"
                      >
                        إرسال رسالة أخرى
                      </Button>
                    </motion.div>
                  ) : (
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                          label="الاسم الكامل"
                          placeholder="الاسم الثلاثي"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                        />
                        <InputField
                          label="البريد الإلكتروني"
                          placeholder="name@example.com"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                          label="رقم الهاتف"
                          placeholder="+966 50..."
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            setFormData({ ...formData, phone: value });
                          }}
                          required
                        />
                        <div>
                          <label className="block text-sm font-bold text-navy mb-2">
                            نوع الاستفسار
                          </label>
                          <div className="relative">
                            <select
                              value={formData.type}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  type: e.target.value,
                                })
                              }
                              className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors appearance-none cursor-pointer"
                            >
                              <option>استفسار عام</option>
                              <option>حجز دورة خاصة</option>
                              <option>تسجيل في المنصة</option>
                              <option>شراكة / رعاية</option>
                            </select>
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                              <svg
                                width="12"
                                height="8"
                                viewBox="0 0 12 8"
                                fill="none"
                              >
                                <path
                                  d="M1 1.5L6 6.5L11 1.5"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-navy mb-2">
                          الرسالة
                        </label>
                        <textarea
                          rows={6}
                          required
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors resize-none"
                          placeholder="كيف يمكننا مساعدتك؟"
                        ></textarea>
                      </div>

                      <Button
                        variant="gold"
                        size="lg"
                        disabled={isLoading}
                        className="w-full text-navy font-bold text-lg h-14 gap-2"
                      >
                        {isLoading ? (
                          <Loader2 className="animate-spin w-5 h-5" />
                        ) : (
                          <Send className="w-5 h-5 mt-1" />
                        )}
                        إرسال الرسالة
                      </Button>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function InputField({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  required,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-bold text-navy mb-2">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
        placeholder={placeholder}
      />
    </div>
  );
}

function ContactCard({
  icon,
  title,
  value,
  detail,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  detail: string;
}) {
  return (
    <motion.div
      className="relative group bg-white border border-gray-100 hover:border-gold/40 transition-all duration-200 overflow-hidden"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-gold transition-colors" />

      <div className="flex items-start gap-4 p-6">
        <div className="w-12 h-12 bg-navy flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-navy transition-all">
          {icon}
        </div>
        <div>
          <h4 className="text-gray-500 text-sm mb-1 font-medium">{title}</h4>
          <p className="font-bold text-navy text-lg mb-1">{value}</p>
          <p className="text-xs text-gold font-medium">{detail}</p>
        </div>
      </div>
    </motion.div>
  );
}
