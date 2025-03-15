/**
 * Helper function to generate a smooth wave path from amplitudes
 */
export const generateWavePath = (amplitudes: number[]): string => {
  const height = 100;
  const middle = height / 2;
  const width = 800;
  const segmentWidth = width / (amplitudes.length - 1);
  
  let path = `M 0 ${middle}`;
  
  // First point
  const firstY = middle - amplitudes[0] * 40;
  path += ` C ${segmentWidth * 0.25} ${firstY}, ${segmentWidth * 0.75} ${firstY}, ${segmentWidth} ${middle - amplitudes[1] * 40}`;
  
  // Middle points with bezier curves for smoothness
  for (let i = 1; i < amplitudes.length - 2; i++) {
    const x = i * segmentWidth;
    const y = middle - amplitudes[i] * 40;
    const nextY = middle - amplitudes[i + 1] * 40;
    
    // Control points for the bezier curve
    const cp1x = x + segmentWidth / 3;
    const cp1y = y;
    const cp2x = x + (2 * segmentWidth) / 3;
    const cp2y = nextY;
    const endX = x + segmentWidth;
    const endY = nextY;
    
    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
  }
  
  // Last point
  const lastIndex = amplitudes.length - 1;
  const lastY = middle - amplitudes[lastIndex] * 40;
  const beforeLastY = middle - amplitudes[lastIndex - 1] * 40;
  path += ` C ${(lastIndex - 0.75) * segmentWidth} ${beforeLastY}, ${(lastIndex - 0.25) * segmentWidth} ${lastY}, ${lastIndex * segmentWidth} ${middle}`;
  
  return path;
};

/**
 * Creates random amplitude data for simulating live recording
 */
export const generateFluidAmplitudes = (prevAmplitudes: number[]): number[] => {
  return prevAmplitudes.map((amplitude, i) => {
    const prevIndex = i === 0 ? prevAmplitudes.length - 1 : i - 1;
    const nextIndex = i === prevAmplitudes.length - 1 ? 0 : i + 1;
    
    // Mix the current value with neighbors for a more fluid effect
    const change = Math.random() * 0.1 - 0.05;
    const newValue = amplitude + change + (prevAmplitudes[prevIndex] + prevAmplitudes[nextIndex]) * 0.03;
    
    // Keep within bounds
    return Math.max(0.1, Math.min(1, newValue));
  });
};
