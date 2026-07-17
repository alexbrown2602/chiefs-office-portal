"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  FileText,
  Flag,
  MessageSquare,
  NotebookPen,
  StickyNote,
  Upload,
  Users,
} from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { ApprovalList } from "@/components/ApprovalList";
import { UpcomingMeetings } from "@/components/UpcomingMeetings";
import {
  departments,
  getApprovalsByProject,
  getFilesByProject,
  getMeetingsByProject,
  getProjectById,
  getTasksByProject,
} from "@/lib/data";
import {
  getActivitiesForProject,
  getMessagesForProject,
  getNotesForProject,
} from "@/lib/project-details";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "files", label: "Files" },
  { id: "tasks", label: "Tasks" },
  { id: "messages", label: "Messages" },
  { id: "notes", label: "Notes" },
  { id: "activity", label: "Activity" },
] as const;

type TabId = (typeof tabs)[number]["id"];

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

const activityIcon: Record<string, React.ElementType> = {
  file: FileText,
  task: CheckCircle2,
  message: MessageSquare,
  note: StickyNote,
  approval: CheckCircle2,
  status: Flag,
  meeting: Calendar,
};

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = String(params.id ?? "");
  const [tab, setTab] = useState<TabId>("overview");
  const [draftMessage, setDraftMessage] = useState("");
  const [draftNote, setDraftNote] = useState({ title: "", body: "" });

  const project = useMemo(() => getProjectById(projectId), [projectId]);
  const department = departments.find((d) => d.id === project?.departmentId);
  const projectFiles = useMemo(() => getFilesByProject(projectId), [projectId]);
  const projectTasks = useMemo(() => getTasksByProject(projectId), [projectId]);
  const projectApprovals = useMemo(
    () => getApprovalsByProject(projectId),
    [projectId]
  );
  const projectMeetings = useMemo(
    () => getMeetingsByProject(projectId),
    [projectId]
  );
  const messages = useMemo(() => getMessagesForProject(projectId), [projectId]);
  const notes = useMemo(() => getNotesForProject(projectId), [projectId]);
  const activities = useMemo(
    () => getActivitiesForProject(projectId),
    [projectId]
  );

  if (!project) {
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <TopBar title="Project not found" />
        <div className="p-6">
          <p className="text-[14px] text-[#6b7c74]">
            This project does not exist.
          </p>
          <Link
            href="/dashboard"
            className="mt-3 inline-flex text-[13px] font-medium text-[#0a3d2e] hover:underline"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  const backHref =
    project.departmentId === "finance"
      ? "/finance"
      : `/departments/${project.departmentId}`;

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <TopBar title={project.name} period={department?.name ?? "Project"} />
      <div className="flex-1 overflow-y-auto pb-8">
        <div className="border-b border-[#e5ebe8] bg-white px-6 py-4">
          <Link
            href={backHref}
            className="mb-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-[#0a3d2e] hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to {department?.name ?? "department"}
          </Link>

          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-[22px] font-semibold tracking-tight text-[#1a2e26]">
                  {project.name}
                </h2>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${
                    statusStyles[project.status]
                  }`}
                >
                  {project.status.replace("-", " ")}
                </span>
                <span
                  className={`inline-flex items-center gap-1 text-[12px] font-medium capitalize ${
                    priorityColor[project.priority]
                  }`}
                >
                  <Flag className="h-3.5 w-3.5" />
                  {project.priority}
                </span>
              </div>
              <p className="mt-2 text-[14px] leading-relaxed text-[#5a6b63]">
                {project.description ?? project.summary}
              </p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-[#6b7c74]">
                <span>Lead: {project.lead}</span>
                {project.started ? <span>Started {project.started}</span> : null}
                <span>Due {project.due}</span>
                <span>
                  {projectFiles.length || project.fileCount} files ·{" "}
                  {projectTasks.length || project.taskCount} tasks
                </span>
              </div>
            </div>

            <div className="w-full max-w-[220px] rounded-xl border border-[#e5ebe8] bg-[#f7faf8] p-3">
              <div className="mb-1 flex items-center justify-between text-[12px]">
                <span className="text-[#6b7c74]">Progress</span>
                <span className="font-semibold text-[#1a2e26]">
                  {project.progress}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#e5ebe8]">
                <div
                  className="h-full rounded-full bg-[#0a3d2e]"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 flex gap-1 overflow-x-auto border-t border-[#eef2f0] pt-3">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`shrink-0 rounded-lg px-3.5 py-2 text-[13px] font-medium transition ${
                  tab === t.id
                    ? "bg-[#0a3d2e] text-white"
                    : "text-[#5a6b63] hover:bg-[#f0f5f2]"
                }`}
              >
                {t.label}
                {t.id === "files" ? ` (${projectFiles.length})` : null}
                {t.id === "tasks" ? ` (${projectTasks.length})` : null}
                {t.id === "messages" ? ` (${messages.length})` : null}
                {t.id === "notes" ? ` (${notes.length})` : null}
              </button>
            ))}
          </div>
        </div>

        <div className="px-6 pt-5">
          {tab === "overview" ? (
            <div className="grid gap-4 xl:grid-cols-3">
              <div className="space-y-4 xl:col-span-2">
                <section className="rounded-xl border border-[#e5ebe8] bg-white p-5">
                  <h3 className="mb-3 text-[14px] font-semibold text-[#1a2e26]">
                    Project details
                  </h3>
                  <dl className="grid gap-3 sm:grid-cols-2">
                    {[
                      ["Department", department?.name ?? "—"],
                      ["Lead", project.lead],
                      ["Status", project.status.replace("-", " ")],
                      ["Priority", project.priority],
                      ["Started", project.started ?? "—"],
                      ["Due", project.due],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-[11px] tracking-wide text-[#8a9a92] uppercase">
                          {label}
                        </dt>
                        <dd className="mt-0.5 text-[13px] font-medium capitalize text-[#1a2e26]">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  {project.stakeholders?.length ? (
                    <div className="mt-4 border-t border-[#eef2f0] pt-4">
                      <p className="mb-2 flex items-center gap-1.5 text-[12px] font-semibold text-[#1a2e26]">
                        <Users className="h-3.5 w-3.5" />
                        Stakeholders
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.stakeholders.map((s) => (
                          <span
                            key={s}
                            className="rounded-full bg-[#f0f5f2] px-2.5 py-1 text-[12px] text-[#0a3d2e]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </section>

                <section className="rounded-xl border border-[#e5ebe8] bg-white p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-[14px] font-semibold text-[#1a2e26]">
                      Recent activity
                    </h3>
                    <button
                      type="button"
                      onClick={() => setTab("activity")}
                      className="text-[12px] font-medium text-[#0a3d2e] hover:underline"
                    >
                      View all
                    </button>
                  </div>
                  <ul className="space-y-3">
                    {activities.slice(0, 5).map((item) => {
                      const Icon = activityIcon[item.type] ?? Flag;
                      return (
                        <li key={item.id} className="flex gap-3">
                          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f0f5f2]">
                            <Icon className="h-4 w-4 text-[#0a3d2e]" />
                          </div>
                          <div>
                            <p className="text-[13px] text-[#1a2e26]">
                              <span className="font-medium">{item.actor}</span>{" "}
                              {item.summary}
                            </p>
                            <p className="text-[11px] text-[#8a9a92]">
                              {item.timestamp}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              </div>

              <div className="space-y-4">
                <ApprovalList items={projectApprovals} />
                <UpcomingMeetings meetings={projectMeetings} />
              </div>
            </div>
          ) : null}

          {tab === "files" ? (
            <section className="overflow-hidden rounded-xl border border-[#e5ebe8] bg-white">
              <div className="flex items-center justify-between border-b border-[#eef2f0] px-4 py-3">
                <h3 className="text-[14px] font-semibold text-[#1a2e26]">
                  Files & versions
                </h3>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#0a3d2e] px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-[#0d4a38]"
                >
                  <Upload className="h-3.5 w-3.5" />
                  Upload
                </button>
              </div>
              {projectFiles.length === 0 ? (
                <p className="px-4 py-10 text-center text-[13px] text-[#8a9a92]">
                  No files linked to this project yet.
                </p>
              ) : (
                <table className="w-full text-left text-[13px]">
                  <thead className="border-b border-[#eef2f0] bg-[#f7faf8] text-[11px] tracking-wide text-[#6b7c74] uppercase">
                    <tr>
                      <th className="px-4 py-3 font-semibold">File</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold">Version</th>
                      <th className="px-4 py-3 font-semibold">Owner</th>
                      <th className="px-4 py-3 font-semibold">Updated</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eef2f0]">
                    {projectFiles.map((file) => (
                      <tr key={file.id} className="hover:bg-[#f7faf8]">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-[#0a3d2e]" />
                            <span className="font-medium text-[#1a2e26]">
                              {file.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-[#6b7c74]">{file.status}</td>
                        <td className="px-4 py-3 text-[#6b7c74]">{file.version}</td>
                        <td className="px-4 py-3 text-[#6b7c74]">{file.owner}</td>
                        <td className="px-4 py-3 text-[#6b7c74]">{file.updated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          ) : null}

          {tab === "tasks" ? (
            <section className="rounded-xl border border-[#e5ebe8] bg-white">
              <div className="border-b border-[#eef2f0] px-4 py-3">
                <h3 className="text-[14px] font-semibold text-[#1a2e26]">
                  Tasks & action items
                </h3>
              </div>
              <ul className="divide-y divide-[#eef2f0]">
                {projectTasks.length === 0 ? (
                  <li className="px-4 py-10 text-center text-[13px] text-[#8a9a92]">
                    No tasks linked to this project yet.
                  </li>
                ) : (
                  projectTasks.map((task) => (
                    <li
                      key={task.id}
                      className="flex items-center justify-between gap-3 px-4 py-3"
                    >
                      <div className="min-w-0">
                        <p className="text-[13px] font-medium text-[#1a2e26]">
                          {task.title}
                        </p>
                        <p className="text-[11px] text-[#6b7c74]">
                          {task.assignee} · Due {task.due} · {task.status}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize ${
                          task.priority === "urgent"
                            ? "bg-[#fef2f2] text-[#dc2626]"
                            : "bg-[#fff7ed] text-[#ea580c]"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </li>
                  ))
                )}
              </ul>
            </section>
          ) : null}

          {tab === "messages" ? (
            <div className="mx-auto max-w-3xl space-y-4">
              <section className="rounded-xl border border-[#e5ebe8] bg-white p-4">
                <label className="mb-2 block text-[12px] font-semibold text-[#1a2e26]">
                  New message
                </label>
                <textarea
                  value={draftMessage}
                  onChange={(e) => setDraftMessage(e.target.value)}
                  rows={3}
                  placeholder="Write an update or ask a question…"
                  className="w-full resize-none rounded-lg border border-[#dce5e0] px-3 py-2 text-[13px] outline-none focus:border-[#0a3d2e] focus:ring-2 focus:ring-[#0a3d2e]/15"
                />
                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    className="rounded-lg bg-[#0a3d2e] px-3.5 py-2 text-[12px] font-semibold text-white hover:bg-[#0d4a38]"
                  >
                    Send message
                  </button>
                </div>
              </section>
              <ul className="space-y-3">
                {messages.map((msg) => (
                  <li
                    key={msg.id}
                    className="rounded-xl border border-[#e5ebe8] bg-white p-4"
                  >
                    <div className="mb-2 flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0a3d2e] text-[11px] font-semibold text-white">
                        {msg.initials}
                      </span>
                      <div>
                        <p className="text-[13px] font-semibold text-[#1a2e26]">
                          {msg.author}
                          <span className="ml-2 text-[11px] font-normal text-[#8a9a92]">
                            {msg.role}
                          </span>
                        </p>
                        <p className="text-[11px] text-[#8a9a92]">
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                    <p className="text-[13px] leading-relaxed text-[#1a2e26]">
                      {msg.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {tab === "notes" ? (
            <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
              <ul className="space-y-3">
                {notes.map((note) => (
                  <li
                    key={note.id}
                    className="rounded-xl border border-[#e5ebe8] bg-white p-4"
                  >
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <NotebookPen className="h-4 w-4 text-[#0a3d2e]" />
                        <h4 className="text-[14px] font-semibold text-[#1a2e26]">
                          {note.title}
                        </h4>
                        {note.pinned ? (
                          <span className="rounded bg-[#fff8e6] px-1.5 py-0.5 text-[10px] font-semibold text-[#c4880a]">
                            Pinned
                          </span>
                        ) : null}
                      </div>
                      <span className="text-[11px] text-[#8a9a92]">
                        {note.updated}
                      </span>
                    </div>
                    <p className="whitespace-pre-line text-[13px] leading-relaxed text-[#5a6b63]">
                      {note.body}
                    </p>
                    <p className="mt-2 text-[11px] text-[#8a9a92]">
                      By {note.author}
                    </p>
                  </li>
                ))}
              </ul>
              <section className="h-fit rounded-xl border border-[#e5ebe8] bg-white p-4">
                <h3 className="mb-3 text-[14px] font-semibold text-[#1a2e26]">
                  Add note
                </h3>
                <input
                  value={draftNote.title}
                  onChange={(e) =>
                    setDraftNote((n) => ({ ...n, title: e.target.value }))
                  }
                  placeholder="Title"
                  className="mb-2 h-10 w-full rounded-lg border border-[#dce5e0] px-3 text-[13px] outline-none focus:border-[#0a3d2e]"
                />
                <textarea
                  value={draftNote.body}
                  onChange={(e) =>
                    setDraftNote((n) => ({ ...n, body: e.target.value }))
                  }
                  rows={5}
                  placeholder="Working notes, decisions, follow-ups…"
                  className="w-full resize-none rounded-lg border border-[#dce5e0] px-3 py-2 text-[13px] outline-none focus:border-[#0a3d2e]"
                />
                <button
                  type="button"
                  className="mt-2 w-full rounded-lg bg-[#0a3d2e] px-3 py-2 text-[12px] font-semibold text-white hover:bg-[#0d4a38]"
                >
                  Save note
                </button>
              </section>
            </div>
          ) : null}

          {tab === "activity" ? (
            <section className="mx-auto max-w-3xl rounded-xl border border-[#e5ebe8] bg-white p-5">
              <h3 className="mb-4 text-[14px] font-semibold text-[#1a2e26]">
                Activity timeline
              </h3>
              <ol className="relative space-y-4 border-l border-[#e5ebe8] pl-5">
                {activities.map((item) => {
                  const Icon = activityIcon[item.type] ?? Flag;
                  return (
                    <li key={item.id} className="relative">
                      <span className="absolute -left-[27px] flex h-7 w-7 items-center justify-center rounded-full border border-[#e5ebe8] bg-white">
                        <Icon className="h-3.5 w-3.5 text-[#0a3d2e]" />
                      </span>
                      <p className="text-[13px] text-[#1a2e26]">
                        <span className="font-medium">{item.actor}</span>{" "}
                        {item.summary}
                      </p>
                      <p className="text-[11px] text-[#8a9a92]">
                        {item.timestamp}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
