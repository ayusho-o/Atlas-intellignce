"use client";
import Link from "next/link";

const SIDEBAR_W = 250;

export default function TopBar() {
  return (
    <div
      className="fixed top-0 right-0 z-30 flex items-center gap-3 px-6 py-[14px] bg-white/95 backdrop-blur-sm border-b border-[#F5F5F5]"
      style={{ left: 0 }}
      suppressHydrationWarning
    >
      {/* Spacer that fills the sidebar width on desktop */}
      <div className="hidden lg:block flex-shrink-0" style={{ width: SIDEBAR_W }} />

      <div className="flex-1" />

      <Link href="/watchlist" className="flex items-center gap-1.5 text-[13px] font-medium text-[#484848] hover:text-[#222] transition-colors">
        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
        </svg>
        Watchlist
      </Link>

      <button
      suppressHydrationWarning
      className="w-8 h-8 flex flex-col justify-center items-center gap-1.5 hover:bg-[#F7F7..."
      aria-label="Menu"
      >
        <span className="w-[18px] h-[2px] bg-[#484848] rounded-full" />
        <span className="w-[18px] h-[2px] bg-[#484848] rounded-full" />
        <span className="w-[18px] h-[2px] bg-[#484848] rounded-full" />
      </button>
    </div>
  );
}
