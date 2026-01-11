import { User } from "@/lib/store";
import { Users, BookOpen, TrendingUp } from "lucide-react";

interface DashboardSidebarProps {
    user: User;
    activeTab: "overview" | "students" | "courses";
    setActiveTab: (tab: "overview" | "students" | "courses") => void;
}

export function DashboardSidebar({ user, activeTab, setActiveTab }: DashboardSidebarProps) {
    return (
        <aside className="w-64 bg-navy text-white hidden md:flex flex-col h-screen sticky top-0">
            <div className="p-6">
                <h1 className="text-xl font-bold text-gold">لوحة تحكم المدير</h1>
            </div>
            <nav className="flex-1 px-4 space-y-2">
                <button
                    onClick={() => setActiveTab("overview")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                    <TrendingUp size={20} /> نظرة عامة
                </button>
                <button
                    onClick={() => setActiveTab("students")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'students' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                    <Users size={20} /> الطلاب
                </button>
                <button
                    onClick={() => setActiveTab("courses")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'courses' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                    <BookOpen size={20} /> الدورات
                </button>
            </nav>
            <div className="p-4 border-t border-white/10 bg-black/20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">
                        {user.name.charAt(0)}
                    </div>
                    <div className="overflow-hidden">
                        <p className="font-bold truncate text-sm">{user.name}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
