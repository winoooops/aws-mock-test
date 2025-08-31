/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        archivo: ["Archivo", "sans-serif"],
        orbitron: ["Orbitron", "monospace"],
        mono: ["Inter", "monospace"],
      },
      animation: {
        float: "float 20s linear infinite",
        glitch: "glitch 2s infinite",
        scan: "scan 3s linear infinite",
        "fade-in": "fade-in 0.6s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%": { transform: "translateY(100vh) translateX(0)", opacity: "0" },
          "10%": { opacity: "0.6" },
          "90%": { opacity: "0.6" },
          "100%": {
            transform: "translateY(-100vh) translateX(100px)",
            opacity: "0",
          },
        },
        glitch: {
          "0%, 100%": { textShadow: "0 0 30px rgba(0, 212, 255, 0.5)" },
          "25%": {
            textShadow: "-2px 0 var(--neon-pink), 2px 0 var(--neon-blue)",
          },
          "50%": {
            textShadow: "2px 0 var(--neon-purple), -2px 0 var(--neon-green)",
          },
          "75%": {
            textShadow: "-1px 0 var(--neon-blue), 1px 0 var(--neon-pink)",
          },
        },
        scan: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      colors: {
        "deep-cove": {
          50: "#eef0fe",
          100: "#d4d9fc",
          200: "#aab5fa",
          300: "#8396f8",
          400: "#5978f5",
          500: "#255cec",
          600: "#1c48bd",
          700: "#123590",
          800: "#0a2468",
          900: "#041442",
          950: "#020e33",
        },
        "cyber-blue": {
          50: "#e0f7ff",
          100: "#b3e9ff",
          200: "#66d4ff",
          300: "#00d4ff",
          400: "#0099cc",
          500: "#006699",
          600: "#004466",
        },
        "neon-green": {
          50: "#e6ffeb",
          100: "#99ffbb",
          200: "#00ff88",
          300: "#00cc66",
          400: "#009944",
          500: "#006633",
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
