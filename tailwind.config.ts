
import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        space: {
          black: '#0B0E17',      // Deep space black
          darkBlue: '#1A2033',   // Dark space blue
          indigo: '#2D3250',     // Space indigo
          blue: '#0A4ECA',       // NASA blue
          lightBlue: '#7CB7FF',  // Light accent blue
          purple: '#6C63FF',     // Cosmic purple
          violet: '#A78BFA',     // Nebula violet 
          red: '#E4263B',        // Mission critical red (NASA)
          orange: '#FF7E47',     // Mars orange
          gold: '#FFD700',       // Star gold
          silver: '#E2E8F0',     // Spacecraft silver
        },
        
        // Hanuman theme colors
        hanuman: {
          orange: "#FF7E00",
          red: "#C62828",
          saffron: "#F9A825",
          gold: "#FFD700",
          light: "#FFF9F0",
          dark: "#1A0F00",
        },
        
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        heading: ["Orbitron", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        'hanuman-bg': "url('/lovable-uploads/e972aa49-7146-43ba-a1e8-b6e0b5f975d5.png')",
        'hanuman-gradient': 'linear-gradient(135deg, rgba(255, 126, 0, 0.1) 0%, rgba(198, 40, 40, 0.1) 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
