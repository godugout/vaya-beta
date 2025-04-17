
// Transition durations and easings
export const transitionAnimations = {
  duration: {
    fast: "200ms",
    default: "300ms",
    slow: "400ms",
    slower: "600ms",
    pulse: "1500ms",
  },
  transition: {
    default: "all 0.3s ease",
    bounce: "all 0.4s cubic-bezier(0.68, -0.6, 0.32, 1)",
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
