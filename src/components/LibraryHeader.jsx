"use client";
import { useState } from "react";
import { FaMagnifyingGlass, FaFilter, FaChevronDown } from "react-icons/fa6";

export default function LibraryHeader({ setSearchQuery, setFilter, activeFilter }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filters = ["Recent First", "Oldest First"];

  return (
    <div className="w-full px-4 md:px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      {/* Title Section */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight drop-shadow-sm">
          My Library
        </h1>
        <p className="text-amber-200/40 text-xs font-semibold uppercase tracking-widest mt-1">
          Managing your generated worlds
        </p>
      </div>

      {/* Controls Section */}
      <div className="flex items-center gap-3 w-full md:w-auto relative">
        {/* Search Input */}
        <div className="relative flex-1 md:w-64 group">
          <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500/40 group-focus-within:text-amber-500 transition-colors" />
          <input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search books..."
            className="w-full bg-black/40 border border-amber-500/10 rounded-2xl py-3 pl-11 pr-4 text-white placeholder:text-gray-600 outline-none focus:border-amber-500/40 transition-all text-sm"
          />
        </div>

        {/* Filter Button */}
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-3 bg-amber-500/5 border border-amber-500/10 rounded-2xl py-3 px-5 text-gray-400 hover:text-amber-400 hover:bg-amber-500/10 transition-all group outline-none"
          >
            <FaFilter className={isFilterOpen ? "text-amber-400" : ""} />
            <span className="font-medium text-sm hidden w-26 sm:inline">
              {activeFilter}
            </span>
            <FaChevronDown
              className={`text-[10px] transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown Menu */}
          {isFilterOpen && (
            <div className="absolute right-0 mt-1 w-48 bg-black/80 backdrop-blur-3xl border border-amber-500/20 rounded-xl p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setFilter(filter);
                    setIsFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${
                    activeFilter === filter
                      ? "bg-amber-500/20 text-amber-400 font-bold"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
