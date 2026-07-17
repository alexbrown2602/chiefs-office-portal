"use client";

import {
  FolderKanban,
  HardHat,
  Home,
  Landmark,
  Map,
  Trees,
  Wallet,
} from "lucide-react";
import type { Department } from "@/lib/types";

const icons: Record<string, React.ElementType> = {
  landmark: Landmark,
  "folder-kanban": FolderKanban,
  map: Map,
  trees: Trees,
  home: Home,
  "hard-hat": HardHat,
  wallet: Wallet,
};

export function DepartmentSelector({
  departments,
  selectedId,
  onSelect,
}: {
  departments: Department[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="mx-6 mt-3 flex gap-2.5 overflow-x-auto px-0.5 pt-2.5 pb-2">
      {departments.map((dept) => {
        const Icon = icons[dept.icon] ?? Landmark;
        const active = dept.id === selectedId;
        return (
          <button
            key={dept.id}
            type="button"
            onClick={() => onSelect(dept.id)}
            className={`relative flex min-w-[148px] shrink-0 items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left transition ${
              active
                ? "border-[#7cb89a] bg-[#e8f5ef] shadow-sm"
                : "border-[#e5ebe8] bg-white hover:border-[#c5d5cc]"
            }`}
          >
            {dept.badge ? (
              <span className="absolute -top-2 -right-2 z-10 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#e03e3e] px-1.5 text-[11px] font-semibold text-white shadow-sm">
                {dept.badge}
              </span>
            ) : null}
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                active ? "bg-[#0a3d2e] text-white" : "bg-[#f0f5f2] text-[#0a3d2e]"
              }`}
            >
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[12px] font-semibold text-[#1a2e26]">
                {dept.name}
              </p>
              <p className="whitespace-nowrap text-[11px] text-[#6b7c74]">
                {dept.taskCount} tasks
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
