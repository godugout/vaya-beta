
// Component-specific animations
export const componentAnimations = {
  keyframes: {
    typing: {
      "0%": { width: "0" },
      "100%": { width: "100%" },
    },
    blink: {
      "0%, 100%": { borderColor: "transparent" },
      "50%": { borderColor: "#6C5CE7" },
    },
    wavePattern: {
      "0%": { transform: "translateX(0)" },
      "100%": { transform: "translateX(-20%)" },
    },
    float: {
      "0%, 100%": { transform: "translateY(0)" },
      "50%": { transform: "translateY(-10px)" },
    },
    breathe: {
      "0%, 100%": { transform: "scale(1)", opacity: "1" },
      "50%": { transform: "scale(1.03)", opacity: "0.9" },
    },
  },
  animations: {
    typing: "typing 3.5s steps(40, end)",
    blink: "blink 0.7s step-end infinite",
    wavePattern: "wavePattern 15s linear infinite",
    float: "float 3s ease-in-out infinite",
    breathe: "breathe 4s ease-in-out infinite",
  }
};
