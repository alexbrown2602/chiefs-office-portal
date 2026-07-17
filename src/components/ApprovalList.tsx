"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, CheckCircle2, DollarSign, FileText, PenLine } from "lucide-react";
import { SignatureModal } from "@/components/SignatureModal";
import type { ApprovalItem } from "@/lib/types";

const actionStyles: Record<
  string,
  { label: string; className: string; done?: boolean }
> = {
  sign: {
    label: "Sign",
    className: "border-[#fecaca] bg-[#fef2f2] text-[#dc2626] hover:bg-[#fee2e2]",
  },
  decide: {
    label: "Decide",
    className: "border-[#fed7aa] bg-[#fff7ed] text-[#ea580c] hover:bg-[#ffedd5]",
  },
  review: {
    label: "Review",
    className: "border-[#bfdbfe] bg-[#eff6ff] text-[#2563eb] hover:bg-[#dbeafe]",
  },
  done: {
    label: "Done",
    className: "border-transparent bg-[#0d7a4f] text-white hover:bg-[#0a6642]",
    done: true,
  },
};

const iconStyles: Record<string, { Icon: React.ElementType; wrap: string; color: string }> = {
  pen: { Icon: PenLine, wrap: "bg-[#fef2f2]", color: "text-[#dc2626]" },
  dollar: { Icon: DollarSign, wrap: "bg-[#fff7ed]", color: "text-[#ea580c]" },
  file: { Icon: FileText, wrap: "bg-[#eff6ff]", color: "text-[#2563eb]" },
  check: { Icon: Check, wrap: "bg-[#e8f5ef]", color: "text-[#0d7a4f]" },
};

export function ApprovalList({ items }: { items: ApprovalItem[] }) {
  const [signingItem, setSigningItem] = useState<ApprovalItem | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  return (
    <section className="flex min-h-0 flex-1 flex-col rounded-xl border border-[#e5ebe8] bg-white shadow-[0_1px_2px_rgba(10,61,46,0.04)]">
      {signingItem ? (
        <SignatureModal
          item={signingItem}
          onClose={() => setSigningItem(null)}
          onComplete={(id) => {
            setCompleted((prev) => new Set(prev).add(id));
            setSigningItem(null);
          }}
        />
      ) : null}
      <div className="flex items-center justify-between border-b border-[#eef2f0] px-4 py-3">
        <h2 className="text-[14px] font-semibold text-[#1a2e26]">
          Needs Approval / Signature
        </h2>
        <Link href="/approvals" className="text-[12px] font-medium text-[#0a3d2e] hover:underline">
          View all
        </Link>
      </div>
      <ul className="divide-y divide-[#eef2f0] overflow-y-auto">
        {items.map((item) => {
          const isDone = completed.has(item.id) || item.action === "done";
          const effectiveAction = isDone ? "done" : item.action;
          const action = actionStyles[effectiveAction];
          const icon = iconStyles[isDone ? "check" : item.icon] ?? iconStyles.file;
          const Icon = icon.Icon;
          return (
            <li key={item.id} className="flex items-center gap-3 px-4 py-3">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${icon.wrap}`}
              >
                <Icon className={`h-4 w-4 ${icon.color}`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-[#1a2e26]">
                  {item.title}
                </p>
                <p className="truncate text-[11px] text-[#6b7c74]">
                  {isDone ? "Electronically signed" : item.subtitle}
                </p>
              </div>
              {isDone ? (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-[#e8f5ef] px-2.5 py-1 text-[12px] font-semibold text-[#0d7a4f]">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Signed
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    if (item.action === "sign") setSigningItem(item);
                    else setCompleted((prev) => new Set(prev).add(item.id));
                  }}
                  className={`shrink-0 rounded-md border px-2.5 py-1 text-[12px] font-semibold transition ${action.className}`}
                >
                  {action.label}
                </button>
              )}
            </li>
          );
        })}
        {items.length === 0 ? (
          <li className="px-4 py-8 text-center text-[13px] text-[#8a9a92]">
            No items need approval for this department.
          </li>
        ) : null}
      </ul>
    </section>
  );
}
