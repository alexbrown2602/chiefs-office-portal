export type Priority = "urgent" | "high" | "medium" | "low";
export type ApprovalAction = "sign" | "decide" | "review" | "done";

export interface Department {
  id: string;
  name: string;
  taskCount: number;
  badge?: number;
  icon: string;
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
}

export interface TeamTask {
  id: string;
  title: string;
  priority: Priority;
  project?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: string;
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
}

export interface FileItem {
  id: string;
  name: string;
  department: string;
  status: string;
  updated: string;
  owner: string;
  version: string;
}

export interface TaskItem {
  id: string;
  title: string;
  assignee: string;
  department: string;
  priority: Priority;
  due: string;
  status: string;
}
