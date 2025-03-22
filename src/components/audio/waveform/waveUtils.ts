// Generate amplitudes for a fluid, natural-looking wave animation
export const generateFluidAmplitudes = (
  prevAmplitudes: number[], 
  sensitivity: number = 1
): number[] => {
  // Ensure we have a valid array to work with
  if (!prevAmplitudes || prevAmplitudes.length === 0) {
    return Array(40).fill(0.1);
  }
  
  // Create new amplitudes that are related to the previous ones
  // for a more natural and less jarring transition
  return prevAmplitudes.map(prev => {
    // Calculate change - larger sensitivity means more dramatic changes
    const change = (Math.random() - 0.5) * 0.3 * sensitivity;
    
    // New value based on previous + change
    let newValue = prev + change;
    
    // Keep within reasonable bounds (0.1 to 0.8)
    newValue = Math.max(0.1, Math.min(0.8, newValue));
    
    return newValue;
  });
};

// Generate visualization data from audio analysis
export const generateVisualizationFromAudio = (
  audioData: Uint8Array,
  numPoints: number = 40
): number[] => {
  // If we don't have enough data, return a flat line
  if (!audioData || audioData.length === 0) {
    return Array(numPoints).fill(0.1);
  }
  
  const result: number[] = [];
  const step = Math.floor(audioData.length / numPoints);
  
  // Sample points from the frequency data
  for (let i = 0; i < numPoints; i++) {
    const index = i * step;
    if (index < audioData.length) {
      // Convert to a value between 0.1 and 0.9
      const normalizedValue = 0.1 + (audioData[index] / 255) * 0.8;
      result.push(normalizedValue);
    } else {
      result.push(0.1);
    }
  }
  
  return result;
};

// Smooth out amplitude transitions for a more pleasing visual
export const smoothAmplitudes = (
  currentAmplitudes: number[],
  targetAmplitudes: number[],
  smoothingFactor: number = 0.3
): number[] => {
  if (currentAmplitudes.length !== targetAmplitudes.length) {
    return targetAmplitudes;
  }
  
  return currentAmplitudes.map((current, i) => {
    const target = targetAmplitudes[i];
    // Linear interpolation between current and target
    return current + (target - current) * smoothingFactor;
  });
};
