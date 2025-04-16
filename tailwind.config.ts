
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
        
        // UI colors from frog character designs
        "ui-orange": "rgb(var(--color-ui-orange) / <alpha-value>)",
        "ui-green": "rgb(var(--color-ui-green) / <alpha-value>)",
        "ui-purple": "rgb(var(--color-ui-purple) / <alpha-value>)",
        "ui-teal": "rgb(var(--color-ui-teal) / <alpha-value>)",
        "ui-red": "rgb(var(--color-ui-red) / <alpha-value>)",
        
        // Dark mode specific colors
        "dark-background": {
          DEFAULT: "#121212",
          surface: "#1e1e1e",
          elevated: "#282828",
          inset: "#0d0d0d",
        },
        
        "dark-text": {
          primary: "#ffffff",
          secondary: "#a0aec0",
          tertiary: "#718096",
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
        sans: ["var(--font-family-main)", ...fontFamily.sans],
        heading: ["var(--font-family-heading)", ...fontFamily.sans],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
        'architects-daughter': ['"Architects Daughter"', 'cursive'],
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
      backgroundImage: {
        "forest-stream": "url('/lovable-uploads/bc413ab4-a49c-4baa-8d14-e2f0d6b00ac5.png')",
        "gradient-coral": "linear-gradient(135deg, #FF7675 0%, #FFA05A 100%)",
        "gradient-purple": "linear-gradient(135deg, #6C5CE7 0%, #8F84EB 100%)",
      },
      animation: {
        "wave-pattern": "wavePattern 50s linear infinite",
        float: "float 6s ease-in-out infinite",
        pulse: "pulse 2s ease-in-out infinite",
        wave: "wave 2.5s linear infinite",
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
