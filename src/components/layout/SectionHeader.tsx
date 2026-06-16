import Link from "next/link";

interface Props {
  title: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}

export default function SectionHeader({ title, viewAllHref, viewAllLabel }: Props) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-[18px] font-bold text-[#1A1A1A]">{title}</h2>
      {viewAllHref && (
        <Link href={viewAllHref}
          className="text-[13px] font-semibold flex items-center gap-1 transition-opacity hover:opacity-70"
          style={{ color: "#FF5A5F" }}>
          {viewAllLabel ?? "View all"} →
        </Link>
      )}
    </div>
  );
}
