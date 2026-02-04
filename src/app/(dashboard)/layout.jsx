"use client";

import Sidebar from "@/components/Sidebar";
import bg from "../../images/dashboard.jpg";
import { HiMenuAlt2 } from "react-icons/hi";
import { useState } from "react";
import { FaBookBookmark } from "react-icons/fa6";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full flex bg-black overflow-hidden">
      {/* Global Fixed Background */}
      <div className="fixed inset-0 z-0 bg-no-repeat bg-[url('../images/dashboard.jpg')] bg-cover bg-center" />
      {/* <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: `url(${bg.src})` }}
      ></div> */}

      {/* Dark Gradient Overlay */}
      <div className="fixed inset-0 z-10 bg-linear-to-r from-black/70 via-black/20 to-transparent pointer-events-none " />

      {/* The Sidebar */}
      <div className="hidden lg:block relative z-30">
        <Sidebar />
      </div>

      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
          <div className="relative z-50 w-80 h-full">
            <Sidebar />
          </div>
        </div>
      )}

      {/* another togglable sidebar for screen below md */}
      <div className="lg:hidden fixed top-0 left-0 w-full z-40 flex items-center justify-between p-4 bg-black/40 backdrop-blur-md border-b border-white/5 min-w-[320px]">
        <div className="flex items-center gap-3">
          <FaBookBookmark
            className="text-amber-100 drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]"
            size={30}
          />
          <h1 className="font-bold text-2xl text-white tracking-tight">
            Ink2Image
          </h1>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-gray-400 hover:text-amber-500 transition-colors"
        >
          <HiMenuAlt2 size={28} className="text-amber-100" />
        </button>
      </div>
      {/* Main Content Area */}
      <main className="relative z-20 flex flex-1 mt-20 lg:mt-0 ml-0 lg:ml-80 min-h-screen p-4 sm:p-4 overflow-x-auto">
        <div className="max-w-[1600px] min-w-[320px] w-full mx-auto flex-1 flex flex-col">{children}</div>
      </main>
    </div>
  );
}
