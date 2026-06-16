"use client";
import { useState, useEffect, useRef } from "react";

const TABS = [
  { id:"all",                   label:"All Categories",         icon:<svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
  { id:"top",                   label:"Top Companies",          icon:<svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg> },
  { id:"recently-funded",       label:"Recently Funded",        icon:<svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg> },
  { id:"fast-growing",          label:"Fast Growing",           icon:<svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/><polyline points="16,7 22,7 22,13"/></svg> },
  { id:"most-active-investors", label:"Most Active Investors",  icon:<svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { id:"now-hiring",            label:"Now Hiring",             icon:<svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg> },
];

export default function FilterTabs() {
  // Always start with "all" — same on server & client, no mismatch
  const [active, setActive] = useState("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {TABS.map(t => {
        const on = mounted && active === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            suppressHydrationWarning
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] font-medium border transition-all duration-150 whitespace-nowrap"
            style={{
              background:  on ? "#FF5A5F" : "#fff",
              color:       on ? "#fff"    : "#484848",
              borderColor: on ? "#FF5A5F" : "#E5E5E5",
            }}
          >
            <span style={{color: on ? "rgba(255,255,255,0.85)" : "#9CA3AF", display:"flex"}}>
              {t.icon}
            </span>
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
