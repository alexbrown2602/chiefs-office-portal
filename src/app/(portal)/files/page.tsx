import { FileText, Upload } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { files } from "@/lib/data";

const statusColor: Record<string, string> = {
  "Awaiting signature": "bg-[#fef2f2] text-[#dc2626]",
  "In review": "bg-[#eff6ff] text-[#2563eb]",
  "Needs approval": "bg-[#fff7ed] text-[#ea580c]",
  Signed: "bg-[#e8f5ef] text-[#0d7a4f]",
  Active: "bg-[#e8f5ef] text-[#0d7a4f]",
  Draft: "bg-[#f0f5f2] text-[#5a6b63]",
};

export default function FilesPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <TopBar title="Document Repository" />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[14px] text-[#6b7c74]">
            Centralized files with version history across all departments.
          </p>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-[#0a3d2e] px-3.5 py-2 text-[13px] font-semibold text-white hover:bg-[#0d4a38]"
          >
            <Upload className="h-4 w-4" />
            Upload document
          </button>
        </div>
        <div className="overflow-hidden rounded-xl border border-[#e5ebe8] bg-white">
          <table className="w-full text-left text-[13px]">
            <thead className="border-b border-[#eef2f0] bg-[#f7faf8] text-[11px] tracking-wide text-[#6b7c74] uppercase">
              <tr>
                <th className="px-4 py-3 font-semibold">File</th>
                <th className="px-4 py-3 font-semibold">Department</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Version</th>
                <th className="px-4 py-3 font-semibold">Owner</th>
                <th className="px-4 py-3 font-semibold">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef2f0]">
              {files.map((file) => (
                <tr key={file.id} className="hover:bg-[#f7faf8]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-[#0a3d2e]" />
                      <span className="font-medium text-[#1a2e26]">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#6b7c74]">{file.department}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        statusColor[file.status] ?? "bg-[#f0f5f2] text-[#5a6b63]"
                      }`}
                    >
                      {file.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#6b7c74]">{file.version}</td>
                  <td className="px-4 py-3 text-[#6b7c74]">{file.owner}</td>
                  <td className="px-4 py-3 text-[#6b7c74]">{file.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
