import { useState } from "react";
import { authService } from "@/lib/api/auth/service";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const resetPasswordSchema = z.object({
    newPassword: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
    confirmPassword: z.string().min(6, "تأكيد كلمة المرور مطلوب"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export function useResetPassword(token: string) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: ResetPasswordFormData) => {
        if (!token) {
            toast.error("رابط غير صحيح أو منتهي الصلاحية");
            return;
        }

        try {
            setIsLoading(true);
            await authService.resetPassword(token, data.newPassword);

            toast.success("تم تغيير كلمة المرور بنجاح");
            router.push("/login");
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || "حدث خطأ أثناء تغيير كلمة المرور";
            toast.error("فشل التغيير", {
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
    };
}
