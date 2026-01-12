import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DashboardSidebar } from "@/components/DashboardSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
}

export function DashboardLayout({
  children,
  title,
  description,
  actions,
}: DashboardLayoutProps) {
  return (
    <div className="bg-white min-h-screen flex flex-col font-sans" dir="rtl">
      <Navbar lightVariant={false} />

      {/* Hero Header matching Image 3 */}
      <div className="bg-navy relative pt-32 pb-20 overflow-hidden">
        {/* Background Grid/Particles */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl font-bold text-white mb-2">
            {title || "صفحتي"}
          </h1>
          <p className="text-white/60 text-lg">
            {description || "مرحباً بك في منصتك التعليمية"}
          </p>

          {/* Optional: Breadcrumbs or Actions if needed */}
          {actions && <div className="mt-4">{actions}</div>}
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content (Left in Image 3?) 
              Wait, Image 3 shows Sidebar on Right, Content on Left.
              In RTL grid, col-1 is right-most.
          */}

          {/* Sidebar */}
          <aside className="lg:col-span-1 order-1 lg:order-1">
            <DashboardSidebar />
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 order-2 lg:order-2">{children}</main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
