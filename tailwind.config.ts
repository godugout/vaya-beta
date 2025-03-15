import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
        heading: ["Montserrat", ...fontFamily.sans],
        story: ["Georgia", ...fontFamily.serif],
      },
      colors: {
        vaya: {
          home: "#6C5CE7",      // Rich purple for home/landing
          stories: "#FF7675",   // Vibrant coral for stories section
          memories: "#00CEC9",  // Turquoise for memory lane
          capsules: "#FFEAA7",  // Yellow for family capsules
          narra: "#8A7EEC",     // Light purple for Narra's theme
          
          accent: {
            turquoise: "#00CEC9",
            yellow: "#FFEAA7",
            coral: "#FF7675",
            purple: "#6C5CE7",
          },
          
          chat: {
            bg: "#F8F5FF",
            border: "#E2E8F0",
            hover: "#F1F5F9",
          },
          gray: {
            50: "#F8FAFC",
            100: "#F1F5F9",
            200: "#E2E8F0",
            300: "#CBD5E1",
            400: "#94A3B8",
            500: "#64748B",
            600: "#475569",
            700: "#334155",
            800: "#1E293B",
            900: "#0F172A",
          },
          text: {
            primary: "#2D3436",
            secondary: "#636E72",
          },
        },
        
        lovable: {
          magenta: {
            bright: "#FF1A53", 
            DEFAULT: "#FF3366", 
            light: "#FF708C", 
          },
          purple: {
            bright: "#9D33FF", 
            DEFAULT: "#8A2BE2", 
            light: "#A555FF", 
          },
          blue: {
            bright: "#4D7AFF", 
            DEFAULT: "#4169E1", 
            light: "#7695FF", 
          },
          teal: {
            bright: "#00E6EA", 
            DEFAULT: "#00CED1", 
            light: "#4DDFE1", 
          },
          skyblue: {
            bright: "#5DB7FF", 
            DEFAULT: "#87CEFA", 
            light: "#B0DFFF", 
          },
        },
        
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#6C5CE7",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#FF7675",
          foreground: "#FFFFFF",
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
          DEFAULT: "#00CEC9",
          foreground: "#FFFFFF",
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        wave: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
          "100%": { transform: "translateY(0)" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        typing: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        blink: {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "#6C5CE7" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.5s ease-out forwards",
        pulse: "pulse 1.5s ease-in-out infinite",
        wave: "wave 2s ease-in-out infinite",
        bounce: "bounce 1s ease-in-out infinite",
        typing: "typing 3.5s steps(40, end)",
        blink: "blink 0.7s step-end infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
