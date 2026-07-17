"use client";

import type { Department } from "@/lib/types";

function IconChief({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
      <path d="M16 4L4 12h3v14h6V18h6v8h6V12h3L16 4zm0 2.8L23.2 12H8.8L16 6.8zM9 14h4v10H9V14zm10 0h4v10h-4V14z" />
      <path d="M14 8h4v2h-4z" opacity=".35" />
    </svg>
  );
}

function IconCrane({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
      <path d="M6 28h6v-2H8V14h12.5l6.2-6.2-1.4-1.4L18.3 12H8V8h2V6H6v2h2v4H4v2h2v14zm10-14v14h2V16.4l8 3.2V28h2V18.4l-12-4.8V14h0z" />
      <path d="M20 8h8v2h-6.2l-1.8-1.8V8z" />
      <rect x="21" y="18" width="2" height="6" rx="0.5" />
      <path d="M19 24h6v2h-6z" />
    </svg>
  );
}

function IconMountains({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
      <path d="M10.5 22L16 12l3.2 5.8L21 14l7 12H4l6.5-4z" />
      <path d="M16 12l2.2 4-1.4 1.2L16 15.5 14.8 17l-1.3-1.1L16 12z" opacity=".35" />
    </svg>
  );
}

function IconPine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
      <path d="M16 3l-6 8h3l-5 7h4l-5 7h18l-5-7h4l-5-7h3L16 3z" />
      <rect x="14.5" y="25" width="3" height="4" rx="0.5" />
    </svg>
  );
}

function IconHouse({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden>
      <path d="M5 15L16 6l11 9" />
      <path d="M8 14.5V26h16V14.5" />
      <path d="M13 26v-7h6v7" />
      <path d="M21 8v-3h3v5.5" />
    </svg>
  );
}

function IconHardHat({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
      <path d="M6 20c0-5.5 4.5-10 10-10s10 4.5 10 10H6z" />
      <path d="M14 10.2V8h4v2.2c-.6-.1-1.3-.2-2-.2s-1.4.1-2 .2z" />
      <path d="M4 20h24v3c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v-3z" />
      <rect x="15" y="12" width="2" height="8" rx="0.5" opacity=".35" />
    </svg>
  );
}

function IconFinance({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden>
      <circle cx="16" cy="16" r="12" className="fill-[#e8ecea]" />
      <path
        d="M17 9.5v1.2c1.7.3 3 1.5 3 3.2 0 .4-.1.7-.2 1l-1.5-.4c.1-.2.2-.4.2-.6 0-1-.7-1.6-2-1.8v3.9c2.3.5 3.5 1.6 3.5 3.5 0 2.1-1.6 3.4-3.5 3.7V26h-2v-1.3c-1.9-.3-3.4-1.6-3.4-3.6 0-.4.1-.8.2-1.1l1.5.4c-.1.2-.2.5-.2.7 0 1.1.9 1.8 2.1 2v-4.1c-2.2-.5-3.5-1.7-3.5-3.6 0-2 1.5-3.3 3.3-3.6V9.5h2zM15 13c-.9.2-1.5.7-1.5 1.5S14.1 15.7 15 16v-3zm2 7.2v3.1c1-.2 1.7-.8 1.7-1.6 0-.8-.6-1.3-1.7-1.5z"
        className="fill-[#0a3d2e]"
      />
    </svg>
  );
}

const iconMap: Record<
  string,
  { Icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  "chiefs-office": { Icon: IconChief, color: "text-[#1b5e3b]" },
  "major-projects": { Icon: IconCrane, color: "text-[#c4a017]" },
  lands: { Icon: IconMountains, color: "text-[#1b5e3b]" },
  forestry: { Icon: IconPine, color: "text-[#1b5e3b]" },
  housing: { Icon: IconHouse, color: "text-[#3d5248]" },
  "capital-projects": { Icon: IconHardHat, color: "text-[#c4a017]" },
  finance: { Icon: IconFinance, color: "text-[#0a3d2e]" },
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
    <div className="mx-6 mt-2 grid grid-cols-2 gap-2.5 px-0.5 pt-2.5 pb-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7">
      {departments.map((dept) => {
        const { Icon, color } = iconMap[dept.id] ?? iconMap["chiefs-office"];
        const active = dept.id === selectedId;

        return (
          <button
            key={dept.id}
            type="button"
            onClick={() => onSelect(dept.id)}
            className={`relative flex flex-col items-center rounded-xl border px-3 py-4 text-center transition ${
              active
                ? "border-[#2d5a27] bg-[#f0f9f0] shadow-[0_2px_8px_rgba(45,90,39,0.1)]"
                : "border-[#e5ebe8] bg-white hover:border-[#c5d5cc] hover:shadow-sm"
            }`}
          >
            {dept.badge ? (
              <span className="absolute top-2 right-2 z-10 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#e03e3e] px-1.5 text-[11px] font-semibold text-white shadow-sm">
                {dept.badge}
              </span>
            ) : null}

            <div className="mb-2.5 flex h-10 w-10 items-center justify-center">
              <Icon className={`h-8 w-8 ${color}`} />
            </div>

            <p className="w-full truncate text-[12px] font-semibold text-[#1a2e26]">
              {dept.name}
            </p>
            <p className="mt-0.5 text-[11px] text-[#6b7c74]">
              {dept.taskCount} {dept.taskCount === 1 ? "task" : "tasks"}
            </p>
          </button>
        );
      })}
    </div>
  );
}
