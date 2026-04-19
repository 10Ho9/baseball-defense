import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        field: {
          50: "#f2f4ea",
          100: "#dae3c4",
          200: "#bacf91",
          300: "#8eaf60",
          400: "#668742",
          500: "#4e6b32",
          600: "#3c5228",
          700: "#2d3e20",
          800: "#1f2b18",
          900: "#121912",
        },
        clay: {
          100: "#f3d5bf",
          200: "#e8b48d",
          300: "#d88d61",
          400: "#c96d42",
          500: "#a65532",
        },
        navy: {
          500: "#16324f",
          700: "#0d2135",
          900: "#08131f",
        },
      },
      fontFamily: {
        display: ["Avenir Next", "Trebuchet MS", "Segoe UI", "sans-serif"],
        body: ["Avenir Next", "Trebuchet MS", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        panel: "0 18px 40px rgba(8, 19, 31, 0.16)",
      },
      backgroundImage: {
        "stadium-glow":
          "radial-gradient(circle at top, rgba(186, 207, 145, 0.28), rgba(8, 19, 31, 0) 45%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
