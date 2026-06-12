import React from "react";
import { Globe, Bot, Code, Server, Shield, HeartPulse, TrendingUp, Cpu, Search, Scale, Wand2, Database, Handshake } from "lucide-react";

const ICONS = {
  "All Jobs": Globe,
  "AI Agents": Bot,
  "AI Coding": Code,
  "AI Infrastructure": Server,
  "AI Security": Shield,
  "AI Healthcare": HeartPulse,
  "AI Finance": TrendingUp,
  "Robotics": Cpu,
  "AI Search": Search,
  "Legal AI": Scale,
  "Generative AI": Wand2,
  "AI Data": Database,
  "AI Sales": Handshake,
};

export default function CategoryStrip({ categories, active, setActive }) {
  return (
    <div className="flex gap-1.5 overflow-x-auto mb-4 pb-px [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {categories.map(({ name, count }) => {
        const Icon = ICONS[name] || Globe;
        const on = active === name;
        return (
          <button
            key={name}
            onClick={() => setActive(name)}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[12.5px] font-medium whitespace-nowrap transition-colors ${
              on
                ? "bg-gray-900 border-gray-900 text-white"
                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <Icon className="w-3.5 h-3.5" /> {name}{" "}
            <span className="text-[11px] opacity-60 font-normal">{count}</span>
          </button>
        );
      })}
    </div>
  );
}
