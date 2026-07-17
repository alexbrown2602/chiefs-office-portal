import { AuthGuard } from "@/components/AuthGuard";
import { AIChatbot } from "@/components/AIChatbot";
import { Sidebar } from "@/components/Sidebar";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex h-screen overflow-hidden bg-[#f4f7f6]">
        <Sidebar />
        <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {children}
        </main>
        <AIChatbot />
      </div>
    </AuthGuard>
  );
}
