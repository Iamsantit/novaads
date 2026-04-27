import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#eef4fb",
          100: "#d5e3f4",
          200: "#aac6e9",
          300: "#7fa9dd",
          400: "#548cd2",
          500: "#2f6fbf",
          600: "#1f5398",
          700: "#183d70",
          800: "#112a4f",
          900: "#0b1e3f",
          950: "#060f22"
        },
        cyan: {
          50: "#e6fbff",
          100: "#c2f5ff",
          200: "#8deaff",
          300: "#4edcff",
          400: "#1cc5e7",
          500: "#0ba6c7",
          600: "#0884a0",
          700: "#0a6a82",
          800: "#0f556a",
          900: "#0f4758"
        },
        space: {
          950: "#010208",
          900: "#020510",
          800: "#04091c",
          700: "#060e28",
          600: "#0a1535",
          500: "#0f1f42",
          400: "#162952",
          300: "#1e3566"
        },
        neon: {
          cyan: "#00f5ff",
          violet: "#a855f7",
          pink: "#f472b6",
          green: "#4ade80",
          yellow: "#facc15"
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Sora", "Inter", "sans-serif"]
      },
      backgroundImage: {
        "grid-light":
          "linear-gradient(to right, rgba(11,30,63,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,30,63,0.06) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(circle at 50% 0%, rgba(28,197,231,0.35), transparent 60%)",
        "space-grid":
          "linear-gradient(to right, rgba(0,245,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,245,255,0.04) 1px, transparent 1px)",
        "neon-mesh":
          "radial-gradient(ellipse 80% 50% at 20% 40%, rgba(0,245,255,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 20%, rgba(168,85,247,0.10) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 60% 80%, rgba(244,114,182,0.07) 0%, transparent 60%)"
      },
      animation: {
        "gradient-x": "gradient-x 8s ease infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "spin-slow": "spin 12s linear infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        "twinkle-slow": "twinkle 5s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        orbit: "orbit 20s linear infinite",
        "nebula-drift": "nebula-drift 25s ease-in-out infinite"
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" }
        },
        shimmer: {
          "0%": { "background-position": "-1000px 0" },
          "100%": { "background-position": "1000px 0" }
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" }
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0,245,255,0.3), 0 0 40px rgba(0,245,255,0.1)" },
          "50%": { boxShadow: "0 0 40px rgba(0,245,255,0.8), 0 0 80px rgba(0,245,255,0.3)" }
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(80px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(80px) rotate(-360deg)" }
        },
        "nebula-drift": {
          "0%, 100%": { transform: "translate(0,0) scale(1)", opacity: "0.6" },
          "33%": { transform: "translate(40px,-30px) scale(1.08)", opacity: "0.8" },
          "66%": { transform: "translate(-30px,20px) scale(0.95)", opacity: "0.5" }
        }
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(28,197,231,0.55)",
        card: "0 10px 40px -12px rgba(11,30,63,0.25)",
        "neon-cyan":
          "0 0 20px rgba(0,245,255,0.45), 0 0 60px rgba(0,245,255,0.15), 0 0 100px rgba(0,245,255,0.05)",
        "neon-violet":
          "0 0 20px rgba(168,85,247,0.45), 0 0 60px rgba(168,85,247,0.15)",
        "neon-pink":
          "0 0 20px rgba(244,114,182,0.45), 0 0 60px rgba(244,114,182,0.15)",
        "neon-green":
          "0 0 20px rgba(74,222,128,0.45), 0 0 60px rgba(74,222,128,0.15)",
        "space-card":
          "0 10px 40px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.07)",
        "space-card-hover":
          "0 20px 60px -15px rgba(0,0,0,0.9), 0 0 0 1px rgba(0,245,255,0.25), 0 0 40px rgba(0,245,255,0.12)"
      }
    }
  },
  plugins: []
};

export default config;
