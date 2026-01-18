"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBook, FaUser } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { MdOutlineFileUpload } from "react-icons/md";
import { IoLibraryOutline, IoSettingsOutline } from "react-icons/io5";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Library", href: "/dashboard", icon: IoLibraryOutline },
    { name: "Upload", href: "/upload", icon: MdOutlineFileUpload },
    { name: "Settings", href: "/settings", icon: IoSettingsOutline },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-80 flex flex-col items-center py-7 px-4 bg-neutral-900 z-50 border-r border-white/5">
      {/* Brand Logo - Top Section */}
      <div className="mb-20 flex items-center w-full px-4">
        <div className="flex items-center gap-3">
          <FaBook className="text-gray-300" size={30} />
          <h1 className="font-bold text-3xl text-white tracking-tight">Ink2Image</h1>
        </div>
      </div>

      {/* Navigation - Middle Section */}
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
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={26} />
              <span className="text-lg font-medium tracking-wide">
                {item.name}
              </span>
              
              {/* Active Indicator Bar - Left edge */}
              {isActive && (
                <div className="absolute left-0 h-8 w-1 bg-white rounded-r-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User & Logout Section - Pinned to Bottom */}
      <div className="mt-auto w-full flex items-center gap-3 p-3 rounded-2xl bg-neutral-800/50 border border-white/5">
        {/* User Avatar Circle */}
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-neutral-600 to-neutral-800 border border-white/10 flex items-center justify-center cursor-pointer hover:border-white/40 transition-all">
          <FaUser size={20} className="text-gray-300" />
        </div>
        
        {/* Username */}
        <div className="flex flex-col">
          <h1 className="font-bold text-white text-base">Arnav Saha</h1>
          <span className="text-xs text-gray-500">Premium Plan</span>
        </div>

        {/* Logout Button */}
        <button className="ml-auto p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-red-400">
          <TbLogout size={26} />
        </button>
      </div>
    </aside>
  );
}