
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
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
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        story: ['Georgia', 'serif'],
        gujarati: ['Rasa', 'serif'],
        hindi: ['Baloo Bhai 2', 'sans-serif'],
      },
      colors: {
        // Brand colors per specification
        'vaya-coral': {
          DEFAULT: '#FF7675', // Primary coral
          light: '#FFA8A7',
          dark: '#D15A59'
        },
        'vaya-purple': {
          DEFAULT: '#6C5CE7', // Secondary purple
          light: '#A195F7',
          dark: '#4A3BBF'
        },
        'vaya-green': {
          DEFAULT: '#4CD137', // Tertiary green
          light: '#7EE76C',
          dark: '#35A220'
        },
        'vaya-magenta': {
          DEFAULT: '#D946EF',
          light: '#E67AF7',
          dark: '#B224CD'
        },
        
        // Legacy lovable colors maintained for compatibility
        'lovable-coral': '#FF7675',
        'lovable-purple': '#6C5CE7',
        'lovable-green': '#4CD137',
        'lovable-magenta': '#D946EF',
        'lovable-magenta-bright': '#E05FFF',
        'ui-orange': '#F97316',
        'dark-background': {
          base: '#1A1F2C',
          elevated: '#20263A',
          surface: '#2D2B55'
        },
        'dark-text': {
          primary: '#FFFFFF',
          secondary: 'rgba(255, 255, 255, 0.70)',
          tertiary: 'rgba(255, 255, 255, 0.45)',
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
      // Implement an 8px grid system
      spacing: {
        0: '0',
        1: '8px',
        2: '16px',
        3: '24px',
        4: '32px',
        5: '40px',
        6: '48px',
        7: '56px',
        8: '64px',
        9: '72px',
        10: '80px',
      },
      // Elevation system
      boxShadow: {
        'elevation-1': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        'elevation-2': '0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
        'elevation-3': '0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)',
        'elevation-4': '0 15px 25px rgba(0,0,0,0.15), 0 5px 10px rgba(0,0,0,0.05)',
        'elevation-5': '0 20px 40px rgba(0,0,0,0.2)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
