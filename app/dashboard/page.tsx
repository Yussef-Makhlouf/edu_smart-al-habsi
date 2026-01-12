"use client";

import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";

export default function DashboardPage() {
  const { user } = useStore();
  const router = useRouter();

  // Auto redirect based on user role
  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (user.role === "admin") {
      // Admin stays on dashboard
      return;
    } else if (user.role === "student") {
      // Student redirects to my-courses
      router.push("/my-courses");
    }
  }, [user, router]);

  // Show loading or nothing while redirecting
  if (!user) return null;
  if (user.role !== "admin") return null;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content - No Sidebar here, layout handles it */}
      <DashboardOverview />
    </div>
  );
}
