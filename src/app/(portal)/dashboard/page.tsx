"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  FileText,
  FolderKanban,
  PenLine,
  Wallet,
} from "lucide-react";
import { AlertBanner } from "@/components/AlertBanner";
import { ApprovalList } from "@/components/ApprovalList";
import { DepartmentSelector } from "@/components/DepartmentSelector";
import { StatCards } from "@/components/StatCards";
import { TeamActivity } from "@/components/TeamActivity";
import { TopBar } from "@/components/TopBar";
import { UpcomingMeetings } from "@/components/UpcomingMeetings";
import {
  departments,
  files,
  getDepartmentOverview,
  recentActivity,
  stats,
  teamMembers,
} from "@/lib/data";

const quickLinks = [
  { href: "/approvals", label: "Approvals", icon: PenLine },
  { href: "/files", label: "Documents", icon: FileText },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/finance", label: "Finance", icon: Wallet },
];

export default function DashboardPage() {
  const [selectedDept, setSelectedDept] = useState("chiefs-office");

  const overview = useMemo(
    () => getDepartmentOverview(selectedDept),
    [selectedDept]
  );

  const dept = overview.department;
  const deptName = dept?.name ?? "Chief's Office";
  const deptHref =
    selectedDept === "finance"
      ? "/finance"
      : `/departments/${selectedDept}`;

  const displayStats = useMemo(() => {
    if (selectedDept === "chiefs-office") return stats;
    return overview.stats.map((s, i) =>
      i === 0 ? { ...s, subtitle: deptName } : s
    );
  }, [selectedDept, overview.stats, deptName]);

  const team =
    overview.team.length > 0 ? overview.team : teamMembers.slice(0, 6);

  const activityFeed = useMemo(() => {
    const scoped = recentActivity.filter(
      (a) => a.departmentId === selectedDept
    );
    return (scoped.length ? scoped : recentActivity).slice(0, 6);
  }, [selectedDept]);

  const recentFiles = useMemo(() => {
    const scoped = files.filter((f) => f.departmentId === selectedDept);
    return (scoped.length ? scoped : files).slice(0, 5);
  }, [selectedDept]);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <TopBar title={`${deptName} — Overview`} />
      <div className="flex-1 overflow-y-auto pb-8">
        <div className="mx-6 mt-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[12px] font-medium tracking-wide text-[#8a9a92] uppercase">
              Executive dashboard
            </p>
            <p className="mt-0.5 text-[13px] text-[#6b7c74]">
              Approvals, team workload, and meetings across Takla Nation.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#dce5e0] bg-white px-3 py-1.5 text-[12px] font-medium text-[#0a3d2e] shadow-[0_1px_2px_rgba(10,61,46,0.04)] transition hover:border-[#7cb89a] hover:bg-[#e8f5ef]"
              >
                <link.icon className="h-3.5 w-3.5" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <AlertBanner />
        <StatCards stats={displayStats} />

        <div className="mx-6 mt-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-[13px] font-semibold text-[#1a2e26]">
              Departments
            </p>
            <p className="text-[12px] text-[#6b7c74]">
              Filter the panels below — or open a full department workspace.
            </p>
          </div>
          <Link
            href={deptHref}
            className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#0a3d2e] hover:underline"
          >
            <FolderKanban className="h-3.5 w-3.5" />
            Open {deptName}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <DepartmentSelector
          departments={departments}
          selectedId={selectedDept}
          onSelect={setSelectedDept}
        />

        <div
          key={selectedDept}
          className="mx-6 mt-2 grid min-h-[520px] animate-[fadeIn_0.25s_ease] grid-cols-1 gap-4 xl:grid-cols-3"
        >
          <ApprovalList items={overview.approvals.slice(0, 8)} />
          <TeamActivity members={team} />
          <UpcomingMeetings meetings={overview.meetings.slice(0, 8)} />
        </div>

        <div className="mx-6 mt-4 grid gap-4 lg:grid-cols-2">
          <section className="rounded-xl border border-[#e5ebe8] bg-white shadow-[0_1px_2px_rgba(10,61,46,0.04)]">
            <div className="flex items-center justify-between border-b border-[#eef2f0] px-4 py-3">
              <h2 className="text-[14px] font-semibold text-[#1a2e26]">
                Recent activity
              </h2>
              <Link
                href="/tasks"
                className="text-[12px] font-medium text-[#0a3d2e] hover:underline"
              >
                View register
              </Link>
            </div>
            <ul className="divide-y divide-[#eef2f0]">
              {activityFeed.map((item) => (
                <li key={item.id} className="flex items-start gap-3 px-4 py-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#0a3d2e]" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] text-[#1a2e26]">
                      <span className="font-semibold">{item.actor}</span>{" "}
                      {item.action}{" "}
                      <span className="font-medium">{item.target}</span>
                    </p>
                    <p className="text-[11px] text-[#8a9a92]">{item.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-[#e5ebe8] bg-white shadow-[0_1px_2px_rgba(10,61,46,0.04)]">
            <div className="flex items-center justify-between border-b border-[#eef2f0] px-4 py-3">
              <h2 className="text-[14px] font-semibold text-[#1a2e26]">
                Recent files
              </h2>
              <Link
                href="/files"
                className="text-[12px] font-medium text-[#0a3d2e] hover:underline"
              >
                Document library
              </Link>
            </div>
            <ul className="divide-y divide-[#eef2f0]">
              {recentFiles.map((file) => (
                <li key={file.id} className="flex items-center gap-3 px-4 py-3">
                  <FileText className="h-4 w-4 shrink-0 text-[#0a3d2e]" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium text-[#1a2e26]">
                      {file.name}
                    </p>
                    <p className="text-[11px] text-[#8a9a92]">
                      {file.owner} · {file.version} · {file.updated}
                    </p>
                  </div>
                  <span className="shrink-0 text-[11px] text-[#6b7c74]">
                    {file.status}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
