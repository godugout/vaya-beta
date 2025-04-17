
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
    "logo-spin": {
      "0%": { 
        transform: "rotate(0deg)" 
      },
      "100%": { 
        transform: "rotate(360deg)" 
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
  animation: {
    "accordion-down": "accordion-down 0.2s ease-out",
    "accordion-up": "accordion-up 0.2s ease-out",
    fadeIn: "fadeIn 0.5s ease-out forwards",
    fadeInSlide: "fadeInSlide 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
    pulse: "pulse 1.5s ease-in-out infinite",
    wave: "wave 2s ease-in-out infinite",
    bounce: "bounce 1s cubic-bezier(0.28, 0.84, 0.42, 1) infinite",
    typing: "typing 3.5s steps(40, end)",
    blink: "blink 0.7s step-end infinite",
    wavePattern: "wavePattern 15s linear infinite",
    float: "float 3s ease-in-out infinite",
    breathe: "breathe 4s ease-in-out infinite",
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
    "logo-spin": "logo-spin 8s linear infinite",
    "logo-shimmer": "logo-shimmer 3s ease-in-out infinite"
  },
  duration: {
    fast: "200ms",
    default: "300ms",
    slow: "400ms",
    slower: "600ms",
    pulse: "1500ms",
  },
  transition: {
    default: "all 0.3s ease",
    bounce: "all 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6)",
    smooth: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    spring: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    elastic: "all 0.6s cubic-bezier(0.5, 1.5, 0.5, 0.9)",
  },
  easing: {
    standard: "cubic-bezier(0.4, 0, 0.2, 1)",
    bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    gentle: "cubic-bezier(0.4, 0.0, 0.2, 1)",
    elastic: "cubic-bezier(0.68, -0.6, 0.32, 1.6)"
  }
};
