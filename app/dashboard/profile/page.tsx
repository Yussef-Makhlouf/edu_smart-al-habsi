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
import { User, Mail, Lock, Camera, Save, Loader2 } from "lucide-react";
import { useProfile } from "@/lib/hooks/useProfile";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

export default function ProfilePage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    form,
    onSubmit,
    isLoading,
    isFetching,
    isDirty,
    profileImage,
    handleImageChange,
    getInitial,
  } = useProfile();

  const userName = user?.name || form.watch("userName") || "";

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-10" dir="rtl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-navy">الملف الشخصي</h1>
        <p className="text-gray-500 mt-1">إدارة معلوماتك الشخصية والأمان</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        {/* Avatar Section */}
        <div className="bg-navy/5 p-8 flex flex-col items-center border-b border-gray-100">
          <div className="relative group">
            {profileImage ? (
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md">
                <img
                  src={profileImage}
                  alt={userName}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-28 h-28 rounded-full bg-navy flex items-center justify-center text-4xl text-gold font-bold border-4 border-white shadow-md">
                {getInitial(userName)}
              </div>
            )}
            <label
              htmlFor="dashboard-image-upload"
              className={`absolute bottom-0 left-0 bg-gold p-2 rounded-full text-navy shadow-lg cursor-pointer hover:scale-110 transition-transform ${
                isLoading || isFetching ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Camera size={16} />
              <input
                id="dashboard-image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={isLoading || isFetching}
              />
            </label>
          </div>
          <h2 className="mt-4 text-xl font-bold text-navy">{userName}</h2>
          <p className="text-gray-500 text-sm">
            {user?.role.toLowerCase() === "admin" ? "مدير النظام" : "طالب"}
          </p>
        </div>

        {/* Form Section */}
        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-bold text-navy">
                        اسم المستخدم
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User
                            size={16}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                          />
                          <Input
                            {...field}
                            className="w-full h-11 pr-10 pl-4 rounded-lg border-gray-200 focus:border-gold focus:ring-gold/20"
                            disabled={isLoading || isFetching}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-right text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-bold text-navy">
                        البريد الإلكتروني
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail
                            size={16}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                          />
                          <Input
                            {...field}
                            type="email"
                            className="w-full h-11 pr-10 pl-4 rounded-lg border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                            readOnly
                            dir="ltr"
                          />
                        </div>
                      </FormControl>
                      <p className="text-[10px] text-gray-400 mt-1">
                        لا يمكن تعديل البريد الإلكتروني.
                      </p>
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-6 border-t border-gray-100">
                <h3 className="font-bold text-navy mb-4 flex items-center gap-2">
                  <Lock size={18} className="text-gold" />
                  تغيير كلمة المرور
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold text-navy">
                          كلمة المرور الجديدة
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock
                              size={16}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <Input
                              {...field}
                              type="password"
                              placeholder="••••••••"
                              className="w-full h-11 pr-10 pl-4 rounded-lg border-gray-200 focus:border-gold focus:ring-gold/20"
                              disabled={isLoading || isFetching}
                            />
                          </div>
                        </FormControl>
                        <p className="text-[10px] text-gray-400 mt-1">
                          اتركه فارغاً إذا لم ترد التغيير
                        </p>
                        <FormMessage className="text-right text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold text-navy">
                          تأكيد كلمة المرور
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock
                              size={16}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <Input
                              {...field}
                              type="password"
                              placeholder="••••••••"
                              className="w-full h-11 pr-10 pl-4 rounded-lg border-gray-200 focus:border-gold focus:ring-gold/20"
                              disabled={isLoading || isFetching}
                            />
                          </div>
                        </FormControl>
                        <p className="text-[10px] text-gray-400 mt-1">
                          أعد كتابة كلمة المرور للتأكيد
                        </p>
                        <FormMessage className="text-right text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={isLoading || isFetching || !isDirty}
                  className="gap-2 bg-gold hover:bg-gold-dim text-navy font-bold px-8 h-11"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      جاري الحفظ...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      حفظ التغييرات
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
