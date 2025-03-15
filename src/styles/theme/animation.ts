
export const animation = {
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
  duration: {
    fast: "200ms",
    default: "300ms",
    slow: "400ms",
    pulse: "1500ms",
  },
};
