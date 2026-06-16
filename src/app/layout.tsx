import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GraphOne — The Intelligence Layer for the AI Economy",
  description: "Discover every AI startup, founder, investor, product, and funding round.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning style={{ overflowX: "hidden" }}>
      <body suppressHydrationWarning style={{ overflowX: "hidden", maxWidth: "100vw" }}>
        {children}
      </body>
    </html>
  );
}
