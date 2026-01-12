import { useState } from "react";
import { authService } from "@/lib/api/auth/service";
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

      await authService.forgetPassword(data.email);

      setIsSuccess(true);
      toast.success("تم إرسال الطلب بنجاح", {
        description: "يرجى التحقق من بريدك الإلكتروني للحصول على رابط إعادة التعيين",
      });
      form.reset();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "حدث خطأ أثناء إرسال الطلب";
      toast.error("فشل الإرسال", {
        description: errorMessage,
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
