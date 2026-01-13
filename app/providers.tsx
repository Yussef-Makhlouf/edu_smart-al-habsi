"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { hydrate } from "@/lib/redux/slices/authSlice";

/**
 * Component to handle auth initialization on app load
 */
function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Attempt to restore session on mount (covers Refresh)
    console.log("🚀 AuthInitializer mounted, dispatching hydrate...");
    dispatch(hydrate());
  }, [dispatch]);

  return <>{children}</>;
}

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthInitializer>
        <ProtectedRoute>{children}</ProtectedRoute>
        <Toaster richColors position="top-center" dir="rtl" />
      </AuthInitializer>
    </Provider>
  );
}
