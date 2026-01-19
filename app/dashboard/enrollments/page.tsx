"use client";

import { useState, useMemo } from "react";
import {
  CreditCard,
  Search,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  Loader2,
  ArrowUpDown,
  Plus,
  Download,
  ZoomIn,
} from "lucide-react";
import {
  useGetPendingEnrollmentsQuery,
  useApproveEnrollmentMutation,
  useRejectEnrollmentMutation,
} from "@/lib/api/enrollment/enrollmentApi";
import { useGetAllUsersQuery } from "@/lib/api/users/usersApi";
import { User } from "@/lib/api/users/types";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog";
import { EnrollmentFormDialog } from "@/components/dashboard/enrollments/EnrollmentFormDialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Helper Interface for Flattened Data
interface EnrollmentRow {
  id: string; // Enrollment ID
  user: User; // Full User Object
  courseTitle: string;
  courseImage: string;
  price: number | string;
  enrolledAt: string;
  status: string;
  fullEnrollmentData: any; // Keep original data for details
}

export default function EnrollmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedEnrollment, setSelectedEnrollment] =
    useState<EnrollmentRow | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEnrollFormOpen, setIsEnrollFormOpen] = useState(false);
  const [isImageZoomOpen, setIsImageZoomOpen] = useState(false);
  const [zoomedImageUrl, setZoomedImageUrl] = useState<string>("");
  const [zoomedImageStudentName, setZoomedImageStudentName] =
    useState<string>("");
  const [zoomedImageDate, setZoomedImageDate] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: usersResponse, isLoading, refetch } = useGetAllUsersQuery();
  const users = usersResponse?.users || [];

  const [approveEnrollment, { isLoading: isApproving }] =
    useApproveEnrollmentMutation();
  const [rejectEnrollment, { isLoading: isRejecting }] =
    useRejectEnrollmentMutation();
  const [processingEnrollmentId, setProcessingEnrollmentId] = useState<
    string | null
  >(null);

  // Flatten Data: Users (Students) -> Enrollments -> Rows
  const allEnrollments: EnrollmentRow[] = useMemo(() => {
    return users
      .filter((u: any) => u.role === "Student")
      .flatMap((user: any) => {
        if (!user.enrollments || user.enrollments.length === 0) return [];
        return user.enrollments.map((enrollment: any) => ({
          id: enrollment._id,
          user: user,
          courseTitle: enrollment.courseId?.title || "غير معروف",
          courseImage:
            enrollment.courseId?.image?.secure_url ||
            enrollment.courseId?.image?.url ||
            "",
          price:
            typeof enrollment.courseId?.price === "object"
              ? enrollment.courseId.price.amount
              : enrollment.courseId?.price || 0,
          enrolledAt: enrollment.enrolledAt || enrollment.createdAt,
          status: enrollment.status || "Pending",
          fullEnrollmentData: enrollment,
        }));
      });
  }, [users]);

  // Filter Logic
  const filteredEnrollments = allEnrollments.filter((row) => {
    const matchesSearch =
      row.user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.courseTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      row.status.toLowerCase() === statusFilter.toLowerCase() ||
      (statusFilter === "cancelled" &&
        row.status.toLowerCase() === "rejected") ||
      (statusFilter === "rejected" && row.status.toLowerCase() === "cancelled");
    return matchesSearch && matchesStatus;
  });

  // Sorting Logic
  const sortedEnrollments = [...filteredEnrollments].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;

    let aValue: any;
    let bValue: any;

    if (key === "studentName") {
      aValue = a.user.userName;
      bValue = b.user.userName;
    } else if (key === "price") {
      aValue = Number(a.price);
      bValue = Number(b.price);
    } else if (key === "enrolledAt") {
      aValue = new Date(a.enrolledAt).getTime();
      bValue = new Date(b.enrolledAt).getTime();
    } else {
      aValue = a[key as keyof EnrollmentRow];
      bValue = b[key as keyof EnrollmentRow];
    }

    if (aValue < bValue) return direction === "asc" ? -1 : 1;
    if (aValue > bValue) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedEnrollments.length / itemsPerPage);
  const paginatedEnrollments = sortedEnrollments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleShowDetails = (row: EnrollmentRow) => {
    setSelectedEnrollment(row);
    setIsDetailsOpen(true);
  };

  const handleImageZoom = (
    imageUrl: string,
    studentName?: string,
    date?: string,
  ) => {
    setZoomedImageUrl(imageUrl);
    setZoomedImageStudentName(studentName || "");
    setZoomedImageDate(date || "");
    setIsImageZoomOpen(true);
  };

  const handleImageDownload = (
    imageUrl: string,
    studentName?: string,
    date?: string,
  ) => {
    // Create filename from student name and date
    let filename = "receipt";
    if (studentName && date) {
      const formattedDate = new Date(date)
        .toLocaleDateString("ar-SA")
        .replace(/\//g, "-");
      const cleanName = studentName.replace(/[^a-zA-Z0-9\u0600-\u06FF\s]/g, "");
      filename = `ايصال_${cleanName}_${formattedDate}`;
    }

    // Create a temporary anchor element to trigger download
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `${filename}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleApproveEnrollment = async (enrollment: EnrollmentRow) => {
    try {
      setProcessingEnrollmentId(enrollment.id);

      await approveEnrollment(enrollment.id).unwrap();

      toast.success("تم الموافقة وتفعيل الاشتراك بنجاح");
      refetch();
      setIsDetailsOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "فشل تفعيل الاشتراك");
      console.error("Enrollment approval error:", error);
    } finally {
      setProcessingEnrollmentId(null);
    }
  };

  const handleRejectEnrollment = async (enrollment: EnrollmentRow) => {
    try {
      setProcessingEnrollmentId(enrollment.id);

      await rejectEnrollment(enrollment.id).unwrap();

      toast.success("تم رفض الطلب بنجاح");
      refetch();
      setIsDetailsOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "فشل رفض الطلب");
      console.error("Enrollment rejection error:", error);
    } finally {
      setProcessingEnrollmentId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-600";
      case "completed":
        return "bg-blue-100 text-blue-600";
      case "pending":
        return "bg-amber-100 text-amber-600";
      case "cancelled":
      case "rejected":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "نشط";
      case "completed":
        return "مكتمل";
      case "pending":
        return "بانتظار المراجعة";
      case "cancelled":
      case "rejected":
        return "مرفوض";
      default:
        return status;
    }
  };

  // Stats Calculation: Only count confirmed (Active) payments for revenue
  const totalRevenue = allEnrollments
    .filter((e) => e.status.toLowerCase() === "active")
    .reduce((acc, curr) => {
      const price =
        typeof curr.price === "number"
          ? curr.price
          : parseFloat(String(curr.price)) || 0;
      return acc + price;
    }, 0);
  const activeCount = allEnrollments.filter(
    (e) => e.status.toLowerCase() === "active",
  ).length;
  const pendingCount = allEnrollments.filter(
    (e) => e.status.toLowerCase() === "pending",
  ).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-navy">
            الاشتراكات
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            إدارة اشتراكات الطلاب في الدورات
          </p>
        </div>
        <Button
          onClick={() => setIsEnrollFormOpen(true)}
          className="gap-2 bg-navy hover:bg-navy/90"
        >
          <Plus size={18} />
          إضافة اشتراك جديد
        </Button>
      </div>

      <EnrollmentFormDialog
        open={isEnrollFormOpen}
        onOpenChange={setIsEnrollFormOpen}
        refetch={refetch}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">إجمالي الاشتراكات</p>
          <p className="text-2xl font-bold text-navy">
            {allEnrollments.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">الاشتراكات النشطة</p>
          <p className="text-2xl font-bold text-green-600">{activeCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">بانتظار المراجعة</p>
          <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">إجمالي الإيرادات</p>
          <p className="text-2xl font-bold text-gold">
            {totalRevenue.toLocaleString()} ر.س
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative flex-1 w-full max-w-sm">
          <Search
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="البحث عن طالب أو دورة..."
            className="w-full h-10 pr-10 pl-4 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/20 text-sm"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 px-4 w-full md:w-auto rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/20 text-sm outline-none"
        >
          <option value="all">جميع الحالات</option>
          <option value="active">نشط</option>
          <option value="pending">بانتظار المراجعة</option>
          <option value="cancelled">مرفوض</option>
        </select>
      </div>

      {/* Enrollments Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-right px-6 py-4 text-sm font-bold text-navy">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("studentName")}
                    className="hover:bg-transparent px-0 font-bold text-navy"
                  >
                    الطالب
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                  </Button>
                </th>
                <th className="text-right px-6 py-4 text-sm font-bold text-navy">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("courseTitle")}
                    className="hover:bg-transparent px-0 font-bold text-navy"
                  >
                    الدورة
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                  </Button>
                </th>
                <th className="text-center px-6 py-4 text-sm font-bold text-navy">
                  <div className="flex justify-center">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("price")}
                      className="hover:bg-transparent px-0 font-bold text-navy"
                    >
                      السعر
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                    </Button>
                  </div>
                </th>
                <th className="text-center px-6 py-4 text-sm font-bold text-navy">
                  <div className="flex justify-center">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("enrolledAt")}
                      className="hover:bg-transparent px-0 font-bold text-navy"
                    >
                      التاريخ
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                    </Button>
                  </div>
                </th>
                <th className="text-center px-6 py-4 text-sm font-bold text-navy">
                  <div className="flex justify-center">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("status")}
                      className="hover:bg-transparent px-0 font-bold text-navy"
                    >
                      الحالة
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                    </Button>
                  </div>
                </th>
                <th className="text-center px-6 py-4 text-sm font-bold text-navy">
                  تفاصيل
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-gold" />
                    <p className="mt-2 text-gray-500">جاري تحميل البيانات...</p>
                  </td>
                </tr>
              ) : sortedEnrollments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">
                    <CreditCard size={40} className="mx-auto mb-3 opacity-50" />
                    <p>لا يوجد اشتراكات مطابقة للبحث</p>
                  </td>
                </tr>
              ) : (
                paginatedEnrollments.map((row, index) => (
                  <tr
                    key={`${row.id}-${index}`}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border border-gray-100 overflow-hidden relative">
                          {(
                            typeof row.user.image === "string"
                              ? row.user.image
                              : row.user.image?.secure_url
                          ) ? (
                            <Image
                              src={
                                (typeof row.user.image === "string"
                                  ? row.user.image
                                  : row.user.image?.secure_url) as string
                              }
                              alt={row.user.userName}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-navy flex items-center justify-center text-white font-bold text-sm">
                              {row.user.userName.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <span className="font-medium text-navy">
                          {row.user.userName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {row.courseImage && (
                          <div className="w-12 h-8 rounded-md overflow-hidden relative border border-gray-100">
                            <Image
                              src={row.courseImage}
                              alt={row.courseTitle}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <span className="text-gray-600 text-sm font-medium">
                          {row.courseTitle}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold text-navy">
                        {row.price} ر.س
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">
                      {new Date(row.enrolledAt).toLocaleDateString("ar-SA")}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
                          row.status,
                        )}`}
                      >
                        {getStatusLabel(row.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleShowDetails(row)}
                        className="p-2 text-gray-400 hover:text-navy hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center" dir="ltr">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                  href="#"
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === i + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(i + 1);
                    }}
                  >
                    {(i + 1).toLocaleString("ar-SA")}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages)
                      setCurrentPage(currentPage + 1);
                  }}
                  href="#"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-bold text-navy border-b pb-4">
              تفاصيل الاشتراك
            </DialogTitle>
          </DialogHeader>

          {selectedEnrollment && (
            <div className="space-y-6">
              {/* Top Section: Course Info */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col md:flex-row gap-6 items-start">
                <div className="w-full md:w-32 h-20 relative rounded-lg overflow-hidden border border-gray-200 shrink-0">
                  {selectedEnrollment.courseImage ? (
                    <Image
                      src={selectedEnrollment.courseImage}
                      alt={selectedEnrollment.courseTitle}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                      <CreditCard size={24} />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-navy mb-2">
                    {selectedEnrollment.courseTitle}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <CreditCard size={16} className="text-gold" />
                      <span>السعر: </span>
                      <span className="font-bold text-navy">
                        {selectedEnrollment.price} ر.س
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Student Info Card */}
                <div className="border border-gray-100 rounded-xl p-6">
                  <h4 className="font-bold text-navy mb-4 flex items-center gap-2">
                    بيانات الطالب
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full border border-gray-100 overflow-hidden relative">
                        {(
                          typeof selectedEnrollment.user.image === "string"
                            ? selectedEnrollment.user.image
                            : selectedEnrollment.user.image?.secure_url
                        ) ? (
                          <Image
                            src={
                              (typeof selectedEnrollment.user.image === "string"
                                ? selectedEnrollment.user.image
                                : selectedEnrollment.user.image
                                    ?.secure_url) as string
                            }
                            alt={selectedEnrollment.user.userName}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-navy flex items-center justify-center text-white font-bold text-lg">
                            {selectedEnrollment.user.userName
                              .charAt(0)
                              .toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-navy">
                          {selectedEnrollment.user.userName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {selectedEnrollment.user.email}
                        </p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-50">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-gray-500">الدور:</div>
                        <div className="font-medium text-navy">
                          {selectedEnrollment.user.role}
                        </div>
                        <div className="text-gray-500">الحالة:</div>
                        <div
                          className={
                            selectedEnrollment.user.isBlocked
                              ? "text-red-500"
                              : "text-green-500"
                          }
                        >
                          {selectedEnrollment.user.isBlocked ? "محظور" : "نشط"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enrollment Metadata Card */}
                <div className="border border-gray-100 rounded-xl p-6">
                  <h4 className="font-bold text-navy mb-4 flex items-center gap-2">
                    <Clock size={18} />
                    بيانات السجل
                  </h4>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                      <span className="text-gray-500">حالة الاشتراك</span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
                          selectedEnrollment.status,
                        )}`}
                      >
                        {getStatusLabel(selectedEnrollment.status)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                      <span className="text-gray-500">تاريخ الانضمام</span>
                      <span className="font-medium text-navy dir-ltr">
                        {new Date(selectedEnrollment.enrolledAt).toLocaleString(
                          "ar-SA",
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Proof Section - Conditional Rendering */}
              {(() => {
                const isPending =
                  selectedEnrollment.status.toLowerCase() === "pending";
                const isActive =
                  selectedEnrollment.status.toLowerCase() === "active";
                const isCancelled =
                  selectedEnrollment.status.toLowerCase() === "cancelled";
                const billImageUrl =
                  selectedEnrollment.fullEnrollmentData?.billImage
                    ?.secure_url ||
                  selectedEnrollment.fullEnrollmentData?.billImage?.url;
                const hasBillImage = !!billImageUrl;

                // Hide section if it's not pending (already processed) and has no bill image
                // This covers manual admin enrollments which likely don't have bill images
                if (!isPending && !hasBillImage) return null;

                return (
                  <div
                    className={`bg-white border rounded-xl overflow-hidden ${
                      isPending
                        ? "border-amber-200 shadow-sm"
                        : "border-gray-200"
                    }`}
                  >
                    <div
                      className={`p-4 border-b flex items-center justify-between ${
                        isPending
                          ? "bg-amber-50/50 border-amber-100"
                          : "bg-gray-50 border-gray-100"
                      }`}
                    >
                      <h3 className="font-bold text-navy flex items-center gap-2">
                        <CreditCard
                          className={
                            isPending ? "text-amber-500" : "text-gray-400"
                          }
                          size={20}
                        />
                        إثبات الدفع (تحويل)
                      </h3>
                      <div className="flex gap-2">
                        {isPending && (
                          <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-700 rounded-full border border-amber-200 shadow-sm">
                            بانتظار المراجعة
                          </span>
                        )}
                        {isActive && (
                          <span className="text-xs font-bold px-3 py-1 bg-green-100 text-green-700 rounded-full border border-green-200">
                            تم اعتماد التحويل
                          </span>
                        )}
                        {isCancelled && (
                          <span className="text-xs font-bold px-3 py-1 bg-red-100 text-red-700 rounded-full border border-red-200">
                            مرفوض / ملغي
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Receipt Image with Zoom & Download */}
                      <div className="space-y-2">
                        <p className="text-sm font-bold text-gray-500 mb-2">
                          صورة الإيصال المرفقة
                        </p>
                        <div
                          className={`relative aspect-video w-full bg-gray-50 rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden transition-colors group ${
                            isPending
                              ? "border-amber-200 hover:border-amber-400"
                              : "border-gray-200"
                          }`}
                        >
                          {hasBillImage ? (
                            <>
                              <Image
                                src={billImageUrl}
                                alt="Bill Image"
                                fill
                                className="object-cover"
                              />
                              {/* Hover Overlay with Zoom & Download */}
                              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                <button
                                  onClick={() =>
                                    handleImageZoom(
                                      billImageUrl,
                                      selectedEnrollment.user.userName,
                                      selectedEnrollment.enrolledAt,
                                    )
                                  }
                                  className="p-3 bg-white/90 hover:bg-white rounded-lg transition-colors shadow-lg"
                                  title="تكبير الصورة"
                                >
                                  <ZoomIn size={20} className="text-navy" />
                                </button>
                                <button
                                  onClick={() =>
                                    handleImageDownload(
                                      billImageUrl,
                                      selectedEnrollment.user.userName,
                                      selectedEnrollment.enrolledAt,
                                    )
                                  }
                                  className="p-3 bg-white/90 hover:bg-white rounded-lg transition-colors shadow-lg"
                                  title="تحميل الصورة"
                                >
                                  <Download size={20} className="text-navy" />
                                </button>
                              </div>
                            </>
                          ) : (
                            <div className="flex flex-col items-center gap-2 text-gray-400">
                              <CreditCard size={48} className="opacity-50" />
                              <span className="text-sm font-medium">
                                لا توجد صورة مرفقة
                              </span>
                            </div>
                          )}
                        </div>
                        {hasBillImage && (
                          <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
                            <span>
                              تاريخ الرفع:{" "}
                              {new Date(
                                selectedEnrollment.enrolledAt,
                              ).toLocaleDateString("ar-SA")}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Action Panel */}
                      <div className="flex flex-col justify-center space-y-4">
                        {isPending ? (
                          <>
                            <div className="bg-amber-50 border border-amber-100 p-4 rounded-lg mb-2">
                              <p className="text-amber-800 text-sm font-medium mb-1 flex items-center gap-2">
                                <Clock size={16} />
                                تنبيه إداري
                              </p>
                              <p className="text-amber-700/80 text-xs leading-relaxed">
                                يرجى التأكد من مطابقة المبلغ وتاريخ التحويل مع
                                البيانات قبل قبول الطلب.
                              </p>
                            </div>

                            <div className="space-y-3">
                              <Button
                                onClick={() =>
                                  handleApproveEnrollment(selectedEnrollment)
                                }
                                disabled={
                                  processingEnrollmentId ===
                                  selectedEnrollment.id
                                }
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-12 gap-2 shadow-sm"
                              >
                                {processingEnrollmentId ===
                                selectedEnrollment.id ? (
                                  <>
                                    <Loader2
                                      size={18}
                                      className="animate-spin"
                                    />
                                    جاري التفعيل...
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle size={18} />
                                    الموافقـة وتفعيـل الاشتراك
                                  </>
                                )}
                              </Button>
                              <Button
                                onClick={() =>
                                  handleRejectEnrollment(selectedEnrollment)
                                }
                                disabled={
                                  processingEnrollmentId ===
                                  selectedEnrollment.id
                                }
                                variant="outline"
                                className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-bold h-12 gap-2"
                              >
                                {processingEnrollmentId ===
                                selectedEnrollment.id ? (
                                  <>
                                    <Loader2
                                      size={18}
                                      className="animate-spin"
                                    />
                                    جاري الرفض...
                                  </>
                                ) : (
                                  <>
                                    <XCircle size={18} />
                                    رفض الطلب
                                  </>
                                )}
                              </Button>
                            </div>
                          </>
                        ) : isActive ? (
                          <div className="h-full flex flex-col items-center justify-center bg-green-50/50 border border-green-100 p-6 rounded-lg text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                              <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <h4 className="font-bold text-navy text-lg mb-2">
                              الاشتراك مفعل ونشط
                            </h4>
                            <p className="text-sm text-gray-500 max-w-[250px]">
                              تمت مراجعة عملية الدفع وتفعيل الاشتراك للطالب
                              بنجاح.
                            </p>
                          </div>
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center bg-red-50/50 border border-red-100 p-6 rounded-lg text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                              <XCircle className="w-8 h-8 text-red-600" />
                            </div>
                            <h4 className="font-bold text-navy text-lg mb-2">
                              الطلب مرفوض
                            </h4>
                            <p className="text-sm text-gray-500 max-w-[250px]">
                              تم رفض طلب الاشتراك هذا.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Image Zoom Dialog with Custom Light Overlay */}
      <Dialog open={isImageZoomOpen} onOpenChange={setIsImageZoomOpen}>
        <DialogPortal>
          {/* Custom lighter overlay */}
          <DialogOverlay className="bg-black/5" />
          <DialogContent className="max-w-5xl max-h-[90vh] p-0 overflow-hidden bg-transparent border-0">
            <DialogTitle className="sr-only">عرض صورة الإيصال</DialogTitle>
            <div className="relative w-full h-[85vh] flex items-center justify-center">
              {zoomedImageUrl && (
                <>
                  <Image
                    src={zoomedImageUrl}
                    alt="Receipt Zoomed"
                    fill
                    className="object-contain"
                  />
                  {/* Download Button Overlay */}
                  <button
                    onClick={() =>
                      handleImageDownload(
                        zoomedImageUrl,
                        zoomedImageStudentName,
                        zoomedImageDate,
                      )
                    }
                    className="absolute bottom-6 right-6 p-4 bg-white/90 hover:bg-white rounded-full transition-all shadow-2xl hover:scale-110"
                    title="تحميل الصورة"
                  >
                    <Download size={24} className="text-navy" />
                  </button>
                </>
              )}
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );
}
