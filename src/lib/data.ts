import type {
  ApprovalItem,
  Department,
  FileItem,
  Meeting,
  Stat,
  TaskItem,
  TeamMember,
} from "./types";

export const departments: Department[] = [
  { id: "chiefs-office", name: "Chief's Office", taskCount: 18, icon: "landmark" },
  { id: "major-projects", name: "Major Projects", taskCount: 47, badge: 5, icon: "folder-kanban" },
  { id: "lands", name: "Lands", taskCount: 12, icon: "map" },
  { id: "forestry", name: "Forestry", taskCount: 8, icon: "trees" },
  { id: "housing", name: "Housing", taskCount: 6, icon: "home" },
  { id: "capital-projects", name: "Capital Projects", taskCount: 9, icon: "hard-hat" },
  { id: "finance", name: "Finance", taskCount: 4, icon: "wallet" },
];

export const sidebarNav = {
  departments: [
    { id: "chiefs-office", label: "Chief's Office", href: "/dashboard" },
    { id: "major-projects", label: "Major Projects", href: "/departments/major-projects", badge: 5 },
    { id: "lands", label: "Lands", href: "/departments/lands" },
    { id: "forestry", label: "Forestry", href: "/departments/forestry" },
    { id: "housing", label: "Housing", href: "/departments/housing" },
  ],
  operations: [
    { id: "capital-projects", label: "Capital Projects", href: "/departments/capital-projects" },
    { id: "finance", label: "Finance", href: "/finance" },
  ],
  office: [
    { id: "approvals", label: "Needs Approval", href: "/approvals", badge: 3 },
    { id: "files", label: "Documents", href: "/files" },
    { id: "tasks", label: "Tasks", href: "/tasks" },
    { id: "reports", label: "Reports", href: "/reports" },
    { id: "settings", label: "Settings", href: "/settings" },
  ],
};

export const stats: Stat[] = [
  {
    id: "active-files",
    label: "Active files",
    value: 12,
    subtitle: "All departments",
    icon: "folder",
    color: "green",
  },
  {
    id: "total-tasks",
    label: "Total tasks",
    value: 81,
    subtitle: "8 assignees",
    icon: "list",
    color: "blue",
  },
  {
    id: "urgent",
    label: "Urgent",
    value: 14,
    subtitle: "Action needed now",
    icon: "alert",
    color: "red",
  },
  {
    id: "high",
    label: "High priority",
    value: 28,
    subtitle: "This month",
    icon: "star",
    color: "orange",
  },
  {
    id: "completed",
    label: "Completed",
    value: 2,
    subtitle: "This cycle",
    icon: "check",
    color: "green",
  },
];

export const alertItems = [
  "TKN letter (Kemess North)",
  "FPX share-holding decision",
  "Pathways dispute resolution brief",
];

