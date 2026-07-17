import Link from "next/link";
import { ChevronRight, Flag } from "lucide-react";
import type { Project } from "@/lib/types";

const statusStyles: Record<string, string> = {
  active: "bg-[#e8f5ef] text-[#0d7a4f]",
  "at-risk": "bg-[#fef2f2] text-[#dc2626]",
  "on-hold": "bg-[#fff7ed] text-[#ea580c]",
  completed: "bg-[#f0f5f2] text-[#5a6b63]",
};

const priorityColor: Record<string, string> = {
  urgent: "text-[#dc2626]",
  high: "text-[#ea580c]",
  medium: "text-[#2563eb]",
  low: "text-[#6b7c74]",
};

export function ProjectList({
  projects,
  title = "Projects",
}: {
  projects: Project[];
  title?: string;
}) {
  return (
    <section className="rounded-xl border border-[#e5ebe8] bg-white shadow-[0_1px_2px_rgba(10,61,46,0.04)]">
      <div className="flex items-center justify-between border-b border-[#eef2f0] px-4 py-3">
        <h2 className="text-[14px] font-semibold text-[#1a2e26]">
          {title}
          <span className="ml-2 text-[12px] font-medium text-[#6b7c74]">
            ({projects.length})
          </span>
        </h2>
      </div>
      {projects.length === 0 ? (
        <p className="px-4 py-8 text-center text-[13px] text-[#8a9a92]">
          No projects in this department.
        </p>
      ) : (
        <ul className="divide-y divide-[#eef2f0]">
          {projects.map((project) => (
            <li key={project.id}>
              <Link
                href={`/projects/${project.id}`}
                className="flex items-start justify-between gap-3 px-4 py-3.5 transition hover:bg-[#f7faf8]"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[13px] font-semibold text-[#1a2e26]">
                      {project.name}
                    </p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${
                        statusStyles[project.status]
                      }`}
                    >
                      {project.status.replace("-", " ")}
                    </span>
                  </div>
                  <p className="mt-1 text-[12px] text-[#6b7c74]">
                    {project.summary}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-[#8a9a92]">
                    <span className="inline-flex items-center gap-1">
                      <Flag
                        className={`h-3 w-3 ${priorityColor[project.priority]}`}
                      />
                      <span
                        className={`capitalize ${priorityColor[project.priority]}`}
                      >
                        {project.priority}
                      </span>
                    </span>
                    <span>Lead: {project.lead}</span>
                    <span>Due {project.due}</span>
                    <span>
                      {project.taskCount} tasks · {project.fileCount} files
                    </span>
                  </div>
                  <div className="mt-2.5 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#eef2f0]">
                      <div
                        className="h-full rounded-full bg-[#0a3d2e]"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-medium text-[#6b7c74]">
                      {project.progress}%
                    </span>
                  </div>
                </div>
                <span className="mt-1 inline-flex shrink-0 items-center gap-0.5 text-[12px] font-medium text-[#0a3d2e]">
                  Details
                  <ChevronRight className="h-4 w-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
