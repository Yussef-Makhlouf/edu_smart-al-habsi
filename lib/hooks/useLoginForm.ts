import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "@/lib/api/auth/service";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCredentials, setError as setAuthSliceError, setLoading } from "@/lib/redux/slices/authSlice";
import { LoginFormInput, loginSchema } from "../validations/auth";

export function useLoginForm() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<LoginFormInput>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    const onSubmit = async (data: LoginFormInput) => {
        try {
            setIsLoading(true);
            dispatch(setLoading(true));
            setError(null);

            const response = await authService.login({
                email: data.email,
                password: data.password,
            });

            if (!response || !response.userUpdated) {
                throw new Error("بيانات الدخول غير صحيحة");
            }

            const { user, token } = response.userUpdated;

            // Update Redux
            dispatch(setCredentials({
                user,
                token
            }));

            // Invalidate Enrollment tags to force refetch of my courses
            const { enrollmentApi } = await import("@/lib/api/enrollment/enrollmentApi");
            dispatch(enrollmentApi.util.invalidateTags(["Enrollment"]));

            // Redirect
            if (user.role === "Admin") {
                router.push("/dashboard/courses");
            } else {
                router.push("/my-courses");
            }

        } catch (err: any) {
            const msg = err.response?.data?.message || err.message || "حدث خطأ أثناء تسجيل الدخول";
            setError(msg);
            dispatch(setAuthSliceError(msg));
        } finally {
            setIsLoading(false);
            dispatch(setLoading(false));
        }
    };

    return {
        form,
        onSubmit,
        isLoading,
        error,
    };
}