export const approvals: ApprovalItem[] = [
  {
    id: "a1",
    title: "TKN letter — Kemess North",
    subtitle: "Ready for Chief signature",
    action: "sign",
    icon: "pen",
    departmentId: "chiefs-office",
  },
  {
    id: "a2",
    title: "FPX — Share-holding decision",
    subtitle: "Decision required",
    action: "decide",
    icon: "dollar",
    departmentId: "chiefs-office",
  },
  {
    id: "a3",
    title: "Pathways — Dispute resolution brief",
    subtitle: "Review & approve",
    action: "review",
    icon: "file",
    departmentId: "chiefs-office",
  },
  {
    id: "a4",
    title: "Band Council Resolution — May",
    subtitle: "Signed May 5",
    action: "done",
    icon: "check",
    departmentId: "chiefs-office",
  },
  {
    id: "a5",
    title: "Housing — Allocation letter",
    subtitle: "Signed May 2",
    action: "done",
    icon: "check",
    departmentId: "housing",
  },
  {
    id: "a6",
    title: "Forestry — Cutting permit package",
    subtitle: "Ready for review",
    action: "review",
    icon: "file",
    departmentId: "forestry",
  },
  {
    id: "a7",
    title: "Lands — Referral response",
    subtitle: "Decision required",
    action: "decide",
    icon: "dollar",
    departmentId: "lands",
  },
  {
    id: "a8",
    title: "Major Projects — IBA amendment",
    subtitle: "Ready for Chief signature",
    action: "sign",
    icon: "pen",
    departmentId: "major-projects",
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "jf",
    name: "Chief French",
    role: "Chief's Office",
    initials: "JF",
    color: "#0d7a4f",
    urgentCount: 1,
    highCount: 4,
    taskCount: 18,
    tasks: [
      {
        id: "t1",
        title: "Kemess North — Final TKN letter",
        priority: "urgent",
        project: "Kemess North",
      },
      {
        id: "t2",
        title: "FPX — Share-holding decision",
        priority: "high",
        project: "FPX",
      },
      {
        id: "t3",
        title: "Pathways — Dispute resolution",
        priority: "high",
        project: "Pathways",
      },
    ],
  },
  {
    id: "tr",
    name: "Terry",
    role: "Executive Lead",
    initials: "TR",
    color: "#1a6b8a",
    urgentCount: 3,
    highCount: 0,
    taskCount: 8,
    tasks: [
      {
        id: "t4",
        title: "Aggregate bi-weekly progress updates",
        priority: "urgent",
      },
      {
        id: "t5",
        title: "Map historical files to departments",
        priority: "high",
      },
    ],
  },
  {
    id: "ev",
    name: "Evan",
    role: "Project Support",
    initials: "EV",
    color: "#6b5b95",
    urgentCount: 2,
    highCount: 0,
    taskCount: 6,
    tasks: [
      {
        id: "t6",
        title: "Upload Kemess supporting docs",
        priority: "urgent",
      },
    ],
  },
  {
    id: "sc",
    name: "Scott",
    role: "Lands",
    initials: "SC",
    color: "#8a6d1a",
    urgentCount: 1,
    highCount: 0,
    taskCount: 5,
    tasks: [
      {
        id: "t7",
        title: "Flag referral for Chief attention",
        priority: "urgent",
      },
    ],
  },
  {
    id: "mk",
    name: "Maria",
    role: "Housing",
    initials: "MK",
    color: "#8a3a5c",
    urgentCount: 0,
    highCount: 2,
    taskCount: 4,
    tasks: [
      {
        id: "t8",
        title: "Allocation waitlist update",
        priority: "high",
      },
    ],
  },
  {
    id: "dl",
    name: "Daniel",
    role: "Forestry",
    initials: "DL",
    color: "#2d6a4f",
    urgentCount: 1,
    highCount: 1,
    taskCount: 7,
    tasks: [
      {
        id: "t9",
        title: "Cutting permit package",
        priority: "urgent",
      },
    ],
  },
];

export const meetings: Meeting[] = [
  {
    id: "m1",
    dateLabel: "13 MAY",
    title: "Kemess North — Final TKN letter",
    detail: "Signature package review",
    leads: "Leads: Terry · Evan",
    status: "TBC",
    departmentId: "chiefs-office",
  },
  {
    id: "m2",
    dateLabel: "NEXT WK",
    title: "FPX share-holding discussion",
    detail: "Board decision briefing",
    leads: "Leads: Terry · Finance",
    status: "TBC",
    departmentId: "chiefs-office",
  },
  {
    id: "m3",
    dateLabel: "20 MAY",
    title: "Pathways dispute resolution",
    detail: "Legal & department sync",
    leads: "Leads: Terry · Lands",
    status: "TBC",
    departmentId: "lands",
  },
  {
    id: "m4",
    dateLabel: "22 MAY",
    title: "Housing allocation review",
    detail: "Waitlist & unit assignments",
    leads: "Leads: Maria · Chief",
    status: "TBC",
    departmentId: "housing",
  },
  {
    id: "m5",
    dateLabel: "27 MAY",
    title: "Capital projects status",
    detail: "Q2 budget checkpoint",
    leads: "Leads: Finance · Capital",
    status: "TBC",
    departmentId: "capital-projects",
  },
  {
    id: "m6",
    dateLabel: "03 JUN",
    title: "Forestry permit briefing",
    detail: "Cutting permit package",
    leads: "Leads: Daniel · Chief",
    status: "TBC",
    departmentId: "forestry",
  },
];

