import React from "react";
import { Search, Bell, Bookmark, Plus } from "lucide-react";

export default function JobsTopbar({ search, setSearch, savedCount }) {
  return (
    <header className="h-[58px] shrink-0 bg-white border-b border-gray-200 flex items-center gap-3.5 px-4 md:px-6 sticky top-0 z-40">
      <div className="hidden md:flex items-center gap-1.5 text-xs text-gray-400">
        <span>Home</span>
        <span className="opacity-50 text-[10px]">›</span>
        <span className="text-gray-900 font-medium">Jobs</span>
      </div>
      <div className="flex-1 max-w-md flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-lg px-3 h-[34px] focus-within:border-[#D92B2B] focus-within:bg-white transition-colors">
        <Search className="w-3.5 h-3.5 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder="Search roles, companies, skills…"
          className="border-none bg-transparent text-[12.5px] outline-none flex-1 placeholder:text-gray-400"
        />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <button className="w-[34px] h-[34px] rounded-lg border border-gray-200 bg-white flex items-center justify-center relative text-gray-600 hover:bg-gray-50 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-[5px] h-[5px] bg-[#D92B2B] rounded-full ring-2 ring-white" />
        </button>
        <button className="w-[34px] h-[34px] rounded-lg border border-gray-200 bg-white flex items-center justify-center relative text-gray-600 hover:bg-gray-50 transition-colors">
          <Bookmark className="w-4 h-4" />
          {savedCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 text-[9px] font-bold bg-[#D92B2B] text-white rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center">
              {savedCount}
            </span>
          )}
        </button>
        <button className="hidden sm:flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 text-white px-3.5 h-[34px] rounded-lg text-[12.5px] font-semibold transition-colors">
          <Plus className="w-3.5 h-3.5" /> Post a job
        </button>
      </div>
    </header>
  );
}
