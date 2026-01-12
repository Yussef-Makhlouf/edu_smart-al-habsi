import { z } from "zod";

// Login Form Schema - Fixed to avoid TypeScript issues
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("البريد الإلكتروني غير صحيح"),
  password: z
    .string()
    .min(1, "كلمة المرور مطلوبة")
    .min(3, "كلمة المرور يجب أن تكون على الأقل 3 أحرف"),
  rememberMe: z.boolean().optional().default(false),

});

export type LoginFormInput = z.input<typeof loginSchema>;   // RHF
export type LoginFormData = z.output<typeof loginSchema>;  // onSubmit

// Register Form Schema
export const registerSchema = z.object({
  userName: z
    .string()
    .min(1, "اسم المستخدم مطلوب")
    .min(2, "اسم المستخدم يجب أن يكون على الأقل حرفين"),
  email: z
    .string()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("البريد الإلكتروني غير صحيح"),
  password: z
    .string()
    .min(1, "كلمة المرور مطلوبة")
    .min(6, "كلمة المرور يجب أن تكون على الأقل 6 أحرف"),
  confirmPassword: z.string().min(1, "تأكيد كلمة المرور مطلوب"),
  role: z.enum(["student", "admin"]).default("student"),

}).refine((data) => data.password === data.confirmPassword, {
  message: "كلمات المرور غير متطابقة",
  path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof registerSchema>;

// Profile Update Schema
export const profileUpdateSchema = z.object({
  userName: z
    .string()
    .min(1, "اسم المستخدم مطلوب")
    .min(2, "اسم المستخدم يجب أن يكون على الأقل حرفين"),
  email: z
    .string()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("البريد الإلكتروني غير صحيح"),
  password: z.string().optional(),
  role: z.string().optional(),
  image: z.instanceof(File).optional().or(z.string().optional()),
});

export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;

// Password Change Schema
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "كلمة المرور الحالية مطلوبة"),
  newPassword: z
    .string()
    .min(1, "كلمة المرور الجديدة مطلوبة")
    .min(6, "كلمة المرور يجب أن تكون على الأقل 6 أحرف"),
  confirmPassword: z.string().min(1, "تأكيد كلمة المرور مطلوب"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "كلمات المرور غير متطابقة",
  path: ["confirmPassword"],
});

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

// Forget Password Schema
export const forgetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("البريد الإلكتروني غير صحيح"),
});

export type ForgetPasswordFormData = z.infer<typeof forgetPasswordSchema>;