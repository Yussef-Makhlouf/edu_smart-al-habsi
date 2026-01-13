/**
 * Translates common English error messages from the server into Arabic.
 */
export const translateError = (message: string): string => {
    if (!message) return "حدث خطأ غير متوقع";

    const errorMap: Record<string, string> = {
        // Auth Errors
        "Invalid email or password": "البريد الإلكتروني أو كلمة المرور غير صحيحة",
        "Invalid credentials": "بيانات الدخول غير صحيحة",
        "User not found": "المستخدم غير موجود",
        "User already exists": "هذا المستخدم موجود بالفعل",
        "Email already in use": "البريد الإلكتروني مستخدم بالفعل",
        "Password is too short": "كلمة المرور قصيرة جداً",
        "Internal server error": "خطأ في خادم النظام",
        "Unauthorized": "غير مصرح لك بالوصول",
        "Forbidden": "الوصول ممنوع",
        "Token expired": "انتهت صلاحية الجلسة",
        "Invalid token": "رمز غير صالح",
        "Session expired. This account is logged in from another device.": "تم تسجيل الدخول من جهاز آخر، يرجى إعادة تسجيل الدخول",
        "Authentication required. Please log in.": "يجب تسجيل الدخول للمتابعة",

        // Validation Errors
        "Validation failed": "فشل التحقق من البيانات",
        "userName is required": "اسم المستخدم مطلوب",
        "email is required": "البريد الإلكتروني مطلوب",
        "password is required": "كلمة المرور مطلوبة",
        "role is required": "الرتبة مطلوبة",
        "Property 'role' is required": "الرتبة مطلوبة",

        // Network Errors
        "Network Error": "خطأ في الاتصال بالشبكة",
        "timeout of 0ms exceeded": "انتهى وقت محاولة الاتصال",
        "Request failed with status code 500": "خطأ داخلي في السيرفر",
        "Request failed with status code 404": "الصفحة أو الرابط غير موجود",
        "Request failed with status code 403": "ليس لديك صلاحية للقيام بهذا الإجراء",
        "Request failed with status code 401": "انتهت الجلسة، يرجى تسجيل الدخول",
    };

    // Check for exact matches
    if (errorMap[message]) {
        return errorMap[message];
    }

    // Check for partial matches or dynamic values
    if (message.includes("is not a valid enum value for path `role`")) {
        return "الرتبة المحددة غير صالحة";
    }

    if (message.includes("duplicate key error")) {
        if (message.includes("email")) return "البريد الإلكتروني مسجل مسبقاً";
        if (message.includes("userName")) return "اسم المستخدم مسجل مسبقاً";
        return "هذه البيانات مسجلة مسبقاً";
    }

    // If it's already Arabic, return it
    const isArabic = /[\u0600-\u06FF]/.test(message);
    if (isArabic) return message;

    return message; // Fallback to original message if no translation found
};
