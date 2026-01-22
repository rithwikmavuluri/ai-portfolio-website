import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        coral: "#FF6B6B",
        teal: "#4ECDC4",
        mint: "#95E1D3",
        dark: "#0a0a0a",
        darkAlt: "#1a1a2e",
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        '20': '20px',
        '30': '30px',
      },
      padding: {
        'safe': 'env(safe-area-inset-bottom)',
      },
      margin: {
        'safe': 'env(safe-area-inset-bottom)',
      },
    },
  },
  plugins: [],
};
export default config;
