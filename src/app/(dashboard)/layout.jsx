import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-80 min-h-screen bg-[#0a0a0a]">
        {children}
      </main>
    </div>
  );
}
