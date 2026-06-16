"use client";
import Link from "next/link";
import { useState } from "react";
import Badge from "@/components/ui/Badge";
import type { NewEntry } from "@/data/startups";


function Icon({ entry }: { entry: NewEntry }) {
  const [failed, setFailed] = useState(false);

  const domain = entry.website
    ?.replace(/^https?:\/\//, "")
    ?.replace(/^www\./, "")
    ?.split("/")[0];

  if (failed || !domain) {
    return (
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-[14px] flex-shrink-0 bg-white border border-gray-100"
        style={{ color: entry.logoColor }}
      >
        {entry.logoInitial}
      </div>
    );
  }

  return (
    <div className="w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 bg-white border border-gray-100">
      <img
        src={`https://www.google.com/s2/favicons?sz=64&domain=${domain}`}
        alt={entry.name}
        width={45}
        height={45}
        style={{ objectFit: "contain" }}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

export default function NewStartupCard({ entry }: { entry: NewEntry }) {
  return (
    <Link href={`/startups/${entry.slug}`}
      className="flex-shrink-0 bg-white border border-[#EBEBEB] rounded-2xl p-4 hover:shadow-lg hover:border-[#D5D5D5] transition-all duration-200 group"
      style={{ width: 200 }}>
      <div className="flex items-start justify-between mb-3">
        <Icon entry={entry}/>
        <span className=" self-start text-[10px] font-semibold px-2.5 py-1 rounded-full mb-3 "
  style={{
    background: "rgba(255,90,95,0.12)",
    color: "#FF5A5F"
  }}
>
  New
</span>
      </div>
      <p className="text-[13px] font-semibold text-[#1A1A1A] mb-1.5 group-hover:text-[#FF5A5F] transition-colors line-clamp-1">{entry.name}</p>
      <div className="mb-2"><Badge label={entry.category} color={entry.badgeColor} size="xs"/></div>
      <p className="text-[11px] text-[#B0B0B0] mt-2">Added {entry.addedDaysAgo} {entry.addedDaysAgo === 1 ? "day" : "days"} ago</p>
    </Link>
  );
}
