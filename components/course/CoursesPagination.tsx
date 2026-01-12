"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface CoursesPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange?: (page: number) => void;
}

export function CoursesPagination({
    currentPage,
    totalPages,
    onPageChange,
}: CoursesPaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handlePageClick = (page: number) => {
        if (onPageChange && page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex items-center justify-center gap-2 py-12">
            {/* Previous Arrow */}
            <button
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${currentPage === 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-navy text-white hover:bg-navy-light"
                    }`}
                aria-label="الصفحة السابقة"
            >
                <ChevronRight size={20} />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-2 mx-4">
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageClick(page)}
                        className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm transition-all duration-300 ${currentPage === page
                                ? "bg-gold text-navy"
                                : "bg-white text-navy border border-gray-200 hover:border-gold hover:bg-gold/10"
                            }`}
                        aria-label={`الصفحة ${page}`}
                        aria-current={currentPage === page ? "page" : undefined}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* Next Arrow */}
            <button
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${currentPage === totalPages
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-navy text-white hover:bg-navy-light"
                    }`}
                aria-label="الصفحة التالية"
            >
                <ChevronLeft size={20} />
            </button>
        </div>
    );
}
