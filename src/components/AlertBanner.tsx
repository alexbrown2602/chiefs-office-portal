import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { alertItems } from "@/lib/data";

export function AlertBanner() {
  return (
    <div className="mx-6 mt-4 flex items-center gap-3 rounded-lg border border-[#f0d78c] bg-[#fff8e6] px-4 py-2.5">
      <AlertTriangle className="h-4 w-4 shrink-0 text-[#c4880a]" />
      <p className="flex-1 text-[13px] text-[#5c4a1a]">
        <span className="font-semibold">{alertItems.length} items need your signature or approval:</span>{" "}
        {alertItems.join(", ")}.
      </p>
      <Link
        href="/approvals"
        className="shrink-0 text-[13px] font-medium text-[#0a3d2e] hover:underline"
      >
        View all &gt;
      </Link>
    </div>
  );
}
