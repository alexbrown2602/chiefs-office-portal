import {
  BarChart3,
  DollarSign,
  FileCheck2,
  FolderOpen,
  TrendingUp,
} from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { departments, stats } from "@/lib/data";

export default function ReportsPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <TopBar title="Reports & Analytics" />
      <div className="flex-1 overflow-y-auto p-6">
        <p className="mb-6 text-[14px] text-[#6b7c74]">
          Executive reporting across projects, approvals, and department workload.
        </p>
        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Files this month", value: "12", icon: FolderOpen, change: "+3" },
            { label: "Approvals completed", value: "2", icon: FileCheck2, change: "+2" },
            { label: "Task completion rate", value: "68%", icon: TrendingUp, change: "+5%" },
            { label: "Budget variance", value: "−2.1%", icon: DollarSign, change: "On track" },
          ].map((card) => (
            <div
              key={card.label}
              className="rounded-xl border border-[#e5ebe8] bg-white p-4 shadow-[0_1px_2px_rgba(10,61,46,0.04)]"
            >
              <div className="mb-3 flex items-center justify-between">
                <card.icon className="h-5 w-5 text-[#0a3d2e]" />
                <span className="text-[11px] font-medium text-[#0d7a4f]">{card.change}</span>
              </div>
              <p className="text-[22px] font-semibold text-[#1a2e26]">{card.value}</p>
              <p className="text-[12px] text-[#6b7c74]">{card.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <section className="rounded-xl border border-[#e5ebe8] bg-white p-5">
            <div className="mb-4 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-[#0a3d2e]" />
              <h2 className="text-[14px] font-semibold text-[#1a2e26]">
                Tasks by department
              </h2>
            </div>
            <ul className="space-y-3">
              {departments.map((dept) => (
                <li key={dept.id}>
                  <div className="mb-1 flex justify-between text-[12px]">
                    <span className="font-medium text-[#1a2e26]">{dept.name}</span>
                    <span className="text-[#6b7c74]">{dept.taskCount}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#eef2f0]">
                    <div
                      className="h-full rounded-full bg-[#0a3d2e]"
                      style={{ width: `${Math.min(100, (dept.taskCount / 50) * 100)}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-[#e5ebe8] bg-white p-5">
            <h2 className="mb-4 text-[14px] font-semibold text-[#1a2e26]">
              Priority overview
            </h2>
            <ul className="space-y-3">
              {stats.slice(2).map((s) => (
                <li
                  key={s.id}
                  className="flex items-center justify-between rounded-lg border border-[#eef2f0] px-4 py-3"
                >
                  <div>
                    <p className="text-[13px] font-medium text-[#1a2e26]">{s.label}</p>
                    <p className="text-[11px] text-[#6b7c74]">{s.subtitle}</p>
                  </div>
                  <p className="text-[20px] font-semibold text-[#1a2e26]">{s.value}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
