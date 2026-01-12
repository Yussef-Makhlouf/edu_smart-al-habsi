"use client";

import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/forget-password",
  "/reset-password",
  "/",
];

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated && !PUBLIC_ROUTES.includes(pathname)) {
        router.push("/login");
      } else if (
        isAuthenticated &&
        PUBLIC_ROUTES.includes(pathname) &&
        pathname !== "/"
      ) {
        if (user?.role?.toLowerCase() === "admin") {
          router.push("/dashboard");
        } else {
          router.push("/my-courses");
        }
      }
    }
  }, [isAuthenticated, isLoading, user, pathname, router]);

  if (isLoading && !PUBLIC_ROUTES.includes(pathname)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  return <>{children}</>;
}
