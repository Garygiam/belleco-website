/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        bg: "hsl(var(--bg) / <alpha-value>)",
        surface: "hsl(var(--surface) / <alpha-value>)",
        ink: "hsl(var(--ink) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        accent: "hsl(var(--accent) / <alpha-value>)",
        "accent-2": "hsl(var(--accent-2) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
      },
      boxShadow: {
        glow: "0 0 0 1px hsl(var(--ink) / 0.10), 0 26px 70px -34px hsl(var(--ink) / 0.38)",
        lift: "0 0 0 1px hsl(var(--ink) / 0.08), 0 18px 50px -30px hsl(var(--ink) / 0.30)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        sheen: {
          "0%": { transform: "translateX(-30%)" },
          "100%": { transform: "translateX(130%)" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        sheen: "sheen 1.1s ease-out both",
      },
    },
  },
  plugins: [],
};
