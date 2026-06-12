import React, { useState } from "react";
import { Link } from "react-router-dom";

const NAV_ITEMS = [
  { icon: "ti-home", label: "Home" },
  { icon: "ti-search", label: "Search" },
  { icon: "ti-flame", label: "Trending" },
];
const ENTITY_ITEMS = [
  { icon: "ti-rocket", label: "Startups", badge: "25k" },
  { icon: "ti-users", label: "Founders", badge: "100k" },
  { icon: "ti-coin", label: "Investors", badge: "8.4k" },
  { icon: "ti-box", label: "Products", badge: "42k" },
  { icon: "ti-chart-candle", label: "Funding", badge: "18.6k" },
];
const INTEL_ITEMS = [
  { icon: "ti-map-2", label: "Market Maps", badge: "340" },
  { icon: "ti-report-analytics", label: "Research", badge: "92" },
  { icon: "ti-bookmark", label: "Saved Lists" },
  { icon: "ti-bell", label: "Alerts" },
];

export default function Home() {
  const [activeNav, setActiveNav] = useState("Home");
  const [activeAud, setActiveAud] = useState("Job seekers");
  const [activeCat, setActiveCat] = useState("All Jobs");
  const [activePulseTab, setActivePulseTab] = useState("All");
  const [savedJobs, setSavedJobs] = useState([]);
  const [alertSet, setAlertSet] = useState(false);

  const toggleSave = (id) =>
    setSavedJobs((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", background: "#F3F5F7", color: "#111827", fontSize: 13, WebkitFontSmoothing: "antialiased" }}>
      {/* SIDEBAR */}
      <nav style={{ width: 240, flexShrink: 0, background: "#fff", borderRight: "1px solid #E4E7EC", display: "flex", flexDirection: "column", overflowY: "auto", position: "sticky", top: 0, height: "100vh" }}>
        <div style={{ padding: "18px 18px 14px", borderBottom: "1px solid #E4E7EC", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: "#D92B2B", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 15, fontWeight: 700 }}>AI</div>
          <div><div style={{ fontSize: 14, fontWeight: 600 }}>Atlas</div><div style={{ fontSize: 11, color: "#9CA3AF" }}>Intelligence</div></div>
        </div>
        <div style={{ padding: "10px 10px 4px" }}>
          <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".7px", color: "#9CA3AF", padding: "0 8px 6px" }}>Discover</div>
          {NAV_ITEMS.map(({ icon, label }) => (
            <div key={label} onClick={() => setActiveNav(label)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 8, cursor: "pointer", color: activeNav === label ? "#D92B2B" : "#4B5563", background: activeNav === label ? "#FEF2F2" : "transparent", fontWeight: activeNav === label ? 500 : 400 }}>
              <i className={`ti ${icon}`} style={{ fontSize: 16, opacity: .75 }} /> {label}
            </div>
          ))}
        </div>
        <div style={{ padding: "10px 10px 4px" }}>
          <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".7px", color: "#9CA3AF", padding: "0 8px 6px" }}>Entities</div>
          {ENTITY_ITEMS.map(({ icon, label, badge }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 8, cursor: "pointer", color: "#4B5563" }}>
              <i className={`ti ${icon}`} style={{ fontSize: 16, opacity: .75 }} /> {label}
              {badge && <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 500, background: "#F3F5F7", color: "#9CA3AF", padding: "1px 6px", borderRadius: 20, border: "1px solid #E4E7EC" }}>{badge}</span>}
            </div>
          ))}
          <Link to="/jobs" style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 8, cursor: "pointer", color: "#D92B2B", background: "#FEF2F2", fontWeight: 500, textDecoration: "none" }}>
            <i className="ti ti-briefcase" style={{ fontSize: 16 }} /> Jobs
            <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 500, background: "#FEF2F2", color: "#D92B2B", padding: "1px 6px", borderRadius: 20, border: "1px solid #FECACA" }}>12.4k</span>
          </Link>
        </div>
        <div style={{ padding: "10px 10px 4px" }}>
          <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".7px", color: "#9CA3AF", padding: "0 8px 6px" }}>Intelligence</div>
          {INTEL_ITEMS.map(({ icon, label, badge }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 8, cursor: "pointer", color: "#4B5563" }}>
              <i className={`ti ${icon}`} style={{ fontSize: 16, opacity: .75 }} /> {label}
              {badge && <span style={{ marginLeft: "auto", fontSize: 10, background: "#F3F5F7", color: "#9CA3AF", padding: "1px 6px", borderRadius: 20, border: "1px solid #E4E7EC" }}>{badge}</span>}
            </div>
          ))}
        </div>
        <div style={{ marginTop: "auto", padding: 12, borderTop: "1px solid #E4E7EC" }}>
          <div style={{ background: "linear-gradient(135deg,#FEF2F2,#FFF5F5)", border: "1px solid #FECACA", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".6px", color: "#D92B2B", marginBottom: 4 }}>Pro Plan</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7F1D1D", marginBottom: 3 }}>Unlock full intelligence</div>
            <div style={{ fontSize: 11.5, color: "#991B1B", lineHeight: 1.5, marginBottom: 10 }}>Full company profiles, advanced filters, CSV export, and API access.</div>
            <button style={{ width: "100%", background: "#D92B2B", color: "#fff", border: "none", padding: 7, borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Upgrade to Pro</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "6px 8px", borderRadius: 8, cursor: "pointer" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#F3F5F7", border: "1px solid #E4E7EC", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <i className="ti ti-user" style={{ fontSize: 13, color: "#9CA3AF" }} />
            </div>
            <span style={{ fontSize: 12.5, color: "#4B5563", fontWeight: 500 }}>Sign in</span>
            <i className="ti ti-chevron-right" style={{ fontSize: 13, color: "#9CA3AF", marginLeft: "auto" }} />
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* TOPBAR */}
        <header style={{ height: 58, flexShrink: 0, background: "#fff", borderBottom: "1px solid #E4E7EC", display: "flex", alignItems: "center", gap: 14, padding: "0 24px", position: "sticky", top: 0, zIndex: 50 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#9CA3AF" }}>
            <span>Home</span><span style={{ fontSize: 10, opacity: .5 }}>›</span><span style={{ color: "#111827", fontWeight: 500 }}>Dashboard</span>
          </div>
          <div style={{ flex: 1, maxWidth: 400, display: "flex", alignItems: "center", gap: 8, background: "#F3F5F7", border: "1px solid #E4E7EC", borderRadius: 8, padding: "0 12px", height: 34 }}>
            <i className="ti ti-search" style={{ fontSize: 14, color: "#9CA3AF" }} />
            <input type="search" placeholder="Search startups, founders, investors, jobs…" style={{ border: "none", background: "transparent", fontSize: 12.5, color: "#111827", outline: "none", flex: 1, fontFamily: "inherit" }} />
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid #E4E7EC", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
              <i className="ti ti-bell" style={{ fontSize: 15 }} />
              <div style={{ position: "absolute", top: 7, right: 7, width: 5, height: 5, background: "#D92B2B", borderRadius: "50%", border: "1.5px solid #fff" }} />
            </div>
            <div style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid #E4E7EC", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <i className="ti ti-bookmark" style={{ fontSize: 15 }} />
            </div>
            <Link to="/jobs" style={{ display: "flex", alignItems: "center", gap: 6, background: "#111827", color: "#fff", border: "none", padding: "0 14px", height: 34, borderRadius: 8, fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", textDecoration: "none" }}>
              <i className="ti ti-briefcase" style={{ fontSize: 14 }} /> Browse Jobs
            </Link>
          </div>
        </header>

        {/* CONTENT */}
        <main style={{ flex: 1, padding: "22px 24px 48px" }}>
          {/* Welcome Banner */}
          <div style={{ background: "#0C0A0F", borderRadius: 16, marginBottom: 24, padding: "32px 40px", position: "relative", overflow: "hidden", border: "1px solid rgba(255,255,255,.06)" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 75% 50%,rgba(217,43,43,.14) 0%,transparent 52%),radial-gradient(circle at 15% 80%,rgba(124,58,237,.09) 0%,transparent 45%)", pointerEvents: "none" }} />
            <h1 style={{ fontSize: 28, fontWeight: 700, color: "#fff", letterSpacing: "-.5px", marginBottom: 8, position: "relative" }}>
              The intelligence layer for the <span style={{ color: "#D92B2B" }}>AI ecosystem</span>
            </h1>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.45)", maxWidth: 500, lineHeight: 1.6, marginBottom: 20, position: "relative" }}>
              25,000+ startups · 100,000+ founders · 8,400+ investors — all connected in one knowledge graph.
            </p>
            <Link to="/jobs" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#D92B2B", color: "#fff", padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none", position: "relative" }}>
              <i className="ti ti-briefcase" style={{ fontSize: 16 }} /> Explore 12,418 open roles
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12, marginBottom: 24 }}>
            {[["25,000+", "AI Startups", "#FEF2F2", "#D92B2B", "ti-rocket"], ["100k+", "Founders", "#EFF6FF", "#2563EB", "ti-users"], ["8,400+", "Investors", "#ECFDF5", "#059669", "ti-coin"], ["12,418", "Open Roles", "#F5F3FF", "#7C3AED", "ti-briefcase"], ["$48.2B", "Funding Tracked", "#FFFBEB", "#D97706", "ti-chart-candle"]].map(([n, l, bg, color, icon]) => (
              <div key={l} style={{ background: "#fff", border: "1px solid #E4E7EC", borderRadius: 12, padding: "16px 18px" }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                  <i className={`ti ${icon}`} style={{ fontSize: 16, color }} />
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-.5px", marginBottom: 2 }}>{n}</div>
                <div style={{ fontSize: 12, color: "#9CA3AF" }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Quick links */}
          <div style={{ background: "#fff", border: "1px solid #E4E7EC", borderRadius: 12, padding: "20px 24px" }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, letterSpacing: "-.3px" }}>Quick access</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
              {[{ to: "/jobs", icon: "ti-briefcase", label: "Browse Jobs", desc: "12,418 open roles" }, { to: "/jobs", icon: "ti-robot", label: "AI Agent Roles", desc: "1,800+ positions" }, { to: "/jobs", icon: "ti-server", label: "Infrastructure", desc: "3,300+ positions" }].map((item) => (
                <Link key={item.label} to={item.to} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 10, border: "1px solid #E4E7EC", textDecoration: "none", transition: "all .15s" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <i className={`ti ${item.icon}`} style={{ fontSize: 18, color: "#D92B2B" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{item.label}</div>
                    <div style={{ fontSize: 11.5, color: "#9CA3AF" }}>{item.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
