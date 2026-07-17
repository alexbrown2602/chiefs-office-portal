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
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e5ebe8] bg-white px-6 py-4">
      <div>
        <h1 className="text-[20px] font-semibold tracking-tight text-[#1a2e26]">
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
            className="h-9 w-[240px] rounded-full border border-[#dce5e0] bg-[#f7faf8] pr-4 pl-9 text-[13px] text-[#1a2e26] outline-none placeholder:text-[#8a9a92] focus:border-[#0a3d2e]/40 focus:ring-2 focus:ring-[#0a3d2e]/10"
          />
        </div>
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#dce5e0] bg-white text-[#5a6b63] hover:bg-[#f7faf8]"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#e03e3e]" />
        </button>
        <p className="hidden text-[12px] text-[#8a9a92] lg:block">
          Last updated: May 7, 2026 9:24 AM
        </p>
      </div>
    </header>
  );
}
