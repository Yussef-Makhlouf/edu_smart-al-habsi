import { Button } from "@/components/ui/button";
import { Book, User, PlayCircle, Clock, TrendingUp, Award } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    return (
        <div>
            {/* Welcome */}
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h1 className="text-3xl font-bold text-navy mb-2">مرحباً، محمد 👋</h1>
                    <p className="text-gray-500">استمر في رحلة التعلم الخاصة بك.</p>
                </div>
                <Link href="/courses">
                    <Button variant="gold" shape="sharp" className="text-navy font-bold">تصفح دورات جديدة</Button>
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <StatCard label="الدورات المكتملة" value="4" icon={<Book className="text-gold" />} />
                <StatCard label="ساعات التعلم" value="32" icon={<Clock className="text-blue-500" />} />
                <StatCard label="الشهادات" value="2" icon={<Award className="text-green-500" />} />
                <StatCard label="التقدم" value="75%" icon={<TrendingUp className="text-purple-500" />} />
            </div>

            {/* Current Progress */}
            <h2 className="text-xl font-bold text-navy mb-6">متابعة التعلم</h2>
            <div className="flex flex-col gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-32 h-20 bg-navy/5 rounded-md flex-shrink-0 flex items-center justify-center text-navy/20">
                        صورة
                    </div>
                    <div className="flex-1 w-full text-center md:text-right">
                        <h3 className="font-bold text-navy mb-1">أسرار القيادة الاستراتيجية</h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 md:justify-start justify-center">
                            <span>القسم 3 من 10</span>
                            <span>•</span>
                            <span>15 دقيقة متبقية</span>
                        </div>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-gold h-full w-[35%]" />
                        </div>
                    </div>
                    <Button variant="outline" className="shrink-0 gap-2 border-navy/20 text-navy hover:bg-navy hover:text-white">
                        <PlayCircle size={16} /> استئناف
                    </Button>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/dashboard/courses" className="block">
                    <div className="bg-gold/10 border border-gold/20 rounded-lg p-6 hover:bg-gold/20 transition-colors cursor-pointer">
                        <h3 className="font-bold text-navy mb-2">إدارة الدورات</h3>
                        <p className="text-sm text-gray-600">إنشاء وتعديل الدورات التدريبية</p>
                    </div>
                </Link>
                <Link href="/courses" className="block">
                    <div className="bg-navy/5 border border-navy/10 rounded-lg p-6 hover:bg-navy/10 transition-colors cursor-pointer">
                        <h3 className="font-bold text-navy mb-2">تصفح الدورات</h3>
                        <p className="text-sm text-gray-600">اكتشف دورات جديدة لتطوير مهاراتك</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

function StatCard({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
                {icon}
            </div>
            <div>
                <div className="text-3xl font-bold text-navy">{value}</div>
                <div className="text-sm text-gray-500">{label}</div>
            </div>
        </div>
    )
}
