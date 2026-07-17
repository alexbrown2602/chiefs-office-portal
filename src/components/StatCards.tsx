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

const colorStyles: Record<
  string,
  { icon: string; bg: string; ring: string; value?: string }
> = {
  green: {
    icon: "text-[#0d7a4f]",
    bg: "bg-[#e8f5ef]",
    ring: "hover:border-[#7cb89a]",
  },
  blue: {
    icon: "text-[#2563eb]",
    bg: "bg-[#eef3ff]",
    ring: "hover:border-[#93c5fd]",
  },
  red: {
    icon: "text-[#dc2626]",
    bg: "bg-[#fef2f2]",
    ring: "hover:border-[#fca5a5]",
    value: "text-[#dc2626]",
  },
  orange: {
    icon: "text-[#ea580c]",
    bg: "bg-[#fff7ed]",
    ring: "hover:border-[#fdba74]",
    value: "text-[#ea580c]",
  },
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
            className={`group flex items-center gap-3 rounded-xl border border-[#e5ebe8] bg-white px-4 py-3.5 shadow-[0_1px_2px_rgba(10,61,46,0.04)] transition hover:-translate-y-0.5 hover:shadow-md ${colors.ring}`}
          >
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${colors.bg} transition group-hover:scale-105`}
            >
              <Icon className={`h-5 w-5 ${colors.icon}`} />
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-medium text-[#6b7c74]">
                {stat.label}
              </p>
              <p
                className={`text-[24px] font-semibold leading-none tracking-tight ${
                  colors.value ?? "text-[#1a2e26]"
                }`}
              >
                {stat.value}
              </p>
              <p className="mt-1 truncate text-[11px] text-[#8a9a92]">
                {stat.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
