"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";

export default function DashboardPage() {
  const { user, isLoading } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  // Auto redirect based on user role
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login");
      } else if (user.role === "Admin") {
        // Admin stays on dashboard
        return;
      } else {
        // Anyone else (Student, Instructor) redirects to my-courses
        router.push("/my-courses");
      }
    }
  }, [user, isLoading, router]);

  // Show loading or nothing while redirecting
  if (isLoading || !user) return null;
  if (user.role !== "Admin") return null;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content - No Sidebar here, layout handles it */}
      <DashboardOverview />
    </div>
  );
}
