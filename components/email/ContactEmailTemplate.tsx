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
      fontFamily: "'Segoe UI', Tahoma, Arial, sans-serif",
      backgroundColor: "#faf8f3", // --paper: 43 30% 97%
      padding: "30px 20px",
      minHeight: "100vh",
    }}
  >
    <div
      style={{
        maxWidth: "650px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(26, 58, 82, 0.12)",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a3a52 0%, #14324a 100%)", // Navy gradient
          padding: "25px 40px 35px 40px",
          position: "relative",
          overflow: "hidden",
        }}
      >

        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div
            style={{
              display: "inline-block",
              backgroundColor: "rgba(212, 175, 55, 0.15)", // Gold with opacity
              padding: "12px 24px",
              borderRadius: "30px",
              marginBottom: "0",
            }}
          >
            <span
              style={{
                color: "#d4af37", // Gold
                fontSize: "13px",
                fontWeight: "600",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              📧 استفسار جديد
            </span>
          </div>
          <h1
            style={{
              color: "#ffffff",
              margin: "15px 0 0 0",
              fontSize: "32px",
              fontWeight: "700",
              letterSpacing: "-0.5px",
              marginBottom: "10px",
            }}
          >
            رسالة من الموقع
          </h1>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              margin: "0",
              fontSize: "15px",
              fontWeight: "400",
            }}
          >
            عبر نموذج التواصل - الحبسي الذكي للتدريب
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "45px 40px" }}>
        {/* Sender Info Section */}
        <div style={{ marginBottom: "40px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "25px",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "4px",
                height: "24px",
                backgroundColor: "#d4af37", // Gold
                borderRadius: "4px",
              }}
            ></div>
            <h2
              style={{
                fontSize: "20px",
                color: "#1a3a52", // Navy
                margin: 0,
                fontWeight: "700",
              }}
            >
              بيانات المرسل
            </h2>
          </div>

          <div
            style={{
              backgroundColor: "#faf8f3", // Paper color
              borderRadius: "16px",
              padding: "25px",
              border: "1px solid #e8e4dc", // Muted border
            }}
          >
            {/* Name */}
            <div style={{ marginBottom: "18px" }}>
              <div
                style={{
                  fontSize: "12px",
                  color: "#6b7d8f", // Muted foreground
                  marginBottom: "6px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                الاسم الكامل
              </div>
              <div
                style={{
                  fontSize: "16px",
                  color: "#1a3a52", // Navy
                  fontWeight: "600",
                }}
              >
                {name}
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: "18px" }}>
              <div
                style={{
                  fontSize: "12px",
                  color: "#6b7d8f", // Muted foreground
                  marginBottom: "6px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                البريد الإلكتروني
              </div>
              <div>
                <a
                  href={`mailto:${email}`}
                  style={{
                    color: "#1a3a52", // Navy
                    textDecoration: "underline",
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {email}
                </a>
              </div>
            </div>

            {/* Phone */}
            <div style={{ marginBottom: "18px" }}>
              <div
                style={{
                  fontSize: "12px",
                  color: "#6b7d8f", // Muted foreground
                  marginBottom: "6px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                رقم الهاتف
              </div>
              <div
                style={{
                  fontSize: "15px",
                  color: "#1a3a52", // Navy
                  fontWeight: "500",
                }}
              >
                {phone || "غير متوفر"}
              </div>
            </div>

            {/* Type */}
            <div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#6b7d8f", // Muted foreground
                  marginBottom: "8px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                نوع الاستفسار
              </div>
              <div>
                <span
                  style={{
                    display: "inline-block",
                    background: "linear-gradient(135deg, #1a3a52 0%, #14324a 100%)", // Navy gradient
                    color: "#d4af37", // Gold
                    padding: "8px 18px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "0.3px",
                  }}
                >
                  {type}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Message Section */}
        <div style={{ marginBottom: "35px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "25px",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "4px",
                height: "24px",
                backgroundColor: "#d4af37", // Gold
                borderRadius: "4px",
              }}
            ></div>
            <h2
              style={{
                fontSize: "20px",
                color: "#1a3a52", // Navy
                margin: 0,
                fontWeight: "700",
              }}
            >
              محتوى الرسالة
            </h2>
          </div>

          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "28px",
              borderRadius: "16px",
              border: "2px solid #e8e4dc", // Muted border
              lineHeight: "1.9",
              fontSize: "15px",
              color: "#233d54", // Text readable
              whiteSpace: "pre-wrap",
            }}
          >
            {message}
          </div>
        </div>

        {/* CTA Button */}
        <div style={{ textAlign: "center", marginTop: "45px" }}>
          <a
            href={`mailto:${email}`}
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #d4af37 0%, #c29d2e 100%)", // Gold gradient
              color: "#1a3a52", // Navy
              padding: "16px 45px",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: "700",
              fontSize: "15px",
              letterSpacing: "0.3px",
            }}
          >
            ✉️ الرد على الرسالة
          </a>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          backgroundColor: "#faf8f3", // Paper color
          padding: "30px",
          textAlign: "center",
          borderTop: "1px solid #e8e4dc", // Muted border
        }}
      >
        <p
          style={{
            margin: "0 0 8px 0",
            fontSize: "13px",
            color: "#6b7d8f", // Muted foreground
            fontWeight: "500",
          }}
        >
          تم إرسال هذا الإشعار تلقائياً من نظام الموقع
        </p>
        <p
          style={{
            margin: 0,
            fontSize: "12px",
            color: "#9ba8b5", // Lighter muted
            fontWeight: "400",
          }}
        >
          © {new Date().getFullYear()} الحبسي الذكي للتدريب - جميع الحقوق محفوظة
        </p>
      </div>
    </div>
  </div>
);