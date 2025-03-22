/**
 * Utility functions for creating dynamic waveform visualizations
 * inspired by Vedic elements (water, fire, air)
 */

// Generate smooth, fluid amplitudes (water-like)
export const generateFluidAmplitudes = (
  prevAmplitudes: number[],
  intensity: number = 1
): number[] => {
  return prevAmplitudes.map((prev) => {
    // Create smooth transitions between values (water-like effect)
    const change = (Math.random() - 0.5) * 0.2 * intensity;
    let newValue = prev + change;
    
    // Keep values within bounds
    newValue = Math.max(0.05, Math.min(0.8, newValue));
    
    return newValue;
  });
};

// Generate more dynamic, rising amplitudes (flame-like)
export const generateFlamingAmplitudes = (
  prevAmplitudes: number[],
  intensity: number = 1
): number[] => {
  return prevAmplitudes.map((prev, i) => {
    // Create more vertical movement with occasional sharp peaks
    const flameEffect = Math.random() < 0.2 ? 0.3 * intensity : 0.1;
    const change = (Math.random() - 0.3) * flameEffect;
    
    // Central values tend to be higher (like flame center)
    const centerInfluence = 0.1 * Math.abs(i - prevAmplitudes.length / 2) / (prevAmplitudes.length / 4);
    
    let newValue = prev + change + centerInfluence;
    newValue = Math.max(0.05, Math.min(0.9, newValue));
    
    return newValue;
  });
};

// Generate gentle, breeze-like amplitudes
export const generateBreezeAmplitudes = (
  prevAmplitudes: number[],
  intensity: number = 1
): number[] => {
  return prevAmplitudes.map((prev) => {
    // Create gentle, subtle movements
    const change = (Math.random() - 0.5) * 0.08 * intensity;
    let newValue = prev + change;
    
    // Keep values low for gentle breeze effect
    newValue = Math.max(0.02, Math.min(0.4, newValue));
    
    return newValue;
  });
};

// Analyze audio data to determine emotional state
export const analyzeAudioEmotion = (audioData: Float32Array): 'calm' | 'passionate' | 'soft' => {
  // A simplified version of emotion detection based on amplitude
  const sum = audioData.reduce((acc, val) => acc + Math.abs(val), 0);
  const average = sum / audioData.length;
  
  if (average > 0.4) return 'passionate';
  if (average < 0.15) return 'soft';
  return 'calm';
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
