"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { MOCK_USERS } from "@/lib/data/mockData";
import {
  DollarSign,
  Users,
  BookOpen,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { StatCard } from "./StatCard";
import { SectionHeader } from "./SectionHeader";

export function DashboardOverview() {
  const { items: courses } = useSelector((state: RootState) => state.courses);
  const users = MOCK_USERS; // Fallback to mock users for admin dashboard for now

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        title="نظرة عامة"
        description="ملخص سريع لأداء المنصة اليوم."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={DollarSign}
          label="إجمالي المبيعات"
          value="45,200 SAR"
          trend="+12%"
        />
        <StatCard
          icon={Users}
          label="عدد الطلاب"
          value={users.filter((u) => u.role === "student").length.toString()}
          trend="+5%"
        />
        <StatCard
          icon={BookOpen}
          label="الدورات النشطة"
          value={courses.length.toString()}
        />
        <StatCard
          icon={TrendingUp}
          label="نسبة الإكمال"
          value="68%"
          trend="+2%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-navy mb-4">أحدث الاشتراكات</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100" />
                <div className="flex-1">
                  <p className="font-bold text-sm text-navy">طالب جديد #{i}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      اشترك في دورة القيادة
                    </span>
                    <span className="text-xs font-bold text-green-600">
                      +1200 SAR
                    </span>
                  </div>
                </div>
                <span className="text-xs text-gray-400">منذ ساعتين</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-navy mb-6">تنبيهات النظام</h3>
          <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 mb-4 flex gap-3">
            <AlertCircle className="text-orange-500 shrink-0" size={20} />
            <div>
              <h4 className="font-bold text-orange-800 text-sm">
                مساحة التخزين
              </h4>
              <p className="text-xs text-orange-600 mt-1">
                شارفت مساحة تخزين ملفات الفيديو على الامتلاء (85%).
              </p>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3">
            <Users className="text-blue-500 shrink-0" size={20} />
            <div>
              <h4 className="font-bold text-blue-800 text-sm">طلب دعم جديد</h4>
              <p className="text-xs text-blue-600 mt-1">
                يوجد 3 تذاكر دعم فني بانتظار الرد.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
