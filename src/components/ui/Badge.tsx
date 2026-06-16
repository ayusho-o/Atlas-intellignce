import type { BadgeColor } from "@/data/startups";

interface Props {
  label: string;
  color: BadgeColor;
  size?: "sm" | "xs";
}

const COLOR_MAP: Record<BadgeColor, { bg: string; text: string }> = {
  coral:  { bg: "rgba(255,90,95,0.10)",   text: "#C0393E" },
  blue:   { bg: "rgba(59,130,246,0.10)",  text: "#1D5DA8" },
  green:  { bg: "rgba(16,185,129,0.10)",  text: "#065F46" },
  purple: { bg: "rgba(139,92,246,0.10)",  text: "#5B21B6" },
  amber:  { bg: "rgba(245,158,11,0.10)",  text: "#92400E" },
  teal:   { bg: "rgba(20,184,166,0.10)",  text: "#0F5F56" },
  pink:   { bg: "rgba(236,72,153,0.10)",  text: "#9D174D" },
  orange: { bg: "rgba(249,115,22,0.10)",  text: "#9A3412" },
  gray:   { bg: "rgba(107,114,128,0.10)", text: "#374151" },
  indigo: { bg: "rgba(99,102,241,0.10)",  text: "#3730A3" },
};

export default function Badge({ label, color, size = "sm" }: Props) {
  const { bg, text } = COLOR_MAP[color] ?? COLOR_MAP.gray;
  const cls = size === "xs"
    ? "text-[10px] px-2 py-0.5 rounded-md font-medium"
    : "text-[11px] px-2.5 py-0.5 rounded-lg font-medium";
  return (
    <span className={cls} style={{ background: bg, color: text }}>
      {label}
    </span>
  );
}
