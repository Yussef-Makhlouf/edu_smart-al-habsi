import { useState } from "react";
import { authAPI } from "@/lib/api/auth/api";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const forgetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("البريد الإلكتروني غير صحيح"),
});

export type ForgetPasswordFormData = z.infer<typeof forgetPasswordSchema>;

export function useForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ForgetPasswordFormData>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgetPasswordFormData) => {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      form.clearErrors();

      const response = await authAPI.forgetPassword(data.email);

      if (response && response.message) {
        setIsSuccess(true);
        toast.success("تم إرسال الطلب بنجاح", {
          description: response.message === "password changed" 
            ? "تم تغيير كلمة المرور. يرجى التحقق من بريدك الإلكتروني للحصول على كلمة المرور الجديدة"
            : "يرجى التحقق من بريدك الإلكتروني",
        });
        // Don't reset form immediately - let user see success message
        setTimeout(() => {
          form.reset();
        }, 2000);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "حدث خطأ أثناء إرسال الطلب";
      toast.error("فشل الإرسال", {
        description: errorMessage,
      });
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
    isSuccess,
  };
}

