import React from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function SectionHeader({ title, description, action }: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-6">
      <div>
        <h2 className="text-2xl font-bold text-navy">{title}</h2>
        {description && <p className="text-gray-500 mt-1">{description}</p>}
      </div>
      {action}
    </div>
  );
}
