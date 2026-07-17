"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Flag } from "lucide-react";
import type { TeamMember } from "@/lib/types";

export function TeamActivity({ members }: { members: TeamMember[] }) {
  const [expandedId, setExpandedId] = useState(members[0]?.id ?? "");

  useEffect(() => {
    setExpandedId(members[0]?.id ?? "");
  }, [members]);

  return (
    <section className="flex min-h-0 flex-1 flex-col rounded-xl border border-[#e5ebe8] bg-white shadow-[0_1px_2px_rgba(10,61,46,0.04)]">
      <div className="flex items-center justify-between border-b border-[#eef2f0] px-4 py-3">
        <div>
          <h2 className="text-[14px] font-semibold text-[#1a2e26]">Team Activity</h2>
          <p className="text-[11px] text-[#8a9a92]">Click a name to view tasks</p>
        </div>
        <Link href="/tasks" className="text-[12px] font-medium text-[#0a3d2e] hover:underline">
          Full register
        </Link>
      </div>
      {members.length === 0 ? (
        <p className="px-4 py-8 text-center text-[13px] text-[#8a9a92]">
          No team activity for this department.
        </p>
      ) : null}
      <ul className="overflow-y-auto">
        {members.map((member) => {
          const open = expandedId === member.id;
          return (
            <li key={member.id} className="border-b border-[#eef2f0] last:border-0">
              <button
                type="button"
                onClick={() => setExpandedId(open ? "" : member.id)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-[#f7faf8]"
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold text-white"
                  style={{ backgroundColor: member.color }}
                >
                  {member.initials}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-medium text-[#1a2e26]">
                    {member.name}
                  </span>
                  <span className="block truncate text-[11px] text-[#6b7c74]">
                    {member.urgentCount > 0 ? (
                      <span className="text-[#dc2626]">{member.urgentCount} urgent</span>
                    ) : null}
                    {member.urgentCount > 0 && member.highCount > 0 ? ", " : null}
                    {member.highCount > 0 ? (
                      <span className="text-[#ea580c]">{member.highCount} high</span>
                    ) : null}
                    {(member.urgentCount > 0 || member.highCount > 0) ? " · " : null}
                    {member.taskCount} tasks
                  </span>
                </span>
                {open ? (
                  <ChevronDown className="h-4 w-4 text-[#8a9a92]" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-[#8a9a92]" />
                )}
              </button>
              {open && member.tasks.length > 0 ? (
                <ul className="space-y-1.5 bg-[#f7faf8] px-4 pt-0 pb-3">
                  {member.tasks.map((task) => (
                    <li
                      key={task.id}
                      className="flex items-start gap-2 rounded-lg border border-[#e5ebe8] bg-white px-3 py-2"
                    >
                      <Flag
                        className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                          task.priority === "urgent"
                            ? "text-[#dc2626]"
                            : task.priority === "high"
                              ? "text-[#ea580c]"
                              : "text-[#6b7c74]"
                        }`}
                      />
                      <div className="min-w-0">
                        <p className="text-[12px] font-medium text-[#1a2e26]">{task.title}</p>
                        <p className="text-[11px] text-[#8a9a92]">
                          <span
                            className={`font-medium capitalize ${
                              task.priority === "urgent"
                                ? "text-[#dc2626]"
                                : "text-[#ea580c]"
                            }`}
                          >
                            {task.priority}
                          </span>
                          {task.project ? ` · ${task.project}` : null}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
