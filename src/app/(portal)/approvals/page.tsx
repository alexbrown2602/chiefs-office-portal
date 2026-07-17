"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Check,
  CheckCircle2,
  Clock3,
  DollarSign,
  FileText,
  Filter,
  PenLine,
  Search,
} from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { SignatureModal } from "@/components/SignatureModal";
import { approvals, departments, getProjectById } from "@/lib/data";
import type { ApprovalAction, ApprovalItem } from "@/lib/types";

const filters: { id: "all" | ApprovalAction; label: string }[] = [
  { id: "all", label: "All" },
  { id: "sign", label: "Sign" },
  { id: "decide", label: "Decide" },
  { id: "review", label: "Review" },
  { id: "done", label: "Completed" },
];

const actionMeta: Record<
  ApprovalAction,
  { label: string; icon: React.ElementType; wrap: string; color: string; btn: string }
> = {
  sign: {
    label: "Sign",
    icon: PenLine,
    wrap: "bg-[#fef2f2]",
    color: "text-[#dc2626]",
    btn: "border-[#fecaca] bg-[#fef2f2] text-[#dc2626] hover:bg-[#fee2e2]",
  },
  decide: {
    label: "Decide",
    icon: DollarSign,
    wrap: "bg-[#fff7ed]",
    color: "text-[#ea580c]",
    btn: "border-[#fed7aa] bg-[#fff7ed] text-[#ea580c] hover:bg-[#ffedd5]",
  },
  review: {
    label: "Review",
    icon: FileText,
    wrap: "bg-[#eff6ff]",
    color: "text-[#2563eb]",
    btn: "border-[#bfdbfe] bg-[#eff6ff] text-[#2563eb] hover:bg-[#dbeafe]",
  },
  done: {
    label: "Done",
    icon: Check,
    wrap: "bg-[#e8f5ef]",
    color: "text-[#0d7a4f]",
    btn: "border-transparent bg-[#0d7a4f] text-white",
  },
};

