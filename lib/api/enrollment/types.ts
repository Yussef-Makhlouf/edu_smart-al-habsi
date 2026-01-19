// ==================== ENROLLMENT TYPES ====================

export interface EnrollPayload {
  userId: string;
  courseId: string;
  billImage: File | string;
}

export interface Enrollment {
  _id: string;
  userId: {
    _id: string;
    userName: string;
    email: string;
    image?: {
      secure_url: string;
    };
  };
  courseId: {
    _id: string;
    title: string;
    image?: {
      secure_url: string;
    };
    price: number | { amount: number };
  };
  billImage?: {
    secure_url: string;
  };
  status: "Pending" | "Active" | "Rejected";
  createdAt: string;
  updatedAt: string;
}

