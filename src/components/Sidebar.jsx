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
    <aside className="w-80 left-0 top-50 h-screen flex flex-col items-center py-7 px-2.5 bg-neutral-900 z-50">
      {/* Brand Logo - Top Section */}
      <div className="mb-30 flex items-center ">
        <div className="flex items-center gap-3 px-5">
          <FaBook className="text-gray-400" size={30} strokeWidth={1.8} />
          <h1 className="font-bold text-3xl">Ink2Image</h1>
        </div>
      </div>
      {/* Navigation */}
      <nav className="flex flex-col gap-3 w-full px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname == item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group relative flex gap-4 items-center p-4 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-white/25 shadow-lg shadow-black/20"
                  : "text-muted-foreground hover:bg-white/25 hover:text-white"
              }`}
            >
              <Icon size={27} />
              <span className="text-[20px] font-medium tracking-wide opacity-80">
                {item.name}
              </span>
              {/* Active Indicator Bar */}
              {isActive && (
                <div className="absolute left-0 h-10 w-1 bg-white rounded-r-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User & Settings - Bottom Section */}
      <div className="flex mt-auto place-self-end gap-2 items-center w-full p-3 rounded-xl bg-neutral-800 ">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border border-border flex items-center justify-center cursor-pointer hover:border-primary transition-all">
          <FaUser size={20} className="text-muted-foreground" />
        </div>
        <h1 className="font-bold text-xl">Username</h1>
        <div className="ml-auto hover:cursor-pointer">
          <TbLogout size={30} className="text-gray-300" />
        </div>
      </div>
    </aside>
  );
}
