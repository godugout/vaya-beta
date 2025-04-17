
// Basic animation keyframes
export const keyframesAnimations = {
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
    fadeInSlide: {
      "0%": { opacity: "0", transform: "translateY(20px)" },
      "100%": { opacity: "1", transform: "translateY(0)" },
    },
    pulse: {
      "0%, 100%": { opacity: "1", transform: "scale(1)" },
      "50%": { opacity: "0.85", transform: "scale(1.05)" },
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
  },
  animations: {
    "accordion-down": "accordion-down 0.2s ease-out",
    "accordion-up": "accordion-up 0.2s ease-out",
    fadeIn: "fadeIn 0.5s ease-out forwards",
    fadeInSlide: "fadeInSlide 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
    pulse: "pulse 1.5s ease-in-out infinite",
    wave: "wave 2s ease-in-out infinite",
    bounce: "bounce 1s cubic-bezier(0.28, 0.84, 0.42, 1) infinite",
  }
};
