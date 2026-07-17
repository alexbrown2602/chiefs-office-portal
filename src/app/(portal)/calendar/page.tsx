import { TopBar } from "@/components/TopBar";
import { UpcomingMeetings } from "@/components/UpcomingMeetings";
import { meetings } from "@/lib/data";

export default function CalendarPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <TopBar title="Calendar & Meetings" />
      <div className="flex-1 overflow-y-auto p-6">
        <p className="mb-4 text-[14px] text-[#6b7c74]">
          Meeting scheduling and upcoming executive briefings.
        </p>
        <div className="max-w-2xl">
          <UpcomingMeetings meetings={meetings} />
        </div>
      </div>
    </div>
  );
}