export const files: FileItem[] = [
  {
    id: "f1",
    name: "TKN Letter — Kemess North.pdf",
    department: "Chief's Office",
    status: "Awaiting signature",
    updated: "May 7, 2026",
    owner: "Terry",
    version: "v3.2",
  },
  {
    id: "f2",
    name: "FPX Share-holding Brief.docx",
    department: "Major Projects",
    status: "In review",
    updated: "May 6, 2026",
    owner: "Evan",
    version: "v1.4",
  },
  {
    id: "f3",
    name: "Pathways Dispute Resolution.pdf",
    department: "Lands",
    status: "Needs approval",
    updated: "May 5, 2026",
    owner: "Scott",
    version: "v2.0",
  },
  {
    id: "f4",
    name: "Band Council Resolution — May.pdf",
    department: "Chief's Office",
    status: "Signed",
    updated: "May 5, 2026",
    owner: "Chief French",
    version: "v1.0",
  },
  {
    id: "f5",
    name: "Housing Allocation Letter.pdf",
    department: "Housing",
    status: "Signed",
    updated: "May 2, 2026",
    owner: "Maria",
    version: "v1.1",
  },
  {
    id: "f6",
    name: "Q2 Capital Budget.xlsx",
    department: "Finance",
    status: "Active",
    updated: "May 1, 2026",
    owner: "Finance",
    version: "v4.0",
  },
  {
    id: "f7",
    name: "Forestry Cutting Permit Package.pdf",
    department: "Forestry",
    status: "Draft",
    updated: "Apr 28, 2026",
    owner: "Daniel",
    version: "v0.9",
  },
  {
    id: "f8",
    name: "IBA Amendment — Major Projects.pdf",
    department: "Major Projects",
    status: "Awaiting signature",
    updated: "Apr 25, 2026",
    owner: "Terry",
    version: "v2.1",
  },
];

export const tasks: TaskItem[] = [
  {
    id: "tk1",
    title: "Kemess North — Final TKN letter",
    assignee: "Chief French",
    department: "Chief's Office",
    priority: "urgent",
    due: "May 13, 2026",
    status: "In progress",
  },
  {
    id: "tk2",
    title: "FPX — Share-holding decision",
    assignee: "Chief French",
    department: "Major Projects",
    priority: "high",
    due: "May 15, 2026",
    status: "Pending",
  },
  {
    id: "tk3",
    title: "Aggregate bi-weekly progress updates",
    assignee: "Terry",
    department: "Major Projects",
    priority: "urgent",
    due: "May 10, 2026",
    status: "In progress",
  },
  {
    id: "tk4",
    title: "Upload Kemess supporting docs",
    assignee: "Evan",
    department: "Major Projects",
    priority: "urgent",
    due: "May 9, 2026",
    status: "In progress",
  },
  {
    id: "tk5",
    title: "Flag referral for Chief attention",
    assignee: "Scott",
    department: "Lands",
    priority: "urgent",
    due: "May 12, 2026",
    status: "Pending",
  },
  {
    id: "tk6",
    title: "Allocation waitlist update",
    assignee: "Maria",
    department: "Housing",
    priority: "high",
    due: "May 18, 2026",
    status: "In progress",
  },
  {
    id: "tk7",
    title: "Cutting permit package",
    assignee: "Daniel",
    department: "Forestry",
    priority: "urgent",
    due: "May 20, 2026",
    status: "Draft",
  },
  {
    id: "tk8",
    title: "Q2 budget variance report",
    assignee: "Finance",
    department: "Finance",
    priority: "high",
    due: "May 22, 2026",
    status: "Pending",
  },
];

export const currentUser = {
  name: "Chief French",
  role: "Chief's Office",
  initials: "JF",
  email: "chief.french@takla.ca",
};

export function getDepartmentStats(departmentId: string) {
  const dept = departments.find((d) => d.id === departmentId);
  const deptApprovals = approvals.filter(
    (a) => a.departmentId === departmentId && a.action !== "done"
  );
  const deptMeetings = meetings.filter((m) => m.departmentId === departmentId);
  return {
    department: dept,
    pendingApprovals: deptApprovals.length,
    meetings: deptMeetings.length,
    tasks: dept?.taskCount ?? 0,
  };
}
