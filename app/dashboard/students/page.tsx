"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Users,
  Search,
  BookOpen,
  Trash2,
  Edit,
  Plus,
  Loader2,
  ArrowUpDown,
  MoreHorizontal,
  MoreVertical,
} from "lucide-react";
import {
  useGetAllUsersQuery,
  useGetUserStatisticsQuery,
  useDeleteUserMutation,
  useBulkDeleteUsersMutation,
} from "@/lib/api/users/usersApi";
import { UserFormDialog } from "@/components/dashboard/users/UserFormDialog";
import { User, UserRole } from "@/lib/api/users/types";
import { toast } from "sonner";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function UsersPage() {
  // Renamed component to reflect broader scope
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // API Hooks
  const { data: usersResponse, isLoading: isUsersLoading } =
    useGetAllUsersQuery();
  const { data: statsResponse, isLoading: isStatsLoading } =
    useGetUserStatisticsQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [bulkDeleteUsers, { isLoading: isBulkDeleting }] =
    useBulkDeleteUsersMutation();

  const users = (usersResponse?.users || []).filter(
    (user) => user.role === "Student",
  );
  const stats = statsResponse?.users;
  // console.log(users);
  // Filter logic
  const filteredUsers = users.filter(
    (user) =>
      user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Sorting Logic
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;

    let aValue: any = a[key as keyof User];
    let bValue: any = b[key as keyof User];

    // Handle nested or specific cases
    if (key === "enrollments") {
      aValue = a.enrollments?.length || 0;
      bValue = b.enrollments?.length || 0;
    } else if (key === "createdAt") {
      aValue = new Date(a.createdAt).getTime();
      bValue = new Date(b.createdAt).getTime();
    } else if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) return direction === "asc" ? -1 : 1;
    if (aValue > bValue) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  const paginatedUsers = sortedUsers.slice(
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

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteUser(deleteId).unwrap();
      toast.success("تم حذف المستخدم بنجاح");
    } catch (error: any) {
      toast.error(error?.data?.message || "فشل حذف المستخدم");
    } finally {
      setDeleteId(null);
    }
  };

  const handleToggleSelectAll = () => {
    if (
      selectedIds.length === filteredUsers.length &&
      filteredUsers.length > 0
    ) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredUsers.map((u) => u._id));
    }
  };

  const handleToggleSelectUser = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((userId) => userId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const confirmBulkDelete = async () => {
    try {
      await bulkDeleteUsers({ ids: selectedIds }).unwrap();
      toast.success("تم حذف المستخدمين المحددين بنجاح");
      setSelectedIds([]);
    } catch (error: any) {
      toast.error(error?.data?.message || "فشل حذف المستخدمين");
    } finally {
      setShowBulkDeleteConfirm(false);
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-700";
      case "Instructor":
        return "bg-purple-100 text-purple-700";
      case "Student":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-navy">
            إدارة الطلاب
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            عرض وإدارة جميع الطلاب المسجلين
          </p>
        </div>
        <div className="flex items-center gap-2">
          {selectedIds.length > 0 && (
            <Button
              variant="destructive"
              onClick={() => setShowBulkDeleteConfirm(true)}
              className="gap-2"
            >
              <Trash2 size={18} />
              حذف المحدد ({selectedIds.length})
            </Button>
          )}
          <Button onClick={handleAdd} variant="gold" className="gap-2">
            <Plus size={18} />
            إضافة طالب جديد
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isUsersLoading ? (
          [1, 2, 3].map((i) => <Skeleton key={i} className="h-32 rounded-xl" />)
        ) : (
          <>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                  <Users size={20} className="text-gold" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy">{users.length}</p>
                  <p className="text-sm text-gray-500">إجمالي الطلاب</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Users size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy">
                    {users.filter((u) => !u.isBlocked).length}
                  </p>
                  <p className="text-sm text-gray-500">طلاب نشطين</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <BookOpen size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy">
                    {users.reduce(
                      (sum, u) => sum + (u.enrollments?.length || 0),
                      0,
                    )}
                  </p>
                  <p className="text-sm text-gray-500">إجمالي التسجيلات</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Search and Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 w-full max-w-sm">
            <Search
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="البحث بالاسم أو البريد الإلكتروني..."
              className="h-10 pr-10 pl-4 w-full rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/20 text-sm"
            />
          </div>
          <div className="text-sm text-gray-500">
            العدد: {filteredUsers.length} طالب
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 w-12 text-center">
                  <Checkbox
                    checked={
                      selectedIds.length === filteredUsers.length &&
                      filteredUsers.length > 0
                    }
                    onCheckedChange={handleToggleSelectAll}
                    aria-label="Select all"
                  />
                </th>
                <th className="text-right px-6 py-4 text-sm font-bold text-navy">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("userName")}
                    className="hover:bg-transparent px-0 font-bold text-navy"
                  >
                    المستخدم
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                  </Button>
                </th>
                <th className="text-right px-6 py-4 text-sm font-bold text-navy">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("email")}
                    className="hover:bg-transparent px-0 font-bold text-navy"
                  >
                    البريد الإلكتروني
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                  </Button>
                </th>
                <th className="text-center px-6 py-4 text-sm font-bold text-navy">
                  <div className="flex justify-center">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("enrollments")}
                      className="hover:bg-transparent px-0 font-bold text-navy"
                    >
                      الدورات
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                    </Button>
                  </div>
                </th>
                <th className="text-center px-6 py-4 text-sm font-bold text-navy">
                  <div className="flex justify-center">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("createdAt")}
                      className="hover:bg-transparent px-0 font-bold text-navy"
                    >
                      تاريخ الانضمام
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                    </Button>
                  </div>
                </th>
                <th className="text-center px-6 py-4 text-sm font-bold text-navy">
                  <div className="flex justify-center">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("isBlocked")}
                      className="hover:bg-transparent px-0 font-bold text-navy"
                    >
                      الحالة
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                    </Button>
                  </div>
                </th>
                <th className="text-center px-6 py-4 text-sm font-bold text-navy">
                  إجراءات
                </th>
              </tr>
            </thead>
            <tbody>
              {isUsersLoading ? (
                <tr>
                  <td colSpan={8} className="text-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-gold" />
                    <p className="mt-2 text-gray-500">جاري تحميل البيانات...</p>
                  </td>
                </tr>
              ) : sortedUsers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-400">
                    <Users size={40} className="mx-auto mb-3 opacity-50" />
                    <p>لا يوجد مستخدمين مطابقين للبحث</p>
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-center">
                      <Checkbox
                        checked={selectedIds.includes(user._id)}
                        onCheckedChange={() => handleToggleSelectUser(user._id)}
                        aria-label={`Select ${user.userName}`}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border border-gray-100 overflow-hidden relative">
                          {(
                            typeof user.image === "string"
                              ? user.image
                              : user.image?.secure_url
                          ) ? (
                            <Image
                              src={
                                (typeof user.image === "string"
                                  ? user.image
                                  : user.image?.secure_url) as string
                              }
                              alt={user.userName}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-navy flex items-center justify-center text-white font-bold text-sm">
                              {user.userName.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <span className="font-medium text-navy">
                          {user.userName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="text-gray-500 text-sm break-all font-sans"
                        dir="ltr"
                      >
                        {user.email}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center">
                        <span className="w-8 h-8 rounded-full bg-gold/10 text-gold font-bold inline-flex items-center justify-center text-sm leading-none pt-0.5">
                          {user.enrollments?.length || 0}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-center text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString("ar-SA")}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          !user.isBlocked
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-500"
                        }`}
                      >
                        {user.isBlocked ? "محظور" : "نشط"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          title="تعديل"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => setDeleteId(user._id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="حذف"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
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

      {/* User Form Dialog */}
      <UserFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        user={selectedUser}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد من الحذف؟</AlertDialogTitle>
            <AlertDialogDescription>
              لا يمكن التراجع عن هذا الإجراء. سيتم حذف حساب المستخدم وجميع
              البيانات المرتبطة به نهائياً.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>إلغاء</AlertDialogCancel>
            <Button
              onClick={(e) => {
                e.preventDefault();
                confirmDelete();
              }}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isDeleting ? "جاري الحذف..." : "حذف المستخدم"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Delete Confirmation Dialog */}
      <AlertDialog
        open={showBulkDeleteConfirm}
        onOpenChange={setShowBulkDeleteConfirm}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              هل أنت متأكد من حذف {selectedIds.length} مستخدم؟
            </AlertDialogTitle>
            <AlertDialogDescription>
              لا يمكن التراجع عن هذا الإجراء. سيتم حذف جميع المستخدمين المحددين
              نهائياً.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isBulkDeleting}>
              إلغاء
            </AlertDialogCancel>
            <Button
              onClick={(e) => {
                e.preventDefault();
                confirmBulkDelete();
              }}
              disabled={isBulkDeleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isBulkDeleting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isBulkDeleting ? "جاري الحذف..." : "حذف المحددين"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
