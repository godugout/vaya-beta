
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
        
        // UI functional colors for space theme
        "space-ui": {
          background: '#0B0E17',  // Main background
          surface: '#1A2033',     // Card/element surface
          accent: '#7CB7FF',      // Primary accent
          secondary: '#A78BFA',   // Secondary accent
          highlight: '#FFD700',   // Important highlights
          warning: '#FF7E47',     // Warning elements
          critical: '#E4263B',    // Critical alerts
          success: '#4ADE80',     // Success indicators
          border: '#2D3250',      // Border elements
          subtle: '#2D3250',      // Subtle accents
        },
        
        // Text colors for space theme
        "space-text": {
          primary: '#FFFFFF',     // Primary text
          secondary: '#CBD5E1',   // Secondary text
          tertiary: '#94A3B8',    // Tertiary/muted text
          accent: '#7CB7FF',      // Accent text
          highlight: '#FFD700',   // Highlighted text
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
        'space-gradient': 'linear-gradient(180deg, #0B0E17 0%, #1A2033 100%)',
        'cosmic-purple': 'linear-gradient(135deg, #6C63FF 0%, #A78BFA 100%)',
        'blue-nebula': 'linear-gradient(135deg, #0A4ECA 0%, #7CB7FF 100%)',
        'mars-atmosphere': 'linear-gradient(135deg, #E4263B 0%, #FF7E47 100%)',
        'solar-flare': 'linear-gradient(135deg, #FFD700 0%, #FF7E47 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
