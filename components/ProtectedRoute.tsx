"use client";

import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forget-password",
  "/reset-password",
];

const PUBLIC_ROUTES = ["/", "/courses", "/about", "/contact"];

const isPublicRoute = (pathname: string) => {
  if (PUBLIC_ROUTES.includes(pathname)) return true;
  if (pathname.startsWith("/courses/") && !pathname.endsWith("/learn")) {
    return true;
  }
  return false;
};

const isAuthRoute = (pathname: string) => AUTH_ROUTES.includes(pathname);

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      // 1. Not logged in -> Must go to login if NOT a public route
      if (!isAuthenticated && !isPublicRoute(pathname)) {
        router.push("/login");
      }
      // 2. Logged in -> Only redirect away if trying to access Auth pages (login/register)
      else if (isAuthenticated && isAuthRoute(pathname)) {
        if (user?.role !== "Student") {
          router.push("/dashboard");
        } else {
          router.push("/my-courses");
        }
      }
      // 3. Logged in & Non-Student -> Restrict specific pages
      else if (isAuthenticated && user?.role !== "Student") {
        const STUDENT_ONLY_ROUTES = [
          "/profile",
          "/my-courses",
          "/my-certificates",
        ];

        if (STUDENT_ONLY_ROUTES.includes(pathname)) {
          router.push("/dashboard");
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
