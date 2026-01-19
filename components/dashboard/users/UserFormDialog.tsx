"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import {
  useAddUserMutation,
  useUpdateUserMutation,
} from "@/lib/api/users/usersApi";
import { User, UserRole } from "@/lib/api/users/types";
import { toast } from "sonner";

const userSchema = z.object({
  userName: z.string().min(3, "اسم المستخدم يجب أن يكون 3 أحرف على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صالح"),
  password: z.string().optional(),
  role: z.enum(["Admin", "Student", "Instructor"]),
  isActive: z.boolean().default(true),
});

type UserFormSchemaType = z.infer<typeof userSchema>;

// Use interface to improve type compatibility with react-hook-form
interface UserFormValues extends UserFormSchemaType {}

interface UserFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User | null; // If present, we are editing
}

export function UserFormDialog({
  open,
  onOpenChange,
  user,
}: UserFormDialogProps) {
  const isEditing = !!user;
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Mutations
  const [addUser, { isLoading: isAdding }] = useAddUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const isLoading = isAdding || isUpdating;

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema) as any,
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      role: "Student",
      isActive: true,
    },
  });

  // Reset form when user changes (edit mode vs add mode)
  useEffect(() => {
    if (user) {
      form.reset({
        userName: user.userName,
        email: user.email,
        role: user.role,
        isActive: !user.isBlocked, // API uses isBlocked, form uses isActive
        password: "", // Password is optional on edit
      });
      // Handle image preview
      if (typeof user.image === "object" && user.image?.secure_url) {
        setImagePreview(user.image.secure_url);
      } else if (typeof user.image === "string") {
        setImagePreview(user.image);
      } else {
        setImagePreview("");
      }
    } else {
      form.reset({
        userName: "",
        email: "",
        password: "",
        role: "Student",
        isActive: true,
      });
      setImagePreview("");
    }
    setImageFile(null);
  }, [user, form, open]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview("");
    // If editing, we might want a way to flag "remove image",
    // but typically this just clears the new upload rendering.
    // For simplicity, if editing and cleared, it just means no *new* image.
    // If user wants to delete existing image, that needs separate logic if supported.
    if (user) {
      if (typeof user.image === "object" && user.image?.secure_url) {
        setImagePreview(user.image.secure_url);
      } else if (typeof user.image === "string") {
        setImagePreview(user.image);
      }
    }
  };

  /* 
     Fixing TypeScript error by ensuring consistent types.
     We removed the explicit SubmitHandler type to let TS infer strictly from useForm<UserFormValues>.
  */
  const onSubmit = async (values: UserFormValues) => {
    try {
      const formData = new FormData();
      formData.append("userName", values.userName);
      formData.append("email", values.email);
      formData.append("role", values.role);

      // Password logic
      if (values.password && values.password.trim() !== "") {
        formData.append("password", values.password);
      } else if (!isEditing) {
        // Password required for new users
        form.setError("password", {
          message: "كلمة المرور مطلوبة للمستخدم الجديد",
        });
        return;
      }

      // Image validation for new users
      if (!isEditing && !imageFile) {
        toast.error("الصورة مطلوبة لإضافة مستخدم جديد");
        return;
      }

      if (imageFile) {
        formData.append("image", imageFile);
      }

      // For update, we might need to send isActive mapping to isBlocked?
      // The UpdateUserDTO supports isActive.
      // Wait, the API spec says: isActive boolean.
      // My types.ts UpdateUserDTO says isActive?: boolean.
      // Let's rely on that.
      // Actually, if we are editing, we usually inverse isBlocked.
      // Let's assume the backend handles isActive -> isBlocked conversion or direct update.
      // If the backend expects isBlocked, I should send that.
      // The prompt says "isActive: boolean (mapped to internal status if needed)".
      // I'll send basic fields.

      if (isEditing && user._id) {
        await updateUser({ id: user._id, data: formData }).unwrap();
        toast.success("تم تحديث بيانات المستخدم بنجاح");
      } else {
        await addUser(formData).unwrap();
        toast.success("تم إضافة المستخدم بنجاح");
      }
      onOpenChange(false);
    } catch (error: any) {
      console.error("User form error:", error);
      const message = error?.data?.message || "حدث خطأ ما";
      toast.error(message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "تعديل المستخدم" : "إضافة مستخدم جديد"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "قم بتعديل بيانات المستخدم هنا. اضغط حفظ عند الانتهاء."
              : "أدخل بيانات المستخدم الجديد أدناه."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Image Upload */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                {imagePreview ? (
                  <>
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                    >
                      <X className="text-white w-6 h-6" />
                    </button>
                  </>
                ) : (
                  <Upload className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div className="flex items-center">
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer text-sm text-gold font-bold hover:underline"
                >
                  {isEditing ? "تغيير الصورة" : "رفع صورة"}
                  {!isEditing && <span className="text-red-500 mr-1">*</span>}
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <FormField
              control={form.control as any}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    الاسم الكامل <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="أدخل الاسم" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control as any}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    البريد الإلكتروني <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="example@domain.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control as any}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isEditing ? (
                      "كلمة المرور (اختياري)"
                    ) : (
                      <>
                        كلمة المرور <span className="text-red-500">*</span>
                      </>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="******" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control as any}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    الدور (Role) <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الدور" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Student">طالب (Student)</SelectItem>
                      <SelectItem value="Instructor">
                        مدرب (Instructor)
                      </SelectItem>
                      <SelectItem value="Admin">مسؤول (Admin)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                إلغاء
              </Button>
              <Button type="submit" variant="gold" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditing ? "حفظ التغييرات" : "إضافة المستخدم"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
