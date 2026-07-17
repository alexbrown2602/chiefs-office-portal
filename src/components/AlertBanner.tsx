import Link from "next/link";
import { AlertTriangle, ChevronRight } from "lucide-react";
import { alertItems } from "@/lib/data";

export function AlertBanner() {
  return (
    <div className="mx-6 mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-[#f0d78c] bg-gradient-to-r from-[#fff8e6] to-[#fffbf0] px-4 py-3 shadow-[0_1px_2px_rgba(196,136,10,0.08)]">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f5c842]/35">
        <AlertTriangle className="h-4 w-4 text-[#c4880a]" />
      </div>
      <p className="min-w-0 flex-1 text-[13px] leading-snug text-[#5c4a1a]">
        <span className="font-semibold">
          {alertItems.length} items need your signature or approval:
        </span>{" "}
        <span className="text-[#6b5a28]">{alertItems.join(", ")}.</span>
      </p>
      <Link
        href="/approvals"
        className="inline-flex shrink-0 items-center gap-0.5 rounded-lg bg-white/80 px-3 py-1.5 text-[13px] font-semibold text-[#0a3d2e] ring-1 ring-[#e8d5a3] transition hover:bg-white"
      >
        View all
        <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
