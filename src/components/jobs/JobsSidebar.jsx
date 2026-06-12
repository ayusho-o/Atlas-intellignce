import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Flame, Rocket, Users, Coins, Box, CandlestickChart, Briefcase, Bookmark, Bell } from "lucide-react";

const Item = ({ icon: Icon, label, badge, active }) => (
  <div
    className={`flex items-center gap-2 px-2.5 py-[7px] rounded-lg cursor-pointer text-[13px] transition-colors select-none ${
      active
        ? "bg-red-50 text-[#D92B2B] font-medium"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`}
  >
    <Icon className="w-4 h-4 shrink-0 opacity-80" />
    {label}
    {badge && (
      <span
        className={`ml-auto text-[10px] font-medium px-1.5 py-px rounded-full border ${
          active
            ? "bg-red-50 text-[#D92B2B] border-red-200"
            : "bg-gray-50 text-gray-400 border-gray-200"
        }`}
      >
        {badge}
      </span>
    )}
  </div>
);

export default function JobsSidebar() {
  const { pathname } = useLocation();
  const onJobs = pathname === "/jobs";
  const onHome = pathname === "/";

  return (
    <nav className="hidden lg:flex w-[230px] shrink-0 bg-white border-r border-gray-200 flex-col sticky top-0 h-screen overflow-y-auto">
      <div className="px-4 py-4 border-b border-gray-200 flex items-center gap-2.5">
        <div className="w-8 h-8 bg-[#D92B2B] rounded-[9px] flex items-center justify-center text-white text-[15px] font-bold tracking-tight">
          AI
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900 leading-tight">Atlas</div>
          <div className="text-[11px] text-gray-400">Intelligence</div>
        </div>
      </div>

      <div className="p-2.5">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-2 pb-1.5">Discover</div>
        <Link to="/" className="no-underline"><Item icon={Home} label="Home" active={onHome} /></Link>
        <Item icon={Search} label="Search" />
        <Item icon={Flame} label="Trending" />
      </div>

      <div className="p-2.5 pt-1">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-2 pb-1.5">Entities</div>
        <Item icon={Rocket} label="Startups" badge="25k" />
        <Item icon={Users} label="Founders" badge="100k" />
        <Item icon={Coins} label="Investors" badge="8.4k" />
        <Item icon={Box} label="Products" badge="42k" />
        <Item icon={CandlestickChart} label="Funding" badge="18.6k" />
        <Link to="/jobs" className="no-underline">
          <Item icon={Briefcase} label="Jobs" badge="12.4k" active={onJobs} />
        </Link>
      </div>

      <div className="p-2.5 pt-1">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-2 pb-1.5">My Job Hub</div>
        <Item icon={Bookmark} label="Saved jobs" />
        <Item icon={Bell} label="Job alerts" />
      </div>

      <div className="mt-auto p-3 border-t border-gray-200">
        <div className="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-xl p-3.5">
          <div className="text-[10px] font-semibold uppercase tracking-wide text-[#D92B2B] mb-1">Pro Plan</div>
          <div className="text-[13px] font-semibold text-red-900 mb-0.5">Unlock full intelligence</div>
          <div className="text-[11.5px] text-red-800/80 leading-snug mb-2.5">
            Salary insights, recruiter contacts, and instant alerts.
          </div>
          <button className="w-full bg-[#D92B2B] hover:bg-red-700 text-white text-xs font-semibold py-1.5 rounded-lg transition-colors">
            Upgrade to Pro
          </button>
        </div>
      </div>
    </nav>
  );
}
