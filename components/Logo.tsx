import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 font-serif font-bold text-xl tracking-tight text-navy",
        className
      )}
    >
      {/* Placeholder for the actual logo image if we had the path, for now textual representation */}
      <div className="relative w-10 h-10 bg-white text-gold flex items-center justify-center rounded-sm">
        {/* <span className="text-2xl">M</span>
        <div className="absolute -top-2 -right-2 text-gold text-lg">👑</div> */}
        <Image src="/logo1.png" alt="Logo" width={40} height={40} />
      </div>
      <div className="flex flex-col">
        <span className="leading-none text-lg">MOHAMMED ALHABSI</span>
        <span className="text-[10px] text-gold tracking-widest uppercase leading-none mt-1">
          Business Mentor
        </span>
      </div>
    </div>
  );
}
