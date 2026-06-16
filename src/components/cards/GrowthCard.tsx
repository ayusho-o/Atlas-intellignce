"use client";
import Link from "next/link";
import { useState } from "react";
import type { GrowthEntry } from "@/data/startups";

const DOMAIN_MAP: Record<string,string> = {
  perplexity:"perplexity.ai", cursor:"cursor.com", synthesia:"synthesia.io",
  windsurf:"windsurf.com", pika:"pika.art", heygen:"heygen.com", decagon:"decagon.ai",
};

function Sparkline({ data }: { data: number[] }) {
  const W = 72, H = 30;
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((v - min) / range) * (H - 5) - 2;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  const last = pts.split(" ").at(-1)!.split(",");
  const uid = `sp-${data[0]}-${data.length}-${data[data.length-1]}`;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow:"visible", flexShrink:0 }}>
      <defs>
        <linearGradient id={uid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF5A5F" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#FF5A5F" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polyline points={`0,${H} ${pts} ${W},${H}`} fill={`url(#${uid})`} stroke="none"/>
      <polyline points={pts} fill="none" stroke="#FF5A5F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={parseFloat(last[0])} cy={parseFloat(last[1])} r="2.8" fill="#FF5A5F"/>
    </svg>
  );
}

function Icon({ entry }: { entry: GrowthEntry }) {
  const [failed, setFailed] = useState(false);
  const domain = DOMAIN_MAP[entry.id];
  if (failed || !domain) return (
    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-[13px] flex-shrink-0"
      style={{ background: entry.logoBg, color: entry.logoColor }}>{entry.logoInitial}</div>
  );
  return (
    <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 bg-white border border-gray-100">
  <img
    src={`https://www.google.com/s2/favicons?sz=64&domain=${domain}`}
    alt={entry.name}
    width={50}
    height={50}
    style={{ objectFit: "contain" }}
    onError={() => setFailed(true)}
  />
</div>
  );
}

export default function GrowthCard({ entry }: { entry: GrowthEntry }) {
  return (
    <Link href={`/startups/${entry.id}`}
      className="flex-shrink-0 bg-white border border-[#EBEBEB] rounded-2xl p-4 hover:shadow-lg hover:border-[#D5D5D5] transition-all duration-200 group"
      style={{ width: 205 }}>
      <div className="flex items-center gap-2.5 mb-3">
        <Icon entry={entry}/>
        <p className="text-[13px] font-semibold text-[#1A1A1A] group-hover:text-[#FF5A5F] transition-colors truncate flex-1">{entry.name}</p>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-1 mb-0.5">
            <span className="text-[12px] font-bold text-[#FF5A5F]">↑</span>
            <span className="text-[20px] font-bold text-[#1A1A1A]">{entry.growth}%</span>
          </div>
          <p className="text-[10px] text-[#B0B0B0]">growth in 30 days</p>
        </div>
        <Sparkline data={entry.sparkline}/>
      </div>
    </Link>
  );
}
