import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        coral: { DEFAULT:"#FF5A5F", light:"#FFF0F0", dark:"#E04E53" },
        graphone: { text:"#222222", body:"#484848", muted:"#717171", bg:"#F7F7F7", border:"#EBEBEB" }
      },
      fontFamily: { sans: ["Inter","sans-serif"] },
      fontSize: { "2xs": "10px" }
    }
  },
  plugins: []
} satisfies Config;
