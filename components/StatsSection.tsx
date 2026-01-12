"use client";

import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Users, BookOpen, Award, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Users,
    target: 10000,
    prefix: "+",
    suffix: "",
    label: "متدرب ناجح",
  },
  {
    icon: BookOpen,
    target: 50,
    prefix: "+",
    suffix: "",
    label: "دورة متخصصة",
  },
  {
    icon: Award,
    target: 15,
    prefix: "+",
    suffix: "",
    label: "سنة خبرة",
  },
  {
    icon: TrendingUp,
    target: 95,
    prefix: "",
    suffix: "%",
    label: "نسبة الرضا",
  },
];

export function StatsSection() {
  return (
    <section className="py-20 relative bg-navy overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/50 to-navy z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <AnimatedCounter
              key={index}
              icon={stat.icon}
              target={stat.target}
              prefix={stat.prefix}
              suffix={stat.suffix}
              label={stat.label}
              duration={2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
