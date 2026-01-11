import { Course, User, Enrollment } from "./types";

export const INITIAL_COURSES: Course[] = [
    { id: 1, slug: "leadership-secrets", category: "القيادة", title: "أسرار القيادة الاستراتيجية", description: "كيف تحول رؤيتك إلى واقع ملموس.", price: "1200 SAR", priceValue: 1200, image: "/course1.jpg", instructor: "د. محمد الحبسي", duration: "12 ساعة", rating: 4.9, students: 2450, longDescription: "دورة شاملة تغطي جميع جوانب القيادة الاستراتيجية...", features: ["شهادة معتمدة"], sections: [] },
    { id: 2, slug: "crisis-management", category: "القيادة", title: "فن إدارة الأزمات الكبرى", description: "دورة مكثفة لفهم إدارة الأزمات.", price: "1100 SAR", priceValue: 1100, image: "/course2.jpg", instructor: "د. محمد الحبسي", duration: "10 ساعات", rating: 4.8, students: 1820, longDescription: "تعلم كيفية التعامل مع الأزمات...", features: ["دراسات حالة"], sections: [] },
    { id: 3, slug: "digital-startup", category: "ريادة الأعمال", title: "تأسيس المشاريع الرقمية", description: "من الفكرة إلى أول مليون.", price: "950 SAR", priceValue: 950, image: "/course3.jpg", instructor: "د. سارة أحمد", duration: "15 ساعة", rating: 4.9, students: 3200, longDescription: "من الفكرة إلى أول مليون ريال...", features: ["قوالب خطط عمل"], sections: [] },
    { id: 4, slug: "emerging-markets", category: "المالية", title: "الاستثمار في الأسواق الناشئة", description: "فهم ديناميكيات الأسواق.", price: "1300 SAR", priceValue: 1300, image: "/course4.jpg", instructor: "أ. فيصل المالكي", duration: "14 ساعة", rating: 4.7, students: 1560, longDescription: "دورة متخصصة في فهم الأسواق الناشئة...", features: ["تحليلات أسواق"], sections: [] },
    { id: 5, slug: "wealth-mindset", category: "التطوير الشخصي", title: "عقلية الثراء والحكمة", description: "برمجة عقلك للثراء.", price: "750 SAR", priceValue: 750, image: "/course5.jpg", instructor: "د. محمد الحبسي", duration: "8 ساعات", rating: 4.9, students: 4100, longDescription: "أعد برمجة عقلك...", features: ["تمارين يومية"], sections: [] },
    { id: 6, slug: "personal-branding", category: "التسويق", title: "بناء العلامة الشخصية", description: "ابنِ حضورك الرقمي.", price: "850 SAR", priceValue: 850, image: "/course6.jpg", instructor: "أ. نورة سعد", duration: "9 ساعات", rating: 4.8, students: 2890, longDescription: "كيف تبني حضورًا رقميًا...", features: ["قوالب محتوى"], sections: [] },
];

export const INITIAL_USERS: User[] = [
    { id: "admin-1", name: "Admin User", email: "admin@edusmart.com", role: "admin", password: "123" },
    { id: "student-1", name: "Student User", email: "student@edusmart.com", role: "student", password: "123" }
];

export const INITIAL_ENROLLMENTS: Enrollment[] = [];
