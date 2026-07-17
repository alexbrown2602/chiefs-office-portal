"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { ApprovalList } from "@/components/ApprovalList";
import { UpcomingMeetings } from "@/components/UpcomingMeetings";
import { approvals, departments, files, meetings, tasks } from "@/lib/data";

export default function DepartmentPage() {
  const params = useParams();
  const slug = String(params.slug ?? "");
  const dept = departments.find((d) => d.id === slug);

  const deptApprovals = useMemo(
    () => approvals.filter((a) => a.departmentId === slug),
    [slug]
  );
  const deptMeetings = useMemo(
    () => meetings.filter((m) => m.departmentId === slug),
    [slug]
  );
  const deptFiles = useMemo(
    () =>
      files.filter((f) =>
        f.department.toLowerCase().includes(
          (dept?.name ?? "").toLowerCase().split(" ")[0] ?? ""
        )
      ),
    [dept]
  );
  const deptTasks = useMemo(
    () =>
      tasks.filter((t) =>
        t.department.toLowerCase().includes(
          (dept?.name ?? "").toLowerCase().split(" ")[0] ?? ""
        )
      ),
    [dept]
  );

  if (!dept) {
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <TopBar title="Department not found" />
        <p className="p-6 text-[14px] text-[#6b7c74]">
          This department does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <TopBar title={`${dept.name} — Overview`} />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { label: "Tasks", value: dept.taskCount },
            { label: "Pending approvals", value: deptApprovals.filter((a) => a.action !== "done").length },
            { label: "Files", value: deptFiles.length || Math.max(1, Math.round(dept.taskCount / 5)) },
            { label: "Meetings", value: deptMeetings.length },
          ].map((card) => (
            <div
              key={card.label}
              className="rounded-xl border border-[#e5ebe8] bg-white px-4 py-3"
            >
              <p className="text-[12px] text-[#6b7c74]">{card.label}</p>
              <p className="text-[22px] font-semibold text-[#1a2e26]">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="mb-6 grid gap-4 xl:grid-cols-2">
          <ApprovalList
            items={
              deptApprovals.length
                ? deptApprovals
                : approvals.filter((a) => a.action !== "done").slice(0, 3)
            }
          />
          <UpcomingMeetings
            meetings={deptMeetings.length ? deptMeetings : meetings.slice(0, 3)}
          />
        </div>

        <section className="rounded-xl border border-[#e5ebe8] bg-white">
          <div className="border-b border-[#eef2f0] px-4 py-3">
            <h2 className="text-[14px] font-semibold text-[#1a2e26]">
              Department tasks
            </h2>
          </div>
          <ul className="divide-y divide-[#eef2f0]">
            {(deptTasks.length ? deptTasks : tasks.slice(0, 4)).map((task) => (
              <li key={task.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-[13px] font-medium text-[#1a2e26]">{task.title}</p>
                  <p className="text-[11px] text-[#6b7c74]">
                    {task.assignee} · Due {task.due}
                  </p>
                </div>
                <span className="rounded-full bg-[#fff7ed] px-2 py-0.5 text-[11px] font-semibold capitalize text-[#ea580c]">
                  {task.priority}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
