import * as React from "react";

interface ContactEmailTemplateProps {
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
}

export const ContactEmailTemplate: React.FC<
  Readonly<ContactEmailTemplateProps>
> = ({ name, email, phone, type, message }) => (
  <div
    dir="rtl"
    style={{
      fontFamily: "Tahoma, Arial, sans-serif",
      backgroundColor: "#f6f9fc",
      padding: "40px 20px",
      color: "#0a192f",
    }}
  >
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#0a192f",
          padding: "30px",
          textAlign: "center",
          borderBottom: "4px solid #d4af37",
        }}
      >
        <h1 style={{ color: "#d4af37", margin: 0, fontSize: "24px" }}>
          رسالة جديدة من الموقع
        </h1>
        <p style={{ color: "#ffffff", opacity: 0.7, margin: "10px 0 0 0" }}>
          استفسار جديد عبر نموذج التواصل
        </p>
      </div>

      {/* Content */}
      <div style={{ padding: "40px" }}>
        <div style={{ marginBottom: "30px" }}>
          <h2
            style={{
              fontSize: "18px",
              color: "#0a192f",
              borderBottom: "1px solid #eee",
              paddingBottom: "10px",
              marginBottom: "20px",
            }}
          >
            تفاصيل المرسل
          </h2>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tr>
              <td style={{ padding: "8px 0", color: "#666", width: "120px" }}>
                <strong>الاسم:</strong>
              </td>
              <td style={{ padding: "8px 0", color: "#0a192f" }}>{name}</td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0", color: "#666" }}>
                <strong>البريد:</strong>
              </td>
              <td style={{ padding: "8px 0", color: "#0a192f" }}>
                <a
                  href={`mailto:${email}`}
                  style={{ color: "#d4af37", textDecoration: "none" }}
                >
                  {email}
                </a>
              </td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0", color: "#666" }}>
                <strong>الهاتف:</strong>
              </td>
              <td style={{ padding: "8px 0", color: "#0a192f" }}>{phone}</td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0", color: "#666" }}>
                <strong>النوع:</strong>
              </td>
              <td style={{ padding: "8px 0", color: "#0a192f" }}>
                <span
                  style={{
                    backgroundColor: "#fff9e6",
                    color: "#b8860b",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {type}
                </span>
              </td>
            </tr>
          </table>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <h2
            style={{
              fontSize: "18px",
              color: "#0a192f",
              borderBottom: "1px solid #eee",
              paddingBottom: "10px",
              marginBottom: "20px",
            }}
          >
            محتوى الرسالة
          </h2>
          <div
            style={{
              backgroundColor: "#f9f9f9",
              padding: "20px",
              borderRadius: "12px",
              color: "#444",
              lineHeight: "1.6",
              whiteSpace: "pre-wrap",
            }}
          >
            {message}
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <a
            href={`mailto:${email}`}
            style={{
              backgroundColor: "#0a192f",
              color: "#ffffff",
              padding: "14px 30px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
              display: "inline-block",
            }}
          >
            الرد على المرسل
          </a>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          backgroundColor: "#f6f9fc",
          padding: "20px",
          textAlign: "center",
          fontSize: "12px",
          color: "#999",
        }}
      >
        هذه الرسالة تم إرسالها آلياً من نظام التواصل الخاص بموقع الحبسي الذكي
      </div>
    </div>
  </div>
);
