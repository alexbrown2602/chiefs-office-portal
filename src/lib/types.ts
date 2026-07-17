export type Priority = "urgent" | "high" | "medium" | "low";
export type ApprovalAction = "sign" | "decide" | "review" | "done";
export type ProjectStatus = "active" | "on-hold" | "completed" | "at-risk";

export interface Department {
  id: string;
  name: string;
  taskCount: number;
  badge?: number;
  icon: string;
}

export interface Project {
  id: string;
  name: string;
  departmentId: string;
  status: ProjectStatus;
  lead: string;
  priority: Priority;
  progress: number;
  due: string;
  summary: string;
  taskCount: number;
  fileCount: number;
  description?: string;
  started?: string;
  stakeholders?: string[];
}

export interface ProjectMessage {
  id: string;
  projectId: string;
  author: string;
  initials: string;
  role: string;
  body: string;
  timestamp: string;
}

export interface ProjectNote {
  id: string;
  projectId: string;
  author: string;
  title: string;
  body: string;
  updated: string;
  pinned?: boolean;
}

export interface ProjectActivity {
  id: string;
  projectId: string;
  type: "file" | "task" | "message" | "note" | "approval" | "status" | "meeting";
  actor: string;
  summary: string;
  timestamp: string;
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  subtitle: string;
  icon: string;
  color: string;
}

export interface ApprovalItem {
  id: string;
  title: string;
  subtitle: string;
  action: ApprovalAction;
  icon: string;
  departmentId: string;
  projectId?: string;
}

export interface TeamTask {
  id: string;
  title: string;
  priority: Priority;
  project?: string;
  departmentId?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: string;
  departmentIds: string[];
  urgentCount: number;
  highCount: number;
  taskCount: number;
  tasks: TeamTask[];
}

export interface Meeting {
  id: string;
  dateLabel: string;
  dateSub?: string;
  title: string;
  detail: string;
  leads: string;
  status: string;
  departmentId: string;
  projectId?: string;
}

export interface FileItem {
  id: string;
  name: string;
  department: string;
  departmentId: string;
  status: string;
  updated: string;
  owner: string;
  version: string;
  projectId?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  assignee: string;
  department: string;
  departmentId: string;
  priority: Priority;
  due: string;
  status: string;
  projectId?: string;
}
