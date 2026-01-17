import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { Logo } from "@/components/Logo";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 lg:mr-64 font-sans" dir="rtl">
      {/* Mobile Header */}
      <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center lg:hidden sticky top-0 z-40">
        <Logo />
        <DashboardSidebar mobile={true} />
      </header>

      <DashboardSidebar />

      <main className="p-4 md:p-6 lg:p-8">{children}</main>
    </div>
  );
}
