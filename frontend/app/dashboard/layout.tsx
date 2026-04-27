import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = getSession();
  if (!session) redirect("/iniciar-sesion");

  return (
    <div className="flex h-screen overflow-hidden bg-space-900">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar userEmail={session.email} userName={session.name} />
        <main className="flex-1 overflow-y-auto bg-space-grid [background-size:52px_52px] p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
