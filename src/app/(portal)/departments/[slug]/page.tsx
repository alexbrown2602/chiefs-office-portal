"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronRight,
  FileText,
  Flag,
  FolderKanban,
  ListTodo,
  PenLine,
  Search,
} from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { getDepartmentOverview } from "@/lib/data";
import type { Project } from "@/lib/types";

const tabs = [
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "files", label: "Files", icon: FileText },
  { id: "tasks", label: "Tasks", icon: ListTodo },
  { id: "approvals", label: "Approvals", icon: PenLine },
] as const;

type TabId = (typeof tabs)[number]["id"];

const statusStyles: Record<string, string> = {
  active: "bg-[#e8f5ef] text-[#0d7a4f]",
  "at-risk": "bg-[#fef2f2] text-[#dc2626]",
  "on-hold": "bg-[#fff7ed] text-[#ea580c]",
  completed: "bg-[#f0f5f2] text-[#5a6b63]",
};

const priorityStyles: Record<string, string> = {
  urgent: "bg-[#fef2f2] text-[#dc2626]",
  high: "bg-[#fff7ed] text-[#ea580c]",
  medium: "bg-[#eff6ff] text-[#2563eb]",
  low: "bg-[#f0f5f2] text-[#5a6b63]",
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group flex flex-col rounded-xl border border-[#e5ebe8] bg-white p-5 shadow-[0_1px_2px_rgba(10,61,46,0.04)] transition hover:border-[#7cb89a] hover:shadow-md"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[15px] font-semibold text-[#1a2e26] group-hover:text-[#0a3d2e]">
              {project.name}
            </h3>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${
                statusStyles[project.status]
              }`}
            >
              {project.status.replace("-", " ")}
            </span>
          </div>
          <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-[#6b7c74]">
            {project.description ?? project.summary}
          </p>
        </div>
        <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-[#c5d5cc] transition group-hover:text-[#0a3d2e]" />
      </div>

      <div className="mt-auto space-y-3 border-t border-[#eef2f0] pt-3">
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#8a9a92]">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold capitalize ${
              priorityStyles[project.priority]
            }`}
          >
            <Flag className="h-3 w-3" />
            {project.priority}
          </span>
          <span>Lead: {project.lead}</span>
          <span>·</span>
          <span>Due {project.due}</span>
        </div>
        <div className="flex items-center gap-2">
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
        <p className="text-[11px] text-[#8a9a92]">
          {project.taskCount} tasks · {project.fileCount} files · Open for
          files, messages & notes
        </p>
      </div>
    </Link>
  );
}

