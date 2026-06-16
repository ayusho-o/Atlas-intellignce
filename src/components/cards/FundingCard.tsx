"use client";
import Link from "next/link";
import { useState } from "react";
import Badge from "@/components/ui/Badge";
import type { FundingEntry } from "@/data/startups";

const DOMAIN_MAP: Record<string,string> = {
  xai:"x.ai", deepseek:"deepseek.com", mercor:"mercor.com",
  "h-company":"h.inc", inflection:"inflection.ai",
  "harvey-f":"harvey.ai", "runway-f":"runwayml.com",
  "cohere-f":"cohere.com", "mistral-f":"mistral.ai",
  "glean-f":"glean.com", "elevenlabs-f":"elevenlabs.io",
};

function Icon({ entry }: { entry: FundingEntry }) {
  const [failed, setFailed] = useState(false);
  const domain = DOMAIN_MAP[entry.id];
  if (failed || !domain) return (
    <div className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-[15px] flex-shrink-0"
      style={{ background: entry.logoBg, color: entry.logoColor }}>
      {entry.logoInitial}
    </div>
  );
  return (
    <div
  className="w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 bg-white border border-gray-100">
      <img src={`https://www.google.com/s2/favicons?sz=64&domain=${domain}`} alt={entry.name}
        width={45} height={45} style={{ objectFit:"contain" }} onError={() => setFailed(true)}/>
    </div>
  );
}

export default function FundingCard({ entry }: { entry: FundingEntry }) {
  return (
    <Link href={`/startups/${entry.slug}`}
      className="flex-shrink-0 bg-white border border-[#EBEBEB] rounded-2xl p-4 hover:shadow-lg hover:border-[#D5D5D5] transition-all duration-200 group"
      style={{ width: 220 }}>
      <div className="flex items-start gap-3 mb-3">
        <Icon entry={entry}/>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-[#1A1A1A] group-hover:text-[#FF5A5F] transition-colors truncate">{entry.name}</p>
          <div className="mt-1"><Badge label={entry.round} color={entry.badgeColor} size="xs"/></div>
        </div>
      </div>
      <div className="border-t border-[#F3F3F3] mb-3"/>
      <div className="flex items-baseline justify-between mb-2">
        <p className="text-[22px] font-bold text-[#1A1A1A] leading-tight">{entry.amount}</p>
        <p className="text-[11px] text-[#B0B0B0] ml-2 flex-shrink-0">{entry.date}</p>
      </div>
      <p className="text-[11px] text-[#717171] line-clamp-2">
        <span className="text-[#B0B0B0]">Investors: </span>{entry.investors}
      </p>
    </Link>
  );
}
