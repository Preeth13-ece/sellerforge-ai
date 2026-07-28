/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        forge: {
          bg: "#0A0F0D",        // near-black, green undertone — dark mode base
          surface: "#111815",
          surface2: "#161F1B",
          border: "#232E29",
        },
        paper: {
          bg: "#F7F5F0",        // light mode base — warm off-white, not cream-default
          surface: "#FFFFFF",
          border: "#E5E1D8",
        },
        emerald: {
          50: "#ECFDF5", 100: "#D1FAE5", 200: "#A7F3D0", 300: "#6EE7B7",
          400: "#34D399", 500: "#10B981", 600: "#059669", 700: "#047857",
          800: "#065F46", 900: "#064E3B",
        },
        ember: {
          50: "#FBF2EA", 100: "#F4DFC9", 200: "#E8BE93", 300: "#DB9C5D",
          400: "#C17A3D", 500: "#A6602A", 600: "#874C22", 700: "#67391A",
        },
        ink: {
          900: "#0C1512", 700: "#1B2622", 500: "#4B5A54", 300: "#8A968F", 100: "#D7DDD9",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "forge-glow":
          "radial-gradient(60% 60% at 50% 0%, rgba(16,185,129,0.16) 0%, rgba(10,15,13,0) 70%)",
        "ember-glow":
          "radial-gradient(50% 50% at 100% 100%, rgba(193,122,61,0.14) 0%, rgba(10,15,13,0) 70%)",
        "seam": "linear-gradient(90deg, transparent, #34D399, #C17A3D, transparent)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.35)",
        "glass-sm": "0 2px 12px rgba(0,0,0,0.25)",
        "glow-emerald": "0 0 0 1px rgba(52,211,153,0.25), 0 8px 24px rgba(16,185,129,0.15)",
      },
      borderRadius: { "2xl": "1.25rem", "3xl": "1.75rem" },
    },
  },
  plugins: [],
};
