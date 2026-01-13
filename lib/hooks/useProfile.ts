import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileUpdateSchema, type ProfileUpdateFormData } from "@/lib/validations/auth";
import { authService } from "@/lib/api/auth/service";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { logout, updateCredentials } from "@/lib/redux/slices/authSlice";
import { toast } from "sonner";

export function useProfile() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [initialImage, setInitialImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<ProfileUpdateFormData>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      userName: user?.userName || "",
      email: user?.email || "",
      password: "",
      confirmPassword: "",
      role: user?.role || "",
    },
  });

  // Fetch fresh user data
  const fetchUserData = async () => {
    if (!user?._id) return;

    try {
      setIsFetching(true);
      const response = await authService.getUserById(user._id);

      if (response.user) {
        form.reset({
          userName: response.user.userName || "",
          email: response.user.email || "",
          password: "",
          confirmPassword: "",
          role: response.user.role || "",
        });

        if (response.user.image) {
          const imageUrl = typeof response.user.image === 'object' ? response.user.image.secure_url : response.user.image;
          setProfileImage(imageUrl || null);
          setInitialImage(imageUrl || null);
        }
      }
    } catch (err: any) {
      console.error("Failed to fetch user data", err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchUserData();
    }
  }, [user?._id]);

  const getInitial = (name?: string): string => {
    if (!name) return "؟";
    return name.charAt(0).toUpperCase();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("المملف المحدد ليس صورة");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProfileUpdateFormData) => {
    try {
      if (!user?._id) return;
      setIsLoading(true);

      const formData = new FormData();
      formData.append("userName", data.userName);
      formData.append("email", data.email);
      if (data.password) formData.append("password", data.password);
      if (imageFile) formData.append("image", imageFile);

      const response = await authService.updateUser(user._id, formData);

      if (response.user) {
        const imageUrl = typeof response.user.image === 'object' ? response.user.image.secure_url : response.user.image;

        dispatch(updateCredentials({
          name: response.user.userName,
          email: response.user.email,
          image: imageUrl,
        }));

        setProfileImage(imageUrl || null);
        setInitialImage(imageUrl || null);
        form.reset({
          userName: response.user.userName || "",
          email: response.user.email || "",
          password: "",
          confirmPassword: "",
          role: response.user.role || "",
        });

        toast.success("تم التحديث بنجاح");
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "حدث خطأ أثناء التحديث";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const isDirty = form.formState.isDirty || !!imageFile;

  return {
    form,
    onSubmit,
    isLoading,
    isFetching,
    isDirty,
    error,
    success,
    profileImage,
    handleImageChange,
    getInitial,
    fetchUserData,
  };
}