import { cn } from "@/lib/utils";

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    align?: "left" | "center" | "right";
    className?: string;
    variant?: "light" | "dark";
}

export function SectionHeading({ title, subtitle, align = "center", className, variant = "dark" }: SectionHeadingProps) {
    const textColor = variant === "dark" ? "text-navy" : "text-white";

    return (
        <div className={cn("mb-12 relative z-10",
            align === "center" && "text-center",
            align === "right" && "text-right",
            align === "left" && "text-left",
            className
        )}>
            {subtitle && (
                <span className="text-gold font-bold tracking-widest uppercase text-sm mb-3 block animate-fade-in-up">
                    {subtitle}
                </span>
            )}
            <h2 className={cn("text-3xl md:text-5xl font-bold leading-tight animate-fade-in-up delay-100", textColor)}>
                {title}
            </h2>
            <div className={cn("h-1 w-24 bg-gold/50 mt-6", align === "center" && "mx-auto")} />
        </div>
    )
}
