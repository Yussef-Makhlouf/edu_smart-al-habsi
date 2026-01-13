"use client";

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

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "primary";
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "تأكيد",
  cancelText = "إلغاء",
  variant = "primary",
}: ConfirmModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-white rounded-2xl border-navy/10 overflow-hidden">
        <AlertDialogHeader className="space-y-4">
          <AlertDialogTitle className="text-xl font-bold text-navy text-right">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-500 text-right text-base leading-relaxed">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-8 flex-row-reverse gap-3 sm:justify-start">
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
              onClose();
            }}
            className={`flex-1 font-bold py-6 rounded-xl transition-all ${
              variant === "danger"
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-gold hover:bg-gold-dim text-navy"
            }`}
          >
            {confirmText}
          </AlertDialogAction>
          <AlertDialogCancel
            onClick={onClose}
            className="flex-1 font-bold py-6 rounded-xl border-navy/10 text-navy hover:bg-navy/5 transition-all mt-0"
          >
            {cancelText}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
