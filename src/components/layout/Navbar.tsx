"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/startups", label: "Startups" },
  { href: "/founders",     label: "Founders" },
  { href: "/investors",    label: "Investors" },
  { href: "/products",     label: "Products" },
  { href: "/jobs",         label: "Jobs" },
  { href: "/market-maps",  label: "Market Maps" },
  { href: "/resources",    label: "Resources" },
];

export default function Navbar() {
  const path = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/startups/all") return path?.startsWith("/startups");
    return path?.startsWith(href);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#EBEBEB]" style={{ height: 64 }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-full flex items-center gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 mr-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#FF5A5F" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" />
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="1.8" />
              </svg>
            </div>
            <div className="leading-tight">
              <p className="text-[14px] font-bold text-[#222]">GraphOne</p>
            </div>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-1 flex-1">
            {NAV_LINKS.map(link => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 rounded-lg text-[14px] font-medium transition-colors"
                  style={{ color: active ? "#FF5A5F" : "#484848" }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Search icon */}
            <button suppressHydrationWarning   className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#F7F7F7] transition-colors" aria-label="Search">
              <svg width="18" height="18" fill="none" stroke="#484848" strokeWidth="1.8" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            {/* Notification bell */}
            <button suppressHydrationWarning  className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#F7F7F7] transition-colors" aria-label="Notifications">
              <svg width="18" height="18" fill="none" stroke="#484848" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              {/* Red dot */}
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full" style={{ background: "#FF5A5F" }} />
            </button>

            {/* Upgrade button — hidden on small screens */}
            <Link
              href="/pricing"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-colors hover:opacity-90"
              style={{ background: "#FFF0F0", color: "#FF5A5F" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#FF5A5F">
                <path d="M2 19h20l-2-10-5 5-3-8-3 8-5-5z" />
              </svg>
              Upgrade
            </Link>

            {/* Avatar */}
            <button suppressHydrationWarning  className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold text-white flex-shrink-0" style={{ background: "#FF5A5F" }} aria-label="Account">
              AM
            </button>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden w-9 h-9 flex flex-col justify-center items-center gap-[5px] rounded-lg hover:bg-[#F7F7F7] transition-colors ml-1"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Menu"
            >
              <span className={`w-[18px] h-[2px] bg-[#484848] rounded-full transition-all duration-200 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`w-[18px] h-[2px] bg-[#484848] rounded-full transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`w-[18px] h-[2px] bg-[#484848] rounded-full transition-all duration-200 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-[#EBEBEB] shadow-lg py-3 px-4">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-3 py-2.5 rounded-lg text-[14px] font-medium transition-colors"
                style={{ color: isActive(link.href) ? "#FF5A5F" : "#484848" }}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-[#EBEBEB] flex gap-2">
              <Link href="/auth/signin" className="flex-1 text-center py-2 rounded-lg text-[13px] font-medium border border-[#EBEBEB] text-[#484848]">Sign in</Link>
              <Link href="/pricing" className="flex-1 text-center py-2 rounded-lg text-[13px] font-semibold text-white" style={{ background: "#FF5A5F" }}>Upgrade</Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}