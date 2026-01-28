"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { FaBookBookmark } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { MdOutlineFileUpload } from "react-icons/md";
import { IoLibraryOutline, IoSettingsOutline } from "react-icons/io5";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  const navItems = [
    { name: "Library", href: "/dashboard", icon: IoLibraryOutline },
    { name: "Upload", href: "/upload", icon: MdOutlineFileUpload },
    { name: "Settings", href: "/settings", icon: IoSettingsOutline },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-80 flex flex-col items-center py-7 px-4 bg-black/20 backdrop-blur-3xl z-50 border-r border-amber-600/10 shadow-[20px_0_60px_rgba(0,0,0,0.4)]">
      {/* Brand Logo - Integrated Amber Glow */}
      <div className="mb-20 flex items-center w-full px-4">
        <div className="flex items-center gap-3">
          <FaBookBookmark className="text-amber-100 drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]" size={30} />
          <h1 className="font-bold text-3xl text-white tracking-tight">Ink2Image</h1>
        </div>
      </div>

      {/* Navigation - Warm Selection States */}
      <nav className="flex flex-col gap-3 mt-5 w-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group relative flex gap-4 items-center p-4 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-amber-500/15 text-amber-400 shadow-[inset_0_0_20px_rgba(245,158,11,0.05)]"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={26} />
              <span className="text-lg font-medium tracking-wide">
                {item.name}
              </span>
              
              {/* Active Indicator - Soft Bokeh Glow */}
              {isActive && (
                <div className="absolute left-0 h-8 w-1 bg-amber-500 rounded-r-full shadow-[0_0_15px_rgba(245,158,11,1)]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Section - Frosted Card Style */}
      <div className="mt-auto w-full flex items-center gap-3 p-3 rounded-2xl bg-amber-950/20 border border-amber-500/10 backdrop-blur-md">
        <div className="h-12 w-12 text-2xl rounded-full bg-gradient-to-br from-amber-700 to-amber-950 border border-amber-400/20 flex items-center justify-center text-white font-bold">
          <FaUser size={20} className="text-gray-300" />
        </div>
        
        <div className="flex flex-col overflow-hidden">
          <h1 className="font-bold text-white text-base truncate">
            {loading ? "..." : user?.fullName || "Arnav Saha"}
          </h1>
          <span className="text-[10.2px] text-amber-500/60 font-black uppercase tracking-[0.25px]">Premium Member</span>
        </div>

        <button className="ml-auto p-2 hover:bg-amber-500/10 rounded-lg transition-colors text-gray-500 hover:text-red-600" title="Log Out">
          <TbLogout size={26} />
        </button>
      </div>
    </aside>
  );
}