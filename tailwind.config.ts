
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
        sans: ["Borna", ...fontFamily.sans],
        heading: ["TT Hoves Pro", ...fontFamily.sans],
        handwritten: ["Architects Daughter", "cursive"],
        mono: ["monospace", ...fontFamily.mono],
      },
      colors: {
        vaya: {
          primary: "#113231",      // Harmony Green - Primary
          secondary: "#EBDDD6",    // Sandstone - Secondary
          
          home: "#113231",         // Dark green for home/landing
          stories: "#FF3366",      // Magenta for stories section
          memories: "#00CED1",     // Teal for memory lane
          capsules: "#8A2BE2",     // Purple for family capsules
          narra: "#4169E1",        // Blue for Narra's theme
          
          accent: {
            turquoise: "#00CED1",
            purple: "#8A2BE2",
            magenta: "#FF3366",
            blue: "#4169E1",
          },
          
          chat: {
            bg: "#F8F8F8",
            border: "#E2E8F0",
            hover: "#F1F5F9",
          },
          gray: {
            50: "#F8F8F8",
            100: "#F1F5F9",
            200: "#E2E8F0",
            300: "#CBD5E1",
            400: "#94A3A2",
            500: "#5E7472",
            600: "#475569",
            700: "#334155",
            800: "#1E293B",
            900: "#113231",
          },
          text: {
            primary: "#113231",
            secondary: "#5E7472",
            light: "#FFFFFF",
            muted: "#94A3A2",
          },
        },
        
        greystone: {
          green: {
            DEFAULT: "#113231",
            90: "#1E3D3C",
            80: "#2B4847",
            70: "#385352",
            60: "#455F5D",
            50: "#566A68",
            40: "#778786",
            30: "#98A3A3",
            20: "#B9C0BF",
            10: "#DBDDDC",
          },
          sandstone: {
            DEFAULT: "#EBDDD6",
            dark: "#D4C5BD",
            darker: "#BEA99F",
          },
          ui: {
            black: "#222222",
            white: "#FFFFFF",
            gray: "#F8F8F8",
            error: "#E53E3E",
            success: "#38A169",
            warning: "#DD6B20",
          }
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
          DEFAULT: "#113231",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#EBDDD6",
          foreground: "#113231",
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
          DEFAULT: "#00CED1",
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
          "50%": { borderColor: "#113231" },
        },
        wavePattern: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-20%)" },
        }
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
        wavePattern: "wavePattern 15s linear infinite",
      },
      backgroundImage: {
        'wave-pattern': "url('/lovable-uploads/d42f87cc-df9d-4966-9975-10468e31ca27.png')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
