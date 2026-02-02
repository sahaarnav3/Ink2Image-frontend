"use client";
import { useState } from "react";
import { FaMagnifyingGlass, FaFilter, FaChevronDown } from "react-icons/fa6";

export default function LibraryHeader({ onFilterChange, onSearch }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Recent First");

  const filters = ["Recent First", "Oldest First", "Completed", "Drafts"];

  const handleSelect = (filter) => {
    setActiveFilter(filter);
    setIsFilterOpen(false);
    onFilterChange(filter); // Pass the selection up to the parent
  };

  return (
    <div className="w-full p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      
      {/* Title Section */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight drop-shadow-sm">My Library</h1>
        <p className="text-amber-200/40 text-sm font-medium mt-1">Managing your generated worlds</p>
      </div>

      {/* Controls Section */}
      <div className="flex items-center gap-3 w-full md:w-auto relative">
        {/* Search Input */}
        <div className="relative flex-1 md:w-64">
          <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500/40" />
          <input 
            type="text" 
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search stories..." 
            className="w-full bg-black/40 border border-amber-500/10 rounded-2xl py-3 pl-11 pr-4 text-white placeholder:text-gray-600 outline-none focus:border-amber-500/40 transition-all text-sm"
          />
        </div>

        {/* Filter Button */}
        <div className="relative">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-3 bg-amber-500/5 border border-amber-500/10 rounded-2xl py-3 px-5 text-gray-400 hover:text-amber-400 hover:bg-amber-500/10 transition-all group"
          >
            <FaFilter className={isFilterOpen ? "text-amber-400" : ""} />
            <span className="font-medium text-sm hidden w-26 sm:inline">{activeFilter}</span>
            <FaChevronDown className={`text-[10px] transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Dropdown Menu */}
          {isFilterOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-black/80 backdrop-blur-3xl border border-amber-500/20 rounded-2xl p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleSelect(filter)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-colors ${
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