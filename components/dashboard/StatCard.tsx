import { TrendingUp } from "lucide-react";

interface StatCardProps {
  icon: any;
  label: string;
  value: string;
  trend?: string;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  trend,
}: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
      <div>
        <p className="text-gray-500 text-sm mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-navy">{value}</h3>
        {trend && (
          <p className="text-green-600 text-xs font-bold mt-2 flex items-center gap-1">
            <TrendingUp size={12} />
            {trend}
          </p>
        )}
      </div>
      <div className="bg-navy/5 p-3 rounded-lg text-navy">
        <Icon size={24} />
      </div>
    </div>
  );
}
