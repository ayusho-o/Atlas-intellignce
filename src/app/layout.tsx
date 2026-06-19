import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GraphOne — The Intelligence Layer for the AI Economy",
  description: "Discover every AI startup, founder, investor, product, and funding round.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable} suppressHydrationWarning style={{ overflowX: "hidden" }}>
      <body suppressHydrationWarning style={{ overflowX: "hidden", maxWidth: "100vw" }}>
        {children}
      </body>
    </html>
  );
}
