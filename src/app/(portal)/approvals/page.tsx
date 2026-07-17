import { TopBar } from "@/components/TopBar";
import { ApprovalList } from "@/components/ApprovalList";
import { approvals } from "@/lib/data";

export default function ApprovalsPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <TopBar title="Needs Approval" />
      <div className="flex-1 overflow-y-auto p-6">
        <p className="mb-4 text-[14px] text-[#6b7c74]">
          Digital signatures and executive approvals across all departments.
        </p>
        <div className="max-w-3xl">
          <ApprovalList items={approvals} />
        </div>
      </div>
    </div>
  );
}
