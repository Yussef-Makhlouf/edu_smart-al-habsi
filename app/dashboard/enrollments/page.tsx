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
} from "lucide-react";
import { useGetAllUsersQuery } from "@/lib/api/users/usersApi";
import { User } from "@/lib/api/users/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { EnrollmentFormDialog } from "@/components/dashboard/enrollments/EnrollmentFormDialog";

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
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const { data: usersResponse, isLoading } = useGetAllUsersQuery();
  const users = usersResponse?.users || [];

  // Flatten Data: User -> Enrollments -> Rows
  const allEnrollments: EnrollmentRow[] = useMemo(() => {
    return users.flatMap((user) => {
      if (!user.enrollments || user.enrollments.length === 0) return [];
      return user.enrollments.map((enrollment: any) => ({
        id: enrollment._id,
        user: user,
        courseTitle: enrollment.courseId?.title || "غير معروف",
        courseImage: enrollment.courseId?.image?.secure_url || "",
        price:
          typeof enrollment.courseId?.price === "object"
            ? enrollment.courseId.price.amount
            : enrollment.courseId?.price || 0,
        enrolledAt: enrollment.enrolledAt || enrollment.createdAt,
        status: enrollment.status || "Active",
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
      row.status.toLowerCase() === statusFilter.toLowerCase();
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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-600";
      case "completed":
        return "bg-blue-100 text-blue-600";
      case "pending":
        return "bg-amber-100 text-amber-600";
      case "cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // Stats Calculation
  const totalRevenue = allEnrollments.reduce(
    (acc, curr) => acc + Number(curr.price || 0),
    0
  );
  const activeCount = allEnrollments.filter(
    (e) => e.status.toLowerCase() === "active"
  ).length;
  const completedCount = allEnrollments.filter(
    (e) => e.status.toLowerCase() === "completed"
  ).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-navy">الاشتراكات</h1>
          <p className="text-gray-500 mt-1">إدارة اشتراكات الطلاب في الدورات</p>
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
          <p className="text-sm text-gray-500 mb-1">المكتملة</p>
          <p className="text-2xl font-bold text-blue-600">{completedCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">إجمالي الإيرادات</p>
          <p className="text-2xl font-bold text-gold">
            {totalRevenue.toLocaleString()} ر.س
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative flex-1 max-w-sm">
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
          className="h-10 px-4 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/20 text-sm outline-none"
        >
          <option value="all">جميع الحالات</option>
          <option value="active">نشط</option>
          <option value="completed">مكتمل</option>
          <option value="pending">معلق</option>
          <option value="cancelled">ملغي</option>
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
                sortedEnrollments.map((row, index) => (
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
                          row.status
                        )}`}
                      >
                        {row.status}
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
                          selectedEnrollment.status
                        )}`}
                      >
                        {selectedEnrollment.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                      <span className="text-gray-500">تاريخ الانضمام</span>
                      <span className="font-medium text-navy dir-ltr">
                        {new Date(selectedEnrollment.enrolledAt).toLocaleString(
                          "ar-SA"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
