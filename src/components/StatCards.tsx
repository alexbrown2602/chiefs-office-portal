import {
  AlertTriangle,
  CheckCircle2,
  FolderOpen,
  ListTodo,
  Star,
} from "lucide-react";
import type { Stat } from "@/lib/types";

const iconMap = {
  folder: FolderOpen,
  list: ListTodo,
  alert: AlertTriangle,
  star: Star,
  check: CheckCircle2,
};

const colorStyles: Record<string, { icon: string; bg: string }> = {
  green: { icon: "text-[#0d7a4f]", bg: "bg-[#e8f5ef]" },
  blue: { icon: "text-[#2563eb]", bg: "bg-[#eef3ff]" },
  red: { icon: "text-[#dc2626]", bg: "bg-[#fef2f2]" },
  orange: { icon: "text-[#ea580c]", bg: "bg-[#fff7ed]" },
};

export function StatCards({ stats }: { stats: Stat[] }) {
  return (
    <div className="mx-6 mt-4 grid grid-cols-2 gap-3 xl:grid-cols-5">
      {stats.map((stat) => {
        const Icon = iconMap[stat.icon as keyof typeof iconMap] ?? FolderOpen;
        const colors = colorStyles[stat.color] ?? colorStyles.green;
        return (
          <div
            key={stat.id}
            className="flex items-center gap-3 rounded-xl border border-[#e5ebe8] bg-white px-4 py-3.5 shadow-[0_1px_2px_rgba(10,61,46,0.04)]"
          >
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colors.bg}`}>
              <Icon className={`h-5 w-5 ${colors.icon}`} />
            </div>
            <div className="min-w-0">
              <p className="text-[12px] text-[#6b7c74]">{stat.label}</p>
              <p className="text-[22px] font-semibold leading-tight text-[#1a2e26]">
                {stat.value}
              </p>
              <p className="truncate text-[11px] text-[#8a9a92]">{stat.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