export default function DepartmentPage() {
  const params = useParams();
  const slug = String(params.slug ?? "");
  const [tab, setTab] = useState<TabId>("projects");
  const [query, setQuery] = useState("");
  const overview = useMemo(() => getDepartmentOverview(slug), [slug]);

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return overview.projects;
    return overview.projects.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.lead.toLowerCase().includes(q)
    );
  }, [overview.projects, query]);

  const filteredFiles = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return overview.files;
    return overview.files.filter((f) => f.name.toLowerCase().includes(q));
  }, [overview.files, query]);

  const filteredTasks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return overview.tasks;
    return overview.tasks.filter((t) => t.title.toLowerCase().includes(q));
  }, [overview.tasks, query]);

  if (!overview.department) {
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <TopBar title="Department not found" />
        <p className="p-6 text-[14px] text-[#6b7c74]">
          This department does not exist.
        </p>
        <Link
          href="/dashboard"
          className="mx-6 text-[13px] font-medium text-[#0a3d2e] hover:underline"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const dept = overview.department;
  const pendingApprovals = overview.approvals.filter((a) => a.action !== "done");

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <TopBar title={dept.name} period="Department · Projects & files" />

      <div className="flex-1 overflow-y-auto pb-8">
        <div className="border-b border-[#e5ebe8] bg-white px-6 py-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[12px] font-medium tracking-wide text-[#8a9a92] uppercase">
                Department workspace
              </p>
              <h2 className="mt-1 text-[22px] font-semibold tracking-tight text-[#1a2e26]">
                {dept.name}
              </h2>
              <p className="mt-1 max-w-xl text-[13px] text-[#6b7c74]">
                Open a project for files, messages, notes, tasks, and activity.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-[12px]">
              <div className="rounded-lg border border-[#e5ebe8] bg-[#f7faf8] px-3 py-2">
                <p className="text-[#8a9a92]">Projects</p>
                <p className="text-[16px] font-semibold text-[#1a2e26]">
                  {overview.projects.length}
                </p>
              </div>
              <div className="rounded-lg border border-[#e5ebe8] bg-[#f7faf8] px-3 py-2">
                <p className="text-[#8a9a92]">Files</p>
                <p className="text-[16px] font-semibold text-[#1a2e26]">
                  {overview.files.length}
                </p>
              </div>
              <div className="rounded-lg border border-[#e5ebe8] bg-[#f7faf8] px-3 py-2">
                <p className="text-[#8a9a92]">Tasks</p>
                <p className="text-[16px] font-semibold text-[#1a2e26]">
                  {overview.tasks.length}
                </p>
              </div>
              <div className="rounded-lg border border-[#e5ebe8] bg-[#f7faf8] px-3 py-2">
                <p className="text-[#8a9a92]">Pending</p>
                <p className="text-[16px] font-semibold text-[#dc2626]">
                  {pendingApprovals.length}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="flex gap-1 overflow-x-auto">
              {tabs.map((t) => {
                const Icon = t.icon;
                const count =
                  t.id === "projects"
                    ? overview.projects.length
                    : t.id === "files"
                      ? overview.files.length
                      : t.id === "tasks"
                        ? overview.tasks.length
                        : overview.approvals.length;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13px] font-medium transition ${
                      tab === t.id
                        ? "bg-[#0a3d2e] text-white"
                        : "text-[#5a6b63] hover:bg-[#f0f5f2]"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {t.label}
                    <span
                      className={
                        tab === t.id ? "text-white/70" : "text-[#8a9a92]"
                      }
                    >
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="relative ml-auto min-w-[220px] flex-1 sm:max-w-xs">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8a9a92]" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${tab}…`}
                className="h-9 w-full rounded-full border border-[#dce5e0] bg-[#f7faf8] pr-4 pl-9 text-[13px] outline-none focus:border-[#0a3d2e]/40 focus:ring-2 focus:ring-[#0a3d2e]/10"
              />
            </div>
          </div>
        </div>

        <div className="px-6 pt-5">
          {tab === "projects" ? (
            filteredProjects.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#dce5e0] bg-white px-6 py-16 text-center">
                <FolderKanban className="mx-auto mb-3 h-8 w-8 text-[#c5d5cc]" />
                <p className="text-[14px] font-medium text-[#1a2e26]">
                  No projects found
                </p>
                <p className="mt-1 text-[13px] text-[#6b7c74]">
                  {query
                    ? "Try a different search."
                    : "This department has no projects yet."}
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )
          ) : null}

          {tab === "files" ? (
            <section className="overflow-hidden rounded-xl border border-[#e5ebe8] bg-white">
              {filteredFiles.length === 0 ? (
                <p className="px-4 py-12 text-center text-[13px] text-[#8a9a92]">
                  No files in this department.
                </p>
              ) : (
                <table className="w-full text-left text-[13px]">
                  <thead className="border-b border-[#eef2f0] bg-[#f7faf8] text-[11px] tracking-wide text-[#6b7c74] uppercase">
                    <tr>
                      <th className="px-4 py-3 font-semibold">File</th>
                      <th className="px-4 py-3 font-semibold">Project</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold">Version</th>
                      <th className="px-4 py-3 font-semibold">Updated</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eef2f0]">
                    {filteredFiles.map((file) => {
                      const project = overview.projects.find(
                        (p) => p.id === file.projectId
                      );
                      return (
                        <tr key={file.id} className="hover:bg-[#f7faf8]">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-[#0a3d2e]" />
                              <span className="font-medium text-[#1a2e26]">
                                {file.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            {project ? (
                              <Link
                                href={`/projects/${project.id}`}
                                className="font-medium text-[#0a3d2e] hover:underline"
                              >
                                {project.name}
                              </Link>
                            ) : (
                              <span className="text-[#8a9a92]">—</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-[#6b7c74]">
                            {file.status}
                          </td>
                          <td className="px-4 py-3 text-[#6b7c74]">
                            {file.version}
                          </td>
                          <td className="px-4 py-3 text-[#6b7c74]">
                            {file.updated}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </section>
          ) : null}

          {tab === "tasks" ? (
            <section className="rounded-xl border border-[#e5ebe8] bg-white">
              <ul className="divide-y divide-[#eef2f0]">
                {filteredTasks.length === 0 ? (
                  <li className="px-4 py-12 text-center text-[13px] text-[#8a9a92]">
                    No tasks in this department.
                  </li>
                ) : (
                  filteredTasks.map((task) => {
                    const project = overview.projects.find(
                      (p) => p.id === task.projectId
                    );
                    return (
                      <li
                        key={task.id}
                        className="flex items-center justify-between gap-3 px-4 py-3.5"
                      >
                        <div className="min-w-0">
                          <p className="text-[13px] font-medium text-[#1a2e26]">
                            {task.title}
                          </p>
                          <p className="text-[11px] text-[#6b7c74]">
                            {task.assignee} · Due {task.due} · {task.status}
                            {project ? (
                              <>
                                {" · "}
                                <Link
                                  href={`/projects/${project.id}`}
                                  className="font-medium text-[#0a3d2e] hover:underline"
                                >
                                  {project.name}
                                </Link>
                              </>
                            ) : null}
                          </p>
                        </div>
                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize ${
                            priorityStyles[task.priority]
                          }`}
                        >
                          {task.priority}
                        </span>
                      </li>
                    );
                  })
                )}
              </ul>
            </section>
          ) : null}

          {tab === "approvals" ? (
            <section className="rounded-xl border border-[#e5ebe8] bg-white">
              <ul className="divide-y divide-[#eef2f0]">
                {overview.approvals.length === 0 ? (
                  <li className="px-4 py-12 text-center text-[13px] text-[#8a9a92]">
                    No approvals for this department.
                  </li>
                ) : (
                  overview.approvals.map((item) => {
                    const project = overview.projects.find(
                      (p) => p.id === item.projectId
                    );
                    return (
                      <li
                        key={item.id}
                        className="flex items-center justify-between gap-3 px-4 py-3.5"
                      >
                        <div className="min-w-0">
                          <p className="text-[13px] font-medium text-[#1a2e26]">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-[#6b7c74]">
                            {item.subtitle}
                            {project ? (
                              <>
                                {" · "}
                                <Link
                                  href={`/projects/${project.id}`}
                                  className="font-medium text-[#0a3d2e] hover:underline"
                                >
                                  View project
                                </Link>
                              </>
                            ) : null}
                          </p>
                        </div>
                        <span
                          className={`shrink-0 rounded-md border px-2.5 py-1 text-[12px] font-semibold capitalize ${
                            item.action === "sign"
                              ? "border-[#fecaca] bg-[#fef2f2] text-[#dc2626]"
                              : item.action === "decide"
                                ? "border-[#fed7aa] bg-[#fff7ed] text-[#ea580c]"
                                : item.action === "review"
                                  ? "border-[#bfdbfe] bg-[#eff6ff] text-[#2563eb]"
                                  : "border-transparent bg-[#0d7a4f] text-white"
                          }`}
                        >
                          {item.action}
                        </span>
                      </li>
                    );
                  })
                )}
              </ul>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
