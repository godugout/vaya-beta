
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
      colors: {
        // Colors from forest stream illustration
        sky: "rgb(var(--color-sky) / <alpha-value>)",
        forest: "rgb(var(--color-forest) / <alpha-value>)",
        water: "rgb(var(--color-water) / <alpha-value>)",
        mountain: "rgb(var(--color-mountain) / <alpha-value>)",
        leaf: "rgb(var(--color-leaf) / <alpha-value>)",
        autumn: "rgb(var(--color-autumn) / <alpha-value>)",
        sand: "rgb(var(--color-sand) / <alpha-value>)",
        
        // Forest Stream direct colors - can be used without RGB variables
        "forest-green": "#154734",
        "stream-blue": "#449EBA",
        "leaf-green": "#94C11E",
        "autumn-orange": "#F2992D",
        "sky-blue": "#86CAE9",
        "mountain-blue": "#5EACBA",
        "sand-beige": "#C4B295",
        
        // UI colors from frog character designs
        "ui-orange": "rgb(var(--color-ui-orange) / <alpha-value>)",
        "ui-green": "rgb(var(--color-ui-green) / <alpha-value>)",
        "ui-purple": "rgb(var(--color-ui-purple) / <alpha-value>)",
        "ui-teal": "rgb(var(--color-ui-teal) / <alpha-value>)",
        "ui-red": "rgb(var(--color-ui-red) / <alpha-value>)",
        
        // Vaya brand colors
        "vaya-primary": "#449EBA", // Stream water blue
        "vaya-secondary": "#94C11E", // Leaf green
        "vaya-accent": "#F2992D", // Autumn orange
        
        // Space Vault colors
        "space-black": "#0B0E17",
        "space-darkBlue": "#1A2033",
        "space-indigo": "#2D3250",
        "space-blue": "#0A4ECA",
        "space-lightBlue": "#7CB7FF",
        "space-purple": "#6C63FF",
        "space-violet": "#A78BFA",
        "space-red": "#E4263B",
        "space-orange": "#FF7E47",
        "space-gold": "#FFD700",
        "space-silver": "#E2E8F0",
        
        // Space UI colors
        "space-background": "#0B0E17",
        "space-surface": "#1A2033",
        "space-border": "#2D3250",
        
        // Space text colors
        "space-text": {
          primary: "#FFFFFF",
          secondary: "#CBD5E1",
          tertiary: "#94A3B8",
        },
        
        // Dark mode specific colors
        "dark-background": {
          DEFAULT: "#0C2A20",
          surface: "#133830",
          elevated: "#1B4A40",
          inset: "#0A211A",
          orange: "#331F17",
          red: "#2C1517",
          green: "#192D1D",
          purple: "#261E36",
        },
        
        "dark-text": {
          primary: "#F8F9FA",
          secondary: "#A0AEC0",
          tertiary: "#718096",
          highlight: "#94C11E",
        },
        
        // Keep shadcn system colors
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
        sans: ["var(--font-body)", ...fontFamily.sans],
        heading: ["var(--font-heading)", ...fontFamily.sans],
        accent: ["var(--font-accent)", ...fontFamily.sans],
        mono: ["'JetBrains Mono'", "monospace"],
        nasa: ["'Orbitron'", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
      backgroundImage: {
        "forest-stream": "url('/lovable-uploads/d6f811da-1ea4-433c-87e8-10ed28f459e5.png')",
        "vaya-screen": "url('/lovable-uploads/79a7f098-5d08-4543-8610-cab0055c5960.png')",
        "space-stars": "url('/lovable-uploads/dbfde90d-4253-4295-b1e9-e9bb049cd9cd.png')",
        "gradient-coral": "linear-gradient(135deg, #FF7675 0%, #FFA05A 100%)",
        "gradient-purple": "linear-gradient(135deg, #6C63FF 0%, #8F84EB 100%)",
        "gradient-forest": "linear-gradient(135deg, #154734 0%, #94C11E 100%)",
        "gradient-water": "linear-gradient(135deg, #449EBA 0%, #86CAE9 100%)",
        "gradient-autumn": "linear-gradient(135deg, #F2992D 0%, #D94843 100%)",
        "gradient-space": "linear-gradient(180deg, #0B0E17 0%, #1A2033 100%)",
        "gradient-cosmic": "linear-gradient(135deg, #6C63FF 0%, #A78BFA 100%)",
        "gradient-nebula": "linear-gradient(135deg, #0A4ECA 0%, #7CB7FF 100%)",
        "gradient-mars": "linear-gradient(135deg, #E4263B 0%, #FF7E47 100%)",
        "gradient-solar": "linear-gradient(135deg, #FFD700 0%, #FF7E47 100%)",
      },
      animation: {
        "wave-pattern": "wavePattern 50s linear infinite",
        float: "float 6s ease-in-out infinite",
        pulse: "pulse 2s ease-in-out infinite",
        wave: "wave 2.5s linear infinite",
        "star-twinkle": "starTwinkle 3s ease-in-out infinite",
        "orbit": "orbit 20s linear infinite",
        "scanning": "scanning 3s ease-in-out infinite",
      },
      keyframes: {
        wavePattern: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "100% 100%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        wave: {
          "0%": { transform: "rotate(0deg)" },
          "10%": { transform: "rotate(14deg)" },
          "20%": { transform: "rotate(-8deg)" },
          "30%": { transform: "rotate(14deg)" },
          "40%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(10deg)" },
          "60%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        starTwinkle: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.8" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(100px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(100px) rotate(-360deg)" },
        },
        scanning: {
          "0%": { transform: "translateY(0)", opacity: "0.5" },
          "50%": { transform: "translateY(100px)", opacity: "0.8" },
          "100%": { transform: "translateY(0)", opacity: "0.5" },
        }
      },
      zIndex: {
        "nav": "100",
        "content": "20",
        "patterns": "10",
        "cards": "30",
        "text": "40",
        "overlay": "50",
        "floating": "60",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
