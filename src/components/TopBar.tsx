"use client";

import { Bell, Search } from "lucide-react";

export function TopBar({
  title,
  period = "May 2026",
}: {
  title: string;
  period?: string;
}) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e5ebe8] bg-white/95 px-6 py-4 backdrop-blur">
      <div>
        <h1 className="text-[21px] font-semibold tracking-tight text-[#1a2e26]">
          {title}
        </h1>
        <p className="mt-0.5 text-[13px] text-[#6b7c74]">{period}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8a9a92]" />
          <input
            type="search"
            placeholder="Search files and tasks..."
            className="h-9 w-[220px] rounded-full border border-[#dce5e0] bg-[#f7faf8] pr-4 pl-9 text-[13px] text-[#1a2e26] outline-none transition placeholder:text-[#8a9a92] focus:w-[260px] focus:border-[#0a3d2e]/40 focus:bg-white focus:ring-2 focus:ring-[#0a3d2e]/10 sm:w-[240px]"
          />
        </div>
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#dce5e0] bg-white text-[#5a6b63] transition hover:bg-[#f7faf8] hover:text-[#0a3d2e]"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#e03e3e] ring-2 ring-white" />
        </button>
        <div className="hidden rounded-full bg-[#f0f5f2] px-3 py-1.5 lg:block">
          <p className="text-[11px] font-medium text-[#5a6b63]">
            Last updated · May 7, 2026 9:24 AM
          </p>
        </div>
      </div>
    </header>
  );
}
