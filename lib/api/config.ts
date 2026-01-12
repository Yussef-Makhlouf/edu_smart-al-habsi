// API Configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

// Helper function to get auth headers
export const getAuthHeaders = (token?: string | null): HeadersInit => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

// Helper function to translate error messages to Arabic
const translateErrorMessage = (message: string, status: number): string => {
  const lowerMessage = message.toLowerCase();

  // Network errors
  if (lowerMessage.includes("network") || lowerMessage.includes("fetch")) {
    return "خطأ في الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت";
  }

  // HTTP status based errors
  switch (status) {
    case 401:
      return "البريد الإلكتروني أو كلمة المرور غير صحيحة";
    case 403:
      return "ليس لديك صلاحية للوصول إلى هذا المورد";
    case 404:
      return "الخدمة غير متاحة حالياً";
    case 500:
    case 502:
    case 503:
      return "خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقاً";
    default:
      if (status >= 500) {
        return "خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقاً";
      }
      if (status >= 400) {
        return "طلب غير صحيح. يرجى التحقق من البيانات المدخلة";
      }
  }

  // Content based errors
  if (lowerMessage.includes("email") || lowerMessage.includes("password")) {
    return "البريد الإلكتروني أو كلمة المرور غير صحيحة";
  }
  if (lowerMessage.includes("user not found")) {
    return "المستخدم غير موجود";
  }
  if (lowerMessage.includes("invalid credentials") || lowerMessage.includes("wrong password")) {
    return "بيانات الدخول غير صحيحة";
  }
  if (lowerMessage.includes("unauthorized")) {
    return "غير مصرح لك بالوصول";
  }

  // If message is already in Arabic, return as is
  if (/[\u0600-\u06FF]/.test(message)) {
    return message;
  }

  // Default Arabic error message
  return message || "حدث خطأ أثناء معالجة الطلب";
};

// Helper function to handle API responses
export const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    let errorData: any = null;
    try {
      errorData = await response.json();
    } catch {
      // If response is not JSON, use status text
    }
    
    const message = errorData?.message || response.statusText || `Request failed with status ${response.status}`;
    const arabicMessage = translateErrorMessage(message, response.status);
    throw new Error(arabicMessage);
  }
  return response.json() as Promise<T>;
};

export { API_BASE_URL };

