"use client";
import Link from "next/link";
import CompanyLogo from "@/components/ui/CompanyLogo";
import Badge from "@/components/ui/Badge";
import type { Startup } from "@/data/startups";

const RANK_COLORS = ["#FF5A5F","#FF8C42","#8B5CF6","#3B82F6","#10B981"];

export default function CompanyCard({ startup, rank }: { startup: Startup; rank?: number }) {
  const rankColor = rank != null ? RANK_COLORS[(rank - 1) % RANK_COLORS.length] : "#888";
  return (
    <Link href={`/startups/${startup.slug}`}
      className="flex-shrink-0 bg-white border border-[#EBEBEB] rounded-2xl p-4 flex flex-col hover:shadow-lg hover:border-[#D5D5D5] transition-all duration-200 group"
      style={{ width: 175 }}>

      {/* Rank */}
      {rank != null ? (
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold mb-3 flex-shrink-0"
          style={{ background: `${rankColor}20`, color: rankColor }}>
          {rank}
        </div>
      ) : <div className="h-7 mb-3"/>}

      {/* Logo — centred */}
      <div className="flex justify-center items-center mb-3 h-[60px]">
        <CompanyLogo
          name={startup.name} website={startup.website}
          logoInitial={startup.logoInitial} logoBg={startup.logoBg} logoColor={startup.logoColor}
          size={50} radius="14px"
        />
      </div>

      {/* Name */}
      <h3 className="text-[13px] font-semibold text-center text-[#1A1A1A] mb-1 leading-snug group-hover:text-[#FF5A5F] transition-colors line-clamp-1">
        {startup.name}
      </h3>

      {/* Desc */}
      <p className="text-[11px] text-center text-[#717171] leading-relaxed mb-3 flex-1 line-clamp-3">
        {startup.shortDesc}
      </p>

      {/* Badge */}
      <div className="flex justify-center mb-3">
        <Badge label={startup.category} color={startup.badgeColor} size="xs"/>
      </div>

      {/* Footer stats */}
      <div className="flex items-center gap-2 pt-3 border-t border-[#F3F3F3]">
        <div className="flex-1 min-w-0">
          <p className="text-[9px] text-[#B0B0B0] mb-0.5">Est.</p>
          <p className="text-[11px] font-semibold text-[#222]">{startup.founded}</p>
        </div>
        <div className="w-px h-5 bg-[#EBEBEB]"/>
        <div className="flex-1 min-w-0">
          <p className="text-[9px] text-[#B0B0B0] mb-0.5">HQ</p>
          <p className="text-[11px] font-semibold text-[#222] truncate">{startup.hqCity}</p>
        </div>
      </div>
    </Link>
  );
}
