"use client";
import { useState } from "react";

export default function SearchBar() {
  const [q, setQ] = useState("");
  return (
    <div className="flex items-center gap-2 mb-5 w-full max-w-[560px]" suppressHydrationWarning>
      <div className="flex-1 flex items-center gap-2.5 bg-white border border-[#E5E5E5] rounded-xl px-4 py-3 shadow-sm hover:border-[#D0D0D0] transition-colors min-w-0">
        <svg width="16" height="16" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24" className="flex-shrink-0">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          suppressHydrationWarning
          type="text"
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search AI startups, founders, investors, products..."
          className="flex-1 text-[14px] text-[#222] placeholder-[#9CA3AF] outline-none bg-transparent min-w-0"
        />
      </div>
      <button
        suppressHydrationWarning
        className="flex-shrink-0 px-5 py-3 rounded-xl text-[13px] font-semibold text-white hover:opacity-90 transition-opacity"
        style={{background:"#FF5A5F"}}>
        Search
      </button>
    </div>
  );
}