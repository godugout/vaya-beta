
import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Core brand colors from the style guide
        primary: "#FF7675",
        secondary: "#6C5CE7",
        accent: "#4CD137",
        
        // Gray scale
        black: "#000000",
        white: "#FFFFFF",
        "gray-100": "#F9F9F9",
        "gray-200": "#F3F3F3",
        "gray-300": "#EDEDED",
        "gray-400": "#DDDDDD",
        "gray-500": "#AAAAAA",
        "gray-600": "#888888",
        "gray-700": "#555555",
        "gray-800": "#333333",
        
        // Sacred Colors
        sacred: {
          primary: {
            saffron: {
              DEFAULT: "#FF7A00",
              50: "#FFF0E6",
              100: "#FFE1CC",
              200: "#FFC499",
              300: "#FFA766",
              400: "#FF8B33",
              500: "#FF7A00",
              600: "#CC6200",
              700: "#994900",
              800: "#663100",
              900: "#331800",
            },
            teal: {
              DEFAULT: "#1E9C95",
              50: "#E6F7F6",
              100: "#CCEEED",
              200: "#99DDDB",
              300: "#66CBC8",
              400: "#33BAB6",
              500: "#1E9C95",
              600: "#187D77",
              700: "#125E59",
              800: "#0C3E3C",
              900: "#061F1E",
            },
            yellow: {
              DEFAULT: "#FFDD59",
              50: "#FFFBEE",
              100: "#FFF7DD",
              200: "#FFEFBB",
              300: "#FFE799",
              400: "#FFE278",
              500: "#FFDD59",
              600: "#CCB147",
              700: "#998535",
              800: "#665823",
              900: "#332C12",
            },
            green: {
              DEFAULT: "#2ECC71",
              50: "#EAF9F1",
              100: "#D5F3E2",
              200: "#ABE7C6",
              300: "#82DBA9",
              400: "#58CF8D",
              500: "#2ECC71",
              600: "#25A35A",
              700: "#1C7B44",
              800: "#13522D",
              900: "#092916",
            },
          },
          earth: {
            brown: {
              DEFAULT: "#8D6E63",
              light: "#A18579",
              dark: "#725850",
            },
            gray: {
              DEFAULT: "#7F8C8D",
              light: "#95A5A6",
              dark: "#6C7A7B",
            },
            terracotta: {
              DEFAULT: "#E74C3C",
              light: "#EC7063",
              dark: "#C0392B",
            },
            forest: {
              DEFAULT: "#1E392A",
              light: "#2D5741",
              dark: "#122218",
            },
          },
          neutral: {
            parchment: "#F5EFE6",
            sandstone: "#E6D7B9",
            charcoal: "#2D3436",
          },
        },

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
          primary: "#FF7E00",
          secondary: "#C62828",
          accent: "#FFD700",
          purple: "#6C5CE7",
          green: "#4CD137",
          saffron: "#F9A825",
          gold: "#FFD700",
          light: "#FFF9F0",
          dark: "#1A0F00",
          "bg-light": "#FFF9F0", 
          "bg-dark": "#1A0F00",
        },
        
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "primary-brand": {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        "secondary-brand": {
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
        "accent-brand": {
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
        heading: ["Mukta Vaani", "Montserrat", "sans-serif"],
        body: ["Inter", "Manrope", "sans-serif"],
        story: ["Georgia", "serif"],
        gujarati: ["Mukta Vaani", "sans-serif"],
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
        "gentle-pulse": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out": {
          from: { opacity: "1", transform: "translateY(0)" },
          to: { opacity: "0", transform: "translateY(10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gentle-pulse": "gentle-pulse 2s infinite ease-in-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "fade-out": "fade-out 0.5s ease-out forwards",
      },
      backgroundImage: {
        'hanuman-bg': "url('/lovable-uploads/e972aa49-7146-43ba-a1e8-b6e0b5f975d5.png')",
        'hanuman-gradient': 'linear-gradient(135deg, rgba(255, 126, 0, 0.1) 0%, rgba(198, 40, 40, 0.1) 100%)',
        'chakra-pattern': "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23FFD700' stroke-width='1' stroke-opacity='0.1'%3E%3Ccircle cx='40' cy='40' r='36'/%3E%3Ccircle cx='40' cy='40' r='28'/%3E%3Ccircle cx='40' cy='40' r='20'/%3E%3Cpath d='M40 4 L40 76 M4 40 L76 40 M11.7 11.7 L68.3 68.3 M11.7 68.3 L68.3 11.7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
