
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { colors } from "./src/styles/theme/colors";
import { typography } from "./src/styles/theme/typography";
import { animation } from "./src/styles/theme/animation";
import { spacing, borderRadius, shadows, zIndex } from "./src/styles/theme/spacing";

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
        vaya: colors.features,
        greystone: colors.greystone,
        lovable: colors.lovable,
        dark: colors.dark,
        
        border: colors.shadcn.border,
        input: colors.shadcn.input,
        ring: colors.shadcn.ring,
        background: colors.shadcn.background,
        foreground: colors.shadcn.foreground,
        primary: colors.shadcn.primary,
        secondary: colors.shadcn.secondary,
        destructive: colors.shadcn.destructive,
        muted: colors.shadcn.muted,
        accent: colors.shadcn.accent,
        popover: colors.shadcn.popover,
        card: colors.shadcn.card,
      },
      borderRadius,
      keyframes: animation.keyframes,
      animation: animation.animation,
      backgroundImage: {
        'wave-pattern': "url('/lovable-uploads/d42f87cc-df9d-4966-9975-10468e31ca27.png')",
        'nature-stream': "url('/lovable-uploads/744cdabd-c1ae-4fac-ad45-4625d3484965.png')",
        'nature-waterfall': "url('/lovable-uploads/509780e9-4a42-4d4f-b919-4d32e3656255.png')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

