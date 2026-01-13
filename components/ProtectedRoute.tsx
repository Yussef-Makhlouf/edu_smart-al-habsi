"use client";

import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/forget-password",
  "/reset-password",
  "/courses",
  "/about",
  "/contact",
];

const isPublicRoute = (pathname: string) => {
  // Exact matches
  if (PUBLIC_ROUTES.includes(pathname)) return true;

  // Dynamic course details are public, but /learn is NOT
  if (pathname.startsWith("/courses/") && !pathname.endsWith("/learn")) {
    return true;
  }

  return false;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated && !isPublicRoute(pathname)) {
        router.push("/login");
      } else if (
        isAuthenticated &&
        isPublicRoute(pathname) &&
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

  if (isLoading && !isPublicRoute(pathname)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  return <>{children}</>;
}
