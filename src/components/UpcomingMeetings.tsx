import Link from "next/link";
import type { Meeting } from "@/lib/types";

export function UpcomingMeetings({ meetings }: { meetings: Meeting[] }) {
  return (
    <section className="flex min-h-0 flex-1 flex-col rounded-xl border border-[#e5ebe8] bg-white shadow-[0_1px_2px_rgba(10,61,46,0.04)]">
      <div className="flex items-center justify-between border-b border-[#eef2f0] px-4 py-3">
        <h2 className="text-[14px] font-semibold text-[#1a2e26]">Upcoming Meetings</h2>
        <Link href="/calendar" className="text-[12px] font-medium text-[#0a3d2e] hover:underline">
          Calendar
        </Link>
      </div>
      <ul className="divide-y divide-[#eef2f0] overflow-y-auto">
        {meetings.map((meeting) => (
          <li key={meeting.id} className="flex items-start gap-3 px-4 py-3.5">
            <div className="w-14 shrink-0">
              <p className="text-[12px] font-bold tracking-wide text-[#0a3d2e]">
                {meeting.dateLabel}
              </p>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium text-[#1a2e26]">{meeting.title}</p>
              <p className="text-[11px] text-[#6b7c74]">{meeting.detail}</p>
              <p className="mt-0.5 text-[11px] text-[#8a9a92]">{meeting.leads}</p>
            </div>
            <span className="shrink-0 rounded bg-[#f0f5f2] px-2 py-0.5 text-[10px] font-semibold tracking-wide text-[#5a6b63]">
              {meeting.status}
            </span>
          </li>
        ))}
        {meetings.length === 0 ? (
          <li className="px-4 py-8 text-center text-[13px] text-[#8a9a92]">
            No upcoming meetings for this department.
          </li>
        ) : null}
      </ul>
    </section>
  );
}
