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
  departments,
  getDepartmentOverview,
  stats,
  teamMembers,
} from "@/lib/data";

export default function DashboardPage() {
  const [selectedDept, setSelectedDept] = useState("chiefs-office");

  const overview = useMemo(
    () => getDepartmentOverview(selectedDept),
    [selectedDept]
  );

  const deptName = overview.department?.name ?? "Chief's Office";

  // Executive dashboard: global KPIs; lower panels follow the selected department tab
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <TopBar title={`${deptName} — Overview`} />
      <div className="flex-1 overflow-y-auto pb-6">
        <AlertBanner />
        <StatCards stats={stats} />
        <DepartmentSelector
          departments={departments}
          selectedId={selectedDept}
          onSelect={setSelectedDept}
        />

        <div className="mx-6 mt-4 grid min-h-[420px] grid-cols-1 gap-4 xl:grid-cols-3">
          <ApprovalList items={overview.approvals.slice(0, 5)} />
          <TeamActivity members={overview.team.length ? overview.team : teamMembers} />
          <UpcomingMeetings meetings={overview.meetings.slice(0, 5)} />
        </div>
      </div>
    </div>
  );
}
