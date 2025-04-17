
// Logo-specific animations
export const logoAnimations = {
  keyframes: {
    "logo-flip": {
      "0%": { 
        transform: "rotateY(0deg)" 
      },
      "100%": { 
        transform: "rotateY(360deg)" 
      }
    },
    "logo-shimmer": {
      "0%": { 
        filter: "brightness(1) drop-shadow(0 0 0 rgba(255, 255, 255, 0.7))" 
      },
      "50%": { 
        filter: "brightness(1.3) drop-shadow(0 0 5px rgba(255, 255, 255, 0.9))" 
      },
      "100%": { 
        filter: "brightness(1) drop-shadow(0 0 0 rgba(255, 255, 255, 0.7))" 
      }
    }
  },
  animations: {
    "logo-flip": "logo-flip 8s linear infinite",
    "logo-shimmer": "logo-shimmer 3s ease-in-out infinite"
  }
};
