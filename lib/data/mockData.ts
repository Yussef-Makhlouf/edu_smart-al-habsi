import { Course, User } from "../types";

export const MOCK_COURSES: Course[] = [
    {
        id: 1,
        slug: "e-business-secrets",
        category: "ريادة الأعمال",
        title: "كورس أسرار عالم البزنس الإلكتروني",
        description: "خطوة بخطوة نحو بناء مشروعك الالكتروني ناجح.",
        price: "1200 SAR",
        priceValue: 1200,
        image: "/images/Mockup.jpg",
        instructor: "د. عمار عمر",
        duration: "12 ساعة",
        rating: 4.9,
        students: 2450,
        longDescription: "دورة شاملة تغطي جميع جوانب البزنس الإلكتروني...",
        features: ["شهادة معتمدة"],
    },
    {
        id: 2,
        slug: "crisis-management",
        category: "القيادة",
        title: "فن إدارة الأزمات الكبرى",
        description: "دورة مكثفة لفهم إدارة الأزمات.",
        price: "1100 SAR",
        priceValue: 1100,
        image: "/images/Mockup.jpg",
        instructor: "د. محمد الحبسي",
        duration: "10 ساعات",
        rating: 4.8,
        students: 1820,
        longDescription: "تعلم كيفية التعامل مع الأزمات...",
        features: ["دراسات حالة"],
    },
    {
        id: 3,
        slug: "digital-startup",
        category: "ريادة الأعمال",
        title: "تأسيس المشاريع الرقمية",
        description: "من الفكرة إلى أول مليون.",
        price: "950 SAR",
        priceValue: 950,
        image: "/images/Mockup.jpg",
        instructor: "د. سارة أحمد",
        duration: "15 ساعة",
        rating: 4.9,
        students: 3200,
        longDescription: "من الفكرة إلى أول مليون ريال...",
        features: ["قوالب خطط عمل"],
    },
];

export const MOCK_USERS: User[] = [
    { id: "admin-1", name: "Admin User", email: "admin@edusmart.com", role: "admin" },
    { id: "student-1", name: "محمد علي", email: "student@edusmart.com", role: "student" }
];
