import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileUpdateSchema, type ProfileUpdateFormData } from "@/lib/validations/auth";
import { authAPI } from "@/lib/api/auth/api";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

export function useProfile() {
  const { user, setUserFromAPI } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<ProfileUpdateFormData>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      role: "",
    },
  });

  // Fetch user data from API
  const fetchUserData = async () => {
    if (!user?.id) return;

    try {
      setIsFetching(true);
      const token = localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token");
      
      if (!token) {
        throw new Error("لم يتم العثور على رمز المصادقة");
      }

      const response = await authAPI.getUserById(user.id, token);
      
      if (response.success && response.user) {
        // Set form values
        form.reset({
          userName: response.user.userName || "",
          email: response.user.email || "",
          password: "",
          role: response.user.role || "",
        });

        // Set profile image if available
        if (response.user.image) {
          let imageUrl: string;
          // Handle image as object (from ImageKit) or string
          if (typeof response.user.image === 'object' && response.user.image.secure_url) {
            imageUrl = response.user.image.secure_url;
          } else if (typeof response.user.image === 'string') {
            imageUrl = response.user.image.startsWith('http') 
              ? response.user.image 
              : `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'}${response.user.image}`;
          } else {
            imageUrl = '';
          }
          setProfileImage(imageUrl || null);
        } else {
          // Clear image if not available
          setProfileImage(null);
        }
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "حدث خطأ أثناء جلب بيانات المستخدم";
      
      // Auto logout on unauthorized
      if (errorMessage.includes("غير مصرح") || errorMessage.includes("401")) {
        logout();
        setError("انتهت صلاحية جلستك، يرجى تسجيل الدخول مرة أخرى");
        return;
      }
      
      setError(errorMessage);
    } finally {
      setIsFetching(false);
    }
  };

  // Load user data on mount
  useEffect(() => {
    if (user?.id) {
      fetchUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // Get first letter of name for placeholder
  const getInitial = (name?: string): string => {
    if (!name) return "؟";
    return name.charAt(0).toUpperCase();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("الملف المحدد ليس صورة");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("حجم الصورة يجب أن يكون أقل من 5 ميجابايت");
        return;
      }

      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProfileUpdateFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      const token = localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token");
      
      if (!token) {
        throw new Error("لم يتم العثور على رمز المصادقة");
      }

      if (!user?.id) {
        throw new Error("معرف المستخدم غير متوفر");
      }

      // Create FormData
      const formData = new FormData();
      formData.append("userName", data.userName);
      formData.append("email", data.email);
      
      if (data.password) {
        formData.append("password", data.password);
      }
      
      if (data.role) {
        formData.append("role", data.role);
      }

      // Add image if selected
      if (imageFile) {
        formData.append("image", imageFile);
      }

      // Update user
      const response = await authAPI.updateUser(user.id, formData, token);

      if (response.user) {
        // Update store
        const normalizedRole = response.user.role?.toLowerCase() === "admin" ? "admin" : "user";
        // Extract image URL if it's an object
        let imageUrl: string | undefined;
        if (response.user.image) {
          if (typeof response.user.image === 'object' && response.user.image.secure_url) {
            imageUrl = response.user.image.secure_url;
          } else if (typeof response.user.image === 'string') {
            imageUrl = response.user.image;
          }
        }

        setUserFromAPI({
          id: response.user._id,
          userName: response.user.userName,
          email: response.user.email,
          role: normalizedRole === "admin" ? "admin" : "user",
          image: imageUrl,
        });

        // Update profile image display
        if (response.user.image) {
          let imageUrl: string;
          // Handle image as object (from ImageKit) or string
          if (typeof response.user.image === 'object' && response.user.image.secure_url) {
            imageUrl = response.user.image.secure_url;
          } else if (typeof response.user.image === 'string') {
            imageUrl = response.user.image.startsWith('http') 
              ? response.user.image 
              : `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'}${response.user.image}`;
          } else {
            imageUrl = '';
          }
          setProfileImage(imageUrl || null);
        } else {
          // Clear image if not provided
          setProfileImage(null);
        }

        // Update form with new data
        form.reset({
          userName: response.user.userName || "",
          email: response.user.email || "",
          password: "", // Clear password field
          role: response.user.role || "",
        });

        // Show success toast
        toast.success("تم التحديث بنجاح", {
          description: "تم تحديث الملف الشخصي بنجاح",
        });

        // Clear image file after successful upload
        setImageFile(null);
        
        // Don't refetch - we already have the updated data from response
        // Refetching might cause token issues
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "حدث خطأ أثناء تحديث الملف الشخصي";
      
      // Auto logout on unauthorized
      if (errorMessage.includes("غير مصرح") || errorMessage.includes("401")) {
        logout();
        setError("انتهت صلاحية جلستك، يرجى تسجيل الدخول مرة أخرى");
        form.setError("root", {
          type: "manual",
          message: errorMessage,
        });
        return;
      }
      
      setError(errorMessage);
      form.setError("root", {
        type: "manual",
        message: errorMessage,
      });
      
      // Show error toast
      toast.error("فشل التحديث", {
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
    isFetching,
    error,
    success,
    profileImage,
    handleImageChange,
    getInitial,
    fetchUserData,
  };
}

