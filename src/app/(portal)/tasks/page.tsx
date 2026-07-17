import { TopBar } from "@/components/TopBar";
import { tasks } from "@/lib/data";

const priorityColor: Record<string, string> = {
  urgent: "bg-[#fef2f2] text-[#dc2626]",
  high: "bg-[#fff7ed] text-[#ea580c]",
  medium: "bg-[#eff6ff] text-[#2563eb]",
  low: "bg-[#f0f5f2] text-[#5a6b63]",
};

export default function TasksPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <TopBar title="Tasks & Action Items" />
      <div className="flex-1 overflow-y-auto p-6">
        <p className="mb-4 text-[14px] text-[#6b7c74]">
          Full task register across assignees and departments.
        </p>
        <div className="overflow-hidden rounded-xl border border-[#e5ebe8] bg-white">
          <table className="w-full text-left text-[13px]">
            <thead className="border-b border-[#eef2f0] bg-[#f7faf8] text-[11px] tracking-wide text-[#6b7c74] uppercase">
              <tr>
                <th className="px-4 py-3 font-semibold">Task</th>
                <th className="px-4 py-3 font-semibold">Assignee</th>
                <th className="px-4 py-3 font-semibold">Department</th>
                <th className="px-4 py-3 font-semibold">Priority</th>
                <th className="px-4 py-3 font-semibold">Due</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef2f0]">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-[#f7faf8]">
                  <td className="px-4 py-3 font-medium text-[#1a2e26]">{task.title}</td>
                  <td className="px-4 py-3 text-[#6b7c74]">{task.assignee}</td>
                  <td className="px-4 py-3 text-[#6b7c74]">{task.department}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize ${
                        priorityColor[task.priority]
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#6b7c74]">{task.due}</td>
                  <td className="px-4 py-3 text-[#6b7c74]">{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
