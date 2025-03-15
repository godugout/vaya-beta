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
 * Creates random amplitude data for simulating live recording with
 * enhanced dynamic response and natural patterns
 */
export const generateFluidAmplitudes = (
  prevAmplitudes: number[], 
  sensitivity: number = 1.5
): number[] => {
  // Implement improved "natural" waveform algorithm
  return prevAmplitudes.map((amplitude, i) => {
    // Get adjacent amplitudes with wrap-around
    const prevIndex = i === 0 ? prevAmplitudes.length - 1 : i - 1;
    const nextIndex = i === prevAmplitudes.length - 1 ? 0 : i + 1;
    const prev = prevAmplitudes[prevIndex];
    const next = prevAmplitudes[nextIndex];
    
    // Random change with slight neighbor influence for natural flow
    const neighborInfluence = (prev + next) * 0.03;
    
    // Add some randomness scaled by sensitivity
    const randomChange = (Math.random() * 0.1 - 0.05) * sensitivity;
    
    // Create periodic patterns to simulate speech/audio rhythm
    const periodicComponent = Math.sin(Date.now() / 500 + i / 5) * 0.03 * sensitivity;
    
    // Calculate new value using all components
    const newValue = amplitude + randomChange + neighborInfluence + periodicComponent;
    
    // Keep within reasonable bounds
    return Math.max(0.05, Math.min(0.95, newValue));
  });
};

/**
 * Process audio data for visualization with noise filtering
 */
export const processAudioData = (
  audioData: Uint8Array,
  noiseFloor: number = 10,
  sensitivity: number = 1.5
): number[] => {
  return Array.from(audioData).map(value => {
    // Apply noise floor filtering
    const normalizedValue = Math.max(0, value - noiseFloor) / (255 - noiseFloor);
    
    // Apply sensitivity scaling
    const scaledValue = Math.pow(normalizedValue, 0.7) * sensitivity;
    
    // Keep within bounds
    return Math.min(1, scaledValue);
  });
};

/**
 * Smooth out waveform transitions for more pleasant visualization
 */
export const smoothWaveform = (
  currentAmplitudes: number[],
  targetAmplitudes: number[],
  smoothingFactor: number = 0.3
): number[] => {
  return currentAmplitudes.map((current, i) => {
    const target = targetAmplitudes[i] || current;
    return current + (target - current) * smoothingFactor;
  });
};
