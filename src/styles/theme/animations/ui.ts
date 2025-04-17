
// UI interaction animations
export const uiAnimations = {
  keyframes: {
    shimmer: {
      "0%": { backgroundPosition: "-500px 0" },
      "100%": { backgroundPosition: "500px 0" },
    },
    gradientFlow: {
      "0%": { backgroundPosition: "0% 50%" },
      "50%": { backgroundPosition: "100% 50%" },
      "100%": { backgroundPosition: "0% 50%" },
    },
    growShrink: {
      "0%, 100%": { transform: "scale(1)" },
      "50%": { transform: "scale(1.1)" },
    },
    recordingPulse: {
      "0%": { 
        transform: "scale(1)", 
        boxShadow: "0 0 0 0 rgba(255, 118, 117, 0.7)" 
      },
      "70%": { 
        transform: "scale(1.05)", 
        boxShadow: "0 0 0 10px rgba(255, 118, 117, 0)" 
      },
      "100%": { 
        transform: "scale(1)", 
        boxShadow: "0 0 0 0 rgba(255, 118, 117, 0)" 
      },
    },
    successPulse: {
      "0%": { 
        boxShadow: "0 0 0 0 rgba(0, 206, 201, 0.7)" 
      },
      "70%": { 
        boxShadow: "0 0 0 10px rgba(0, 206, 201, 0)" 
      },
      "100%": { 
        boxShadow: "0 0 0 0 rgba(0, 206, 201, 0)" 
      },
    },
    shine: {
      "0%": { 
        backgroundPosition: "-200px 0" 
      },
      "100%": { 
        backgroundPosition: "calc(200px + 100%) 0" 
      }
    },
    reveal: {
      "0%": { 
        clipPath: "inset(0 100% 0 0)" 
      },
      "100%": { 
        clipPath: "inset(0 0 0 0)" 
      }
    },
    sparkle: {
      "0%, 100%": { 
        opacity: "0", 
        transform: "scale(0)" 
      },
      "50%": { 
        opacity: "1", 
        transform: "scale(1)" 
      }
    },
    bubbleUp: {
      "0%": { 
        opacity: "0", 
        transform: "translateY(20px) scale(0.8)" 
      },
      "70%": { 
        opacity: "1", 
        transform: "translateY(-5px) scale(1.05)" 
      },
      "100%": { 
        opacity: "1", 
        transform: "translateY(0) scale(1)" 
      }
    },
    jelly: {
      "0%, 100%": { 
        transform: "scale(1, 1)" 
      },
      "25%": { 
        transform: "scale(0.95, 1.05)" 
      },
      "50%": { 
        transform: "scale(1.05, 0.95)" 
      },
      "75%": { 
        transform: "scale(0.95, 1.05)" 
      }
    },
  },
  animations: {
    shimmer: "shimmer 2s infinite linear",
    gradientFlow: "gradientFlow 6s ease infinite",
    growShrink: "growShrink 2s ease-in-out infinite",
    recordingPulse: "recordingPulse 1.5s infinite",
    successPulse: "successPulse 1.5s",
    shine: "shine 3s infinite",
    reveal: "reveal 0.5s forwards cubic-bezier(0.16, 1, 0.3, 1)",
    sparkle: "sparkle 2s infinite",
    bubbleUp: "bubbleUp 0.6s forwards cubic-bezier(0.34, 1.56, 0.64, 1)",
    jelly: "jelly 0.8s forwards cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  }
};
