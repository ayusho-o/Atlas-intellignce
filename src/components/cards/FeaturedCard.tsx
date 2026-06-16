"use client";
import Link from "next/link";
import { useState } from "react";
import type { Startup } from "@/data/startups";

const GRADS = [
  "linear-gradient(135deg,#0A0A1A 0%,#111840 60%,#0D0A24 100%)",
  "linear-gradient(135deg,#1A0800 0%,#3D1205 60%,#180400 100%)",
  "linear-gradient(135deg,#001018 0%,#002535 60%,#001018 100%)",
  "linear-gradient(135deg,#0A001A 0%,#1E0835 60%,#080012 100%)",
  "linear-gradient(135deg,#001A0A 0%,#063520 60%,#001008 100%)",
  "linear-gradient(135deg,#1A1200 0%,#352800 60%,#180E00 100%)",
  "linear-gradient(135deg,#0A1A1A 0%,#0D3535 60%,#061010 100%)",
  "linear-gradient(135deg,#1A0010 0%,#350025 60%,#12000A 100%)",
];

function Skyline({ seed }: { seed: number }) {
  const rng = (n: number) => ((seed * 1234567 + n * 987654) % 100) / 100;
  const b = Array.from({ length: 14 }, (_, i) => ({ x: i*16+rng(i*3)*5, h: 22+rng(i*7)*42, w: 9+rng(i*11)*6 }));
  return (
    <svg viewBox="0 0 224 78" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 right-0 w-full opacity-[0.2]">
      {b.map((r, i) => <rect key={i} x={r.x} y={78-r.h} width={r.w} height={r.h} fill="rgba(255,255,255,0.8)" rx="1"/>)}
    </svg>
  );
}

function FavIcon({ name, website, initial }: { name: string; website: string; initial: string }) {
  const [failed, setFailed] = useState(!website);
  if (failed) return <span className="text-white text-[16px] font-bold">{initial}</span>;
  return (
    <img
      src={`https://www.google.com/s2/favicons?sz=64&domain=${website}`}
      alt={name} width={52} height={52}
      style={{ objectFit: "contain" }}
      onError={() => setFailed(true)}
    />
  );
}

export default function FeaturedCard({ startup, seed = 1 }: { startup: Startup; seed?: number }) {
  const grad = GRADS[(seed - 1) % GRADS.length];
  return (
    <Link href={`/startups/${startup.slug}`}
      className="flex-shrink-0 rounded-2xl overflow-hidden relative hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
      style={{ width: 210, height: 225, background: grad }}>

      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}/>
      <Skyline seed={seed}/>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"/>
      <div className="absolute inset-0 p-4 flex flex-col">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
            style={{ background:"rgba(255,255,255,0.12)", backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,0.15)" }}>
            <FavIcon name={startup.name} website={startup.website} initial={startup.logoInitial}/>
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-[14px] leading-tight truncate">{startup.name}</p>
            <p className="text-white/50 text-[10px]">{startup.hqCity}, {startup.hqCountry}</p>
          </div>
        </div>
        <div className="mt-2.5">
          <span
  className="
  text-[10px]
  font-medium
  px-2.5
  py-1
  rounded-full
  "
  style={{
    background: "rgba(255,255,255,0.08)",
    color: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(8px)"
  }}
>
  {startup.category}
</span>
        </div>
        <div className="flex-1"/>
        <div className="h-px mb-3" style={{background:"rgba(255,255,255,0.1)"}}/>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-white/40 text-[9px]">Raised</p>
            <p className="text-white font-bold text-[18px] leading-tight">{startup.totalFunding}</p>
            <p className="text-white/40 text-[9px]">Total Funding</p>
          </div>
          <div>
            <p className="text-white/40 text-[9px]">&nbsp;</p>
            <p className="text-white font-bold text-[17px] leading-tight">{startup.founded}</p>
            <p className="text-white/40 text-[9px]">Founded</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
