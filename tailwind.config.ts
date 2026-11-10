import type { Config } from "tailwindcss";

/**
 * VYNR design tokens — stealth / brutalist-minimal.
 * Pure black canvas, a single cold accent (cyan), glass surfaces at 5% white.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "#000000",
          900: "#050505",
          800: "#0A0A0A",
          700: "#111111",
          600: "#1A1A1A",
        },
        signal: {
          DEFAULT: "#22D3EE", // cyan-400 — VYNR voice
          dim: "#0E7490",
          glow: "#A5F3FC",
        },
        pulse: {
          user: "#F5F5F5", // user mic = white
          warn: "#F59E0B",
          fail: "#EF4444",
          ok: "#10B981",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        hud: "0.24em",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glass: "0 0 0 1px rgba(255,255,255,0.06), 0 12px 40px -12px rgba(0,0,0,0.8)",
        signal: "0 0 24px -4px rgba(34,211,238,0.55)",
      },
      keyframes: {
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        breathe: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "scan-line": "scan-line 6s linear infinite",
        breathe: "breathe 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
