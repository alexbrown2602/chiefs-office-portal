"use client";

import { useMemo, useState } from "react";
import { AlertBanner } from "@/components/AlertBanner";
import { ApprovalList } from "@/components/ApprovalList";
import { DepartmentSelector } from "@/components/DepartmentSelector";
import { StatCards } from "@/components/StatCards";
import { TeamActivity } from "@/components/TeamActivity";
import { TopBar } from "@/components/TopBar";
import { UpcomingMeetings } from "@/components/UpcomingMeetings";
import {
  approvals,
  departments,
  meetings,
  stats,
  teamMembers,
} from "@/lib/data";

export default function DashboardPage() {
  const [selectedDept, setSelectedDept] = useState("chiefs-office");

  const deptName =
    departments.find((d) => d.id === selectedDept)?.name ?? "Chief's Office";

  const filteredApprovals = useMemo(() => {
    const list = approvals.filter((a) => a.departmentId === selectedDept);
    if (list.length > 0) return list.slice(0, 5);
    return approvals.filter((a) => a.action !== "done").slice(0, 5);
  }, [selectedDept]);

  const filteredMeetings = useMemo(() => {
    const list = meetings.filter((m) => m.departmentId === selectedDept);
    if (list.length > 0) return list;
    return meetings.slice(0, 4);
  }, [selectedDept]);

  const filteredStats = useMemo(() => {
    const dept = departments.find((d) => d.id === selectedDept);
    if (!dept || selectedDept === "chiefs-office") return stats;
    return [
      { ...stats[0], value: Math.max(2, Math.round(dept.taskCount / 4)), subtitle: dept.name },
      { ...stats[1], value: dept.taskCount, subtitle: "This department" },
      { ...stats[2], value: Math.max(1, Math.round(dept.taskCount / 6)), subtitle: "Action needed now" },
      { ...stats[3], value: Math.max(2, Math.round(dept.taskCount / 3)), subtitle: "This month" },
      { ...stats[4], value: Math.max(0, Math.round(dept.taskCount / 10)), subtitle: "This cycle" },
    ];
  }, [selectedDept]);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <TopBar title={`${deptName} — Overview`} />
      <div className="flex-1 overflow-y-auto pb-6">
        <AlertBanner />
        <StatCards stats={filteredStats} />
        <DepartmentSelector
          departments={departments}
          selectedId={selectedDept}
          onSelect={setSelectedDept}
        />
        <div className="mx-6 mt-4 grid min-h-[420px] grid-cols-1 gap-4 xl:grid-cols-3">
          <ApprovalList items={filteredApprovals} />
          <TeamActivity members={teamMembers} />
          <UpcomingMeetings meetings={filteredMeetings} />
        </div>
      </div>
    </div>
  );
}
