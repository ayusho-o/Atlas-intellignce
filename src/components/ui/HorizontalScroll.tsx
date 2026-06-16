"use client";
import { useRef, useState, useEffect, useCallback, Children } from "react";

interface Props {
  children: React.ReactNode;
  gap?: number;
}

// Cards-per-page by viewport width
function getVisible(): number {
  if (typeof window === "undefined") return 5;
  const w = window.innerWidth;
  if (w < 480)  return 2;
  if (w < 768)  return 3;
  if (w < 1024) return 4;
  if (w < 1280) return 5;
  return 6;
}

export default function HorizontalScroll({ children, gap = 14 }: Props) {
  const trackRef   = useRef<HTMLDivElement>(null);
  const [index, setIndex]   = useState(0);
  const [visible, setVisible] = useState(5);
  const [cardW, setCardW]   = useState(0);
  const items = Children.toArray(children);
  const total = items.length;
  const maxIndex = Math.max(0, total - visible);

  const measure = useCallback(() => {
    const v = getVisible();
    setVisible(v);
    if (trackRef.current) {
      const firstCard = trackRef.current.children[0] as HTMLElement | undefined;
      if (firstCard) {
        setCardW(firstCard.getBoundingClientRect().width + gap);
      }
    }
  }, [gap]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Clamp index when visible count changes
  useEffect(() => {
    setIndex(i => Math.min(i, Math.max(0, total - getVisible())));
  }, [visible, total]);

  const prev = () => setIndex(i => Math.max(0, i - 1));
  const next = () => setIndex(i => Math.min(maxIndex, i + 1));

  const offset = cardW ? -(index * cardW) : 0;

  const canPrev = index > 0;
  const canNext = index < maxIndex;

  return (
    <div className="relative group/hs w-full" style={{ overflow: "hidden" }}>
      {/* Left fade */}
      {canPrev && (
        <div className="absolute left-0 top-0 bottom-0 w-10 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, rgba(255,255,255,1), transparent)" }} />
      )}

      {/* Track */}
      <div
        className="carousel-viewport"
        style={{ overflow: "hidden", width: "100%" }}
      >
        <div
          ref={trackRef}
          className="carousel-track"
          style={{ gap, transform: `translateX(${offset}px)` }}
        >
          {items}
        </div>
      </div>

      {/* Right fade */}
      {canNext && (
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, rgba(255,255,255,1), transparent)" }} />
      )}

      {/* Prev arrow */}
      {canPrev && (
        <button
          onClick={prev}
          aria-label="Previous"
          className="carousel-arrow absolute left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white border border-[#E5E5E5] rounded-full shadow-md flex items-center justify-center opacity-0 group-hover/hs:opacity-100 transition-opacity hover:shadow-lg"
          style={{ marginLeft: 2 }}
        >
          <svg width="14" height="14" fill="none" stroke="#484848" strokeWidth="2.2" viewBox="0 0 24 24">
            <polyline points="15,18 9,12 15,6"/>
          </svg>
        </button>
      )}

      {/* Next arrow */}
      {canNext && (
        <button
          onClick={next}
          aria-label="Next"
          className="carousel-arrow absolute right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white border border-[#E5E5E5] rounded-full shadow-md flex items-center justify-center opacity-0 group-hover/hs:opacity-100 transition-opacity hover:shadow-lg"
          style={{ marginRight: 2 }}
        >
          <svg width="14" height="14" fill="none" stroke="#484848" strokeWidth="2.2" viewBox="0 0 24 24">
            <polyline points="9,18 15,12 9,6"/>
          </svg>
        </button>
      )}
    </div>
  );
}