export default function ApprovalsPage() {
  const [filter, setFilter] = useState<"all" | ApprovalAction>("all");
  const [query, setQuery] = useState("");
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [signingItem, setSigningItem] = useState<ApprovalItem | null>(null);

  const counts = useMemo(() => {
    const base = { all: approvals.length, sign: 0, decide: 0, review: 0, done: 0 };
    for (const a of approvals) {
      if (completed.has(a.id) || a.action === "done") base.done += 1;
      else base[a.action] += 1;
    }
    return base;
  }, [completed]);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return approvals.filter((item) => {
      const effectiveAction: ApprovalAction = completed.has(item.id)
        ? "done"
        : item.action;
      if (filter !== "all" && effectiveAction !== filter) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q)
      );
    });
  }, [filter, query, completed]);

  const pending = approvals.filter(
    (a) => a.action !== "done" && !completed.has(a.id)
  ).length;

  const markDone = (id: string) => {
    setCompleted((prev) => new Set(prev).add(id));
  };

  const handleAction = (item: ApprovalItem) => {
    if (item.action === "sign") {
      setSigningItem(item);
      return;
    }
    markDone(item.id);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <TopBar title="Needs Approval" period="Signatures · Decisions · Reviews" />
      {signingItem ? (
        <SignatureModal
          item={signingItem}
          onClose={() => setSigningItem(null)}
          onComplete={(id) => {
            markDone(id);
            setSigningItem(null);
          }}
        />
      ) : null}
      <div className="flex-1 overflow-y-auto pb-8">
        <div className="border-b border-[#e5ebe8] bg-white px-6 py-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[12px] font-medium tracking-wide text-[#8a9a92] uppercase">
                Executive queue
              </p>
              <h2 className="mt-1 text-[22px] font-semibold tracking-tight text-[#1a2e26]">
                Needs Approval / Signature
              </h2>
              <p className="mt-1 text-[13px] text-[#6b7c74]">
                Digitally sign, decide, or review items flagged for the Chief&apos;s
                Office.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="rounded-xl border border-[#fecaca] bg-[#fef2f2] px-4 py-2.5">
                <p className="text-[11px] text-[#dc2626]">Awaiting action</p>
                <p className="text-[20px] font-semibold text-[#dc2626]">{pending}</p>
              </div>
              <div className="rounded-xl border border-[#e5ebe8] bg-[#f7faf8] px-4 py-2.5">
                <p className="text-[11px] text-[#6b7c74]">Completed</p>
                <p className="text-[20px] font-semibold text-[#0d7a4f]">
                  {counts.done}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 overflow-x-auto">
              <Filter className="mr-1 h-3.5 w-3.5 text-[#8a9a92]" />
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-[12px] font-semibold transition ${
                    filter === f.id
                      ? "bg-[#0a3d2e] text-white"
                      : "bg-[#f0f5f2] text-[#5a6b63] hover:bg-[#e8f5ef]"
                  }`}
                >
                  {f.label}
                  <span className="ml-1 opacity-70">({counts[f.id]})</span>
                </button>
              ))}
            </div>
            <div className="relative ml-auto min-w-[200px] flex-1 sm:max-w-xs">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8a9a92]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search approvals…"
                className="h-9 w-full rounded-full border border-[#dce5e0] bg-[#f7faf8] pr-4 pl-9 text-[13px] outline-none focus:border-[#0a3d2e]/40 focus:ring-2 focus:ring-[#0a3d2e]/10"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl space-y-3 px-6 pt-5">
          {items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#dce5e0] bg-white px-6 py-16 text-center">
              <CheckCircle2 className="mx-auto mb-3 h-8 w-8 text-[#c5d5cc]" />
              <p className="text-[14px] font-medium text-[#1a2e26]">No items</p>
              <p className="mt-1 text-[13px] text-[#6b7c74]">
                Nothing matches this filter.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <ApprovalCard
                key={item.id}
                item={item}
                isDone={completed.has(item.id) || item.action === "done"}
                onAction={() => handleAction(item)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function ApprovalCard({
  item,
  isDone,
  onAction,
}: {
  item: ApprovalItem;
  isDone: boolean;
  onAction: () => void;
}) {
  const action = isDone ? "done" : item.action;
  const meta = actionMeta[action];
  const Icon = meta.icon;
  const dept = departments.find((d) => d.id === item.departmentId);
  const project = item.projectId ? getProjectById(item.projectId) : undefined;

  return (
    <article
      className={`rounded-xl border bg-white p-4 shadow-[0_1px_2px_rgba(10,61,46,0.04)] transition ${
        isDone ? "border-[#e5ebe8] opacity-80" : "border-[#e5ebe8] hover:border-[#7cb89a]"
      }`}
    >
      <div className="flex flex-wrap items-start gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${meta.wrap}`}
        >
          <Icon className={`h-5 w-5 ${meta.color}`} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[15px] font-semibold text-[#1a2e26]">{item.title}</h3>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${meta.wrap} ${meta.color}`}
            >
              {meta.label}
            </span>
          </div>
          <p className="mt-1 text-[13px] text-[#6b7c74]">{item.subtitle}</p>
          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#8a9a92]">
            {dept ? <span>{dept.name}</span> : null}
            {project ? (
              <Link
                href={`/projects/${project.id}`}
                className="font-medium text-[#0a3d2e] hover:underline"
              >
                {project.name}
              </Link>
            ) : null}
            <span className="inline-flex items-center gap-1">
              <Clock3 className="h-3 w-3" />
              {isDone ? "Completed" : "Awaiting Chief action"}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {project ? (
            <Link
              href={`/projects/${project.id}`}
              className="rounded-lg border border-[#dce5e0] px-3 py-2 text-[12px] font-medium text-[#5a6b63] hover:bg-[#f7faf8]"
            >
              Open file
            </Link>
          ) : null}
          {!isDone ? (
            <button
              type="button"
              onClick={onAction}
              className={`rounded-lg border px-3.5 py-2 text-[12px] font-semibold transition ${meta.btn}`}
            >
              {item.action === "sign" ? "Sign document" : meta.label}
            </button>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#e8f5ef] px-3 py-2 text-[12px] font-semibold text-[#0d7a4f]">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Signed
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
