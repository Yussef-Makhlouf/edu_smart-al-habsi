import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { authAPI } from "@/lib/api/auth/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

export function useLoginForm() {
  const router = useRouter();
  const { setUserFromAPI } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const getArabicErrorMessage = (error: unknown): string => {
    if (!(error instanceof Error)) {
      return "حدث خطأ أثناء تسجيل الدخول";
    }

    const message = error.message.toLowerCase();

    // Translate common error messages to Arabic
    if (message.includes("network") || message.includes("fetch")) {
      return "خطأ في الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت";
    }
    if (message.includes("401") || message.includes("unauthorized")) {
      return "البريد الإلكتروني أو كلمة المرور غير صحيحة";
    }
    if (message.includes("404")) {
      return "الخدمة غير متاحة حالياً";
    }
    if (message.includes("500") || message.includes("server")) {
      return "خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقاً";
    }
    if (message.includes("email") || message.includes("password")) {
      return "البريد الإلكتروني أو كلمة المرور غير صحيحة";
    }
    if (message.includes("user not found")) {
      return "المستخدم غير موجود";
    }
    if (message.includes("invalid credentials")) {
      return "بيانات الدخول غير صحيحة";
    }

    // If message is already in Arabic or contains Arabic characters, return as is
    if (/[\u0600-\u06FF]/.test(error.message)) {
      return error.message;
    }

    // Default Arabic error message
    return "حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى";
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      // Call the API
      const response = await authAPI.login({
        email: data.email,
        password: data.password,
      });

      // Validate response structure
      if (!response) {
        throw new Error("لم يتم استلام استجابة من الخادم");
      }

      if (!response.userUpdated) {
        throw new Error("بيانات المستخدم غير متوفرة في الاستجابة");
      }

      if (!response.userUpdated.user) {
        throw new Error("بيانات المستخدم غير متوفرة في الاستجابة");
      }

      if (!response.userUpdated.user._id) {
        throw new Error("معرف المستخدم غير متوفر");
      }

      if (!response.userUpdated.token) {
        throw new Error("رمز المصادقة غير متوفر");
      }

      // Extract user data from API response
      const apiUser = response.userUpdated.user;
      const token = response.userUpdated.token;

      // Normalize role (API returns "Admin" or "User", we need "admin" or "student")
      const normalizedRole = apiUser.role?.toLowerCase() === "admin" ? "admin" : "student";

      // Store token if rememberMe is checked
      if (data.rememberMe && token) {
        localStorage.setItem("auth_token", token);
      } else if (token) {
        sessionStorage.setItem("auth_token", token);
      }

      // Update store with user data from API (convert _id to id and normalize role)
      setUserFromAPI({
        id: apiUser._id,
        userName: apiUser.userName,
        email: apiUser.email,
        role: normalizedRole === "admin" ? "admin" : "user",
        image: apiUser.image,
      });

      // Redirect based on role
      if (normalizedRole === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/my-courses");
      }
    } catch (err) {
      const errorMessage = getArabicErrorMessage(err);
      setError(errorMessage);
      form.setError("root", {
        type: "manual",
        message: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    onSubmit,
    isLoading,
    error,
  };
}

