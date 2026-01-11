"use client";

import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";

export default function DashboardPage() {
  const { user } = useStore();
  const router = useRouter();

  // Role Protection
  useEffect(() => {
    if (user && user.role !== "admin") {
      router.push("/my-courses");
    } else if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user || user.role !== "admin") return null;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content - No Sidebar here, layout handles it */}
      <DashboardOverview />
    </div>
  );
}
