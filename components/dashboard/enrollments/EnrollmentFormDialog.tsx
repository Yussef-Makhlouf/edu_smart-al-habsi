import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2, Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useGetAllUsersQuery } from "@/lib/api/users/usersApi";
import { useGetCoursesQuery } from "@/lib/api/courses/coursesApi";
import { useEnrollUserMutation } from "@/lib/api/enrollment/enrollmentApi";

const enrollmentSchema = z.object({
  userId: z.string().min(1, "يرجى اختيار الطالب"),
  courseId: z.string().min(1, "يرجى اختيار الدورة"),
});

type EnrollmentFormValues = z.infer<typeof enrollmentSchema>;

interface EnrollmentFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  refetch?: () => void;
}

export function EnrollmentFormDialog({
  open,
  onOpenChange,
  refetch,
}: EnrollmentFormDialogProps) {
  const { data: usersResponse } = useGetAllUsersQuery();
  const { data: courses } = useGetCoursesQuery();
  const [enrollUser, { isLoading: isSubmitting }] = useEnrollUserMutation();

  const users = usersResponse?.users || [];
  const coursesList = (courses || []).filter((course) => course.isPublished);

  // Filter only Students (optional, but logical for enrollment)
  // Or show all users if admins can take courses too. Let's show all for flexibility, or maybe filter roles.
  // Generally, usually only students are enrolled, but let's stick to all users to be safe or filter by 'Student' role if strict.
  // Let's filter for visual clarity but maybe allow all.
  const students = users.filter(
    (u) => u.role === "Student" || u.role === "User"
  );

  const [openUser, setOpenUser] = useState(false);
  const [openCourse, setOpenCourse] = useState(false);

  const form = useForm<EnrollmentFormValues>({
    resolver: zodResolver(enrollmentSchema) as any,
    defaultValues: {
      userId: "",
      courseId: "",
    },
  });

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  const onSubmit = async (values: EnrollmentFormValues) => {
    try {
      await enrollUser(values).unwrap();
      toast.success("تم تسجيل الطالب في الدورة بنجاح");
      if (refetch) {
        refetch();
      }
      onOpenChange(false);
    } catch (error: any) {
      const serverMessage = error?.data?.message;
      let errorMessage = "فشل التسجيل في الدورة";

      if (serverMessage === "User already enrolled") {
        errorMessage = "هذا الطالب مشترك بالفعل في هذه الدورة";
      } else if (serverMessage) {
        errorMessage = serverMessage;
      }

      toast.error(errorMessage);
      console.error("Enrollment error:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>إضافة اشتراك جديد</DialogTitle>
          <DialogDescription>
            اختر الطالب والدورة لإضافته إليها يدوياً.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control as any}
              name="userId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>الطالب</FormLabel>
                  <Popover open={openUser} onOpenChange={setOpenUser}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openUser}
                          className={cn(
                            "w-full justify-between text-right font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? students.find((user) => user._id === field.value)
                                ?.userName +
                              " (" +
                              students.find((user) => user._id === field.value)
                                ?.email +
                              ")"
                            : "اختر الطالب"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="p-0 w-(--radix-popover-trigger-width)"
                      align="start"
                    >
                      <Command className="w-full">
                        <CommandInput
                          placeholder="ابحث عن طالب..."
                          className="h-9 text-right"
                          dir="rtl"
                        />
                        <CommandList>
                          <CommandEmpty>لم يتم العثور على طالب.</CommandEmpty>
                          <CommandGroup>
                            {students.map((user) => (
                              <CommandItem
                                key={user._id}
                                value={`${user.userName} ${user.email} ${user._id}`}
                                onSelect={() => {
                                  form.setValue("userId", user._id);
                                  setOpenUser(false);
                                }}
                                className="flex items-center justify-between py-2 cursor-pointer"
                              >
                                <div className="flex items-center gap-2">
                                  <Check
                                    className={cn(
                                      "h-4 w-4 text-navy",
                                      user._id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  <div className="flex flex-col text-right">
                                    <span className="font-medium">
                                      {user.userName}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {user.email}
                                    </span>
                                  </div>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control as any}
              name="courseId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>الدورة</FormLabel>
                  <Popover open={openCourse} onOpenChange={setOpenCourse}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openCourse}
                          className={cn(
                            "w-full justify-between text-right font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? coursesList.find(
                                (course) => course._id === field.value
                              )?.title
                            : "اختر الدورة"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="p-0 w-(--radix-popover-trigger-width)"
                      align="start"
                    >
                      <Command className="w-full">
                        <CommandInput
                          placeholder="ابحث عن دورة..."
                          className="h-9 text-right"
                          dir="rtl"
                        />
                        <CommandList>
                          <CommandEmpty>لم يتم العثور على دورة.</CommandEmpty>
                          <CommandGroup>
                            {coursesList.map((course) => (
                              <CommandItem
                                key={course._id}
                                value={`${course.title} ${course._id}`}
                                onSelect={() => {
                                  form.setValue("courseId", course._id);
                                  setOpenCourse(false);
                                }}
                                className="flex items-center justify-between py-2 cursor-pointer"
                              >
                                <div className="flex items-center gap-2">
                                  <Check
                                    className={cn(
                                      "h-4 w-4 text-navy",
                                      course._id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  <div className="flex flex-col text-right">
                                    <span className="font-medium">
                                      {course.title}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground">
                                      ({(course.category as any)?.name || "عام"})
                                    </span>
                                  </div>
                                </div>
                                {course.price !== undefined && (
                                  <span className="text-xs font-semibold text-navy bg-navy/5 px-2 py-1 rounded-full">
                                    {typeof course.price === "object" &&
                                    course.price !== null
                                      ? (course.price as any).amount
                                      : course.price}{" "}
                                    ر.س
                                  </span>
                                )}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                إلغاء
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-navy">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    جاري الإضافة...
                  </>
                ) : (
                  "إضافة الاشتراك"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
