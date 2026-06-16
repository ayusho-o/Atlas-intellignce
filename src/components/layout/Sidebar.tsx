"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NAV = [
  { href:"/",            label:"Home",        icon:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg> },
  { href:"/startups",    label:"Startups",    icon:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M9 21V9m6 12V9"/></svg> },
  { href:"/founders",    label:"Founders",    icon:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg> },
  { href:"/investors",   label:"Investors",   icon:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/><polyline points="16,7 22,7 22,13"/></svg> },
  { href:"/products",    label:"Products",    icon:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
  { href:"/funding",     label:"Funding",     icon:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
  { href:"/jobs",        label:"Jobs",        icon:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg> },
  { href:"/market-maps", label:"Market Maps", icon:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg> },
  { href:"/saved",       label:"Saved Lists", icon:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg> },
  { href:"/alerts",      label:"Alerts",      icon:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg> },
];

const BOTTOM_NAV = [
  { href:"/watchlist", label:"Watchlist",      icon:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg> },
  { href:"/settings",  label:"Settings",       icon:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
  { href:"/help",      label:"Help & Support", icon:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
];

const SIDEBAR_W = 250;

export default function Sidebar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close drawer on route change
  useEffect(() => { setOpen(false); }, [path]);

  const SidebarInner = () => (
    <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 px-5 pt-6 pb-4 flex-shrink-0 hover:opacity-90 transition-opacity">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:"#FF5A5F"}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white"/>
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="1.8"/>
          </svg>
        </div>
        <div>
          <p className="text-[14px] leading-tight text-[#222]" style={{fontWeight:700}}>  GraphOne</p>
        </div>
      </Link>

      {/* Main nav */}
      <nav className="flex-1 px-3 pb-2">
        {NAV.map(item => {
          const active = item.href === "/" ? path === "/" : path ? path.startsWith(item.href) : false;
          return (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 px-3 py-[9px] rounded-xl mb-[2px] text-[13px] font-medium transition-colors"
              style={{ background: active ? "#FEF0F0" : "transparent", color: active ? "#FF5A5F" : "#484848" }}>
              <span style={{color: active ? "#FF5A5F" : "#9CA3AF", display:"flex", flexShrink:0}}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Premium CTA */}
      <div className="mx-3 mb-3 mt-4 rounded-2xl p-4 flex-shrink-0" style={{background:"#FFF5F5"}}>
        <div className="flex items-center gap-2 mb-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#FF5A5F"><path d="M2 19h20l-2-10-5 5-3-8-3 8-5-5z"/></svg>
          <span className="text-[13px] font-semibold" style={{color:"#FF5A5F"}}>Unlock Premium</span>
        </div>
        <p className="text-[11px] leading-relaxed mb-3" style={{color:"#B45309"}}>
          Get full access to company data, advanced filters and export.
        </p>
        <Link href="/pricing"
          className="flex items-center justify-center text-[12px] font-semibold text-white py-2 rounded-xl hover:opacity-90 transition-opacity"
          style={{background:"#FF5A5F"}}>
          Upgrade Now
        </Link>
      </div>

      {/* Bottom nav */}
      <div className="px-3 mt-3 pb-4 pt-3 border-t border-[#F0F0F0] flex-shrink-0">
        {BOTTOM_NAV.map(item => (
          <Link key={item.href} href={item.href}
            className="flex items-center gap-3 px-3 py-[9px] rounded-xl mb-[2px] text-[13px] text-[#484848] hover:bg-[#F7F7F7] transition-colors">
            <span style={{color:"#9CA3AF", display:"flex", flexShrink:0}}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
        <Link href="/auth/signin"
          className="flex items-center gap-3 px-3 py-[9px] rounded-xl text-[13px] text-[#484848] hover:bg-[#F7F7F7] transition-colors mt-1">
          <svg width="16" height="16" fill="none" stroke="#9CA3AF" strokeWidth="1.7" viewBox="0 0 24 24">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          Sign in
        </Link>
        <Link href="/auth/signup"
          className="flex items-center justify-center mt-2 text-[13px] font-semibold text-white py-[10px] rounded-xl hover:opacity-90 transition-opacity"
          style={{background:"#FF5A5F"}}>
          Create account
        </Link>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile hamburger trigger — rendered in TopBar via prop, but we expose a floating one here */}
        <button
          onClick={() => setOpen(true)}
          className="fixed top-3 left-4 z-50 w-9 h-9 bg-white border border-[#EBEBEB] rounded-xl shadow-sm flex flex-col justify-center items-center gap-1.5"
          aria-label="Open menu"
        >
          <span className="w-[16px] h-[2px] bg-[#484848] rounded-full"/>
          <span className="w-[16px] h-[2px] bg-[#484848] rounded-full"/>
          <span className="w-[16px] h-[2px] bg-[#484848] rounded-full"/>
        </button>

        {/* Overlay */}
        {open && (
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
        )}

        {/* Drawer */}
        <aside
          className="fixed top-0 left-0 h-screen z-50 bg-white border-r border-[#EBEBEB] shadow-2xl transition-transform duration-300"
          style={{ width: SIDEBAR_W, transform: open ? "translateX(0)" : `translateX(-${SIDEBAR_W + 10}px)` }}
        >
          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#F7F7F7] hover:bg-[#EBEBEB] transition-colors"
            aria-label="Close menu"
          >
            <svg width="14" height="14" fill="none" stroke="#484848" strokeWidth="2.2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <SidebarInner />
        </aside>
      </>
    );
  }

  // Desktop fixed sidebar
  return (
    <aside
      className="fixed left-0 top-0 h-screen bg-white border-r border-[#EBEBEB] z-40"
      style={{ width: SIDEBAR_W }}
    >
      <SidebarInner />
    </aside>
  );
}
