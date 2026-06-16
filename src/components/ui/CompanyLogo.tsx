"use client";
import { useState } from "react";

interface Props {
  name: string; website: string; logoInitial: string;
  logoBg: string; logoColor: string;
  size?: number; radius?: string; className?: string;
}

// Try to extract a clean domain from whatever string is passed
function cleanDomain(website: string): string {
  if (!website) return "";
  try {
    const w = website.startsWith("http") ? website : `https://${website}`;
    return new URL(w).hostname.replace("www.", "");
  } catch {
    return website.replace(/^https?:\/\//, "").replace("www.", "").split("/")[0];
  }
}

export default function CompanyLogo({
  name, website, logoInitial, logoBg, logoColor,
  size = 44, radius = "12px", className = ""
}: Props) {
  const domain = cleanDomain(website);
  const [failed, setFailed] = useState(false);

  const fallback = (
    <div
      className={`flex-shrink-0 flex items-center justify-center font-bold ${className}`}
      style={{
        width: size, height: size, borderRadius: radius,
        background: "#FFFFFF",
        color: logoColor,
        border: "1px solid #F1F1F1",
        fontSize: Math.round(size * 1),
        flexShrink: 0,
      }}
    >
      {logoInitial}
    </div>
  );

  if (!domain || failed) return fallback;

  const imgSize = Math.round(size * 1);

  return (
    <div
      className={`flex-shrink-0 flex items-center justify-center overflow-hidden ${className}`}
      style={{
  width: size,
  height: size,
  borderRadius: radius,
  background: "#FFFFFF",
  border: "1px solid #F1F1F1",
  flexShrink: 0,
}}
    >
      <img
        src={`https://www.google.com/s2/favicons?sz=64&domain=${domain}`}
        alt={`${name} logo`}
        width={imgSize}
        height={imgSize}
        style={{ objectFit: "contain", display: "block" }}
        onError={() => setFailed(true)}
      />
    </div>
  );
}