
export function useProximityStyles() {
  const proximityStyles = {
    nearby: {
      color: 'text-green-500',
      position: { x: 0, y: 0 },
      ring: 'ring-green-500/20',
      animPulse: true
    },
    close: {
      color: 'text-blue-500',
      position: { x: -20, y: 20 },
      ring: 'ring-blue-500/20',
      animPulse: false
    },
    distant: {
      color: 'text-gray-500',
      position: { x: 30, y: -20 },
      ring: 'ring-gray-500/20',
      animPulse: false
    },
    unknown: {
      color: 'text-gray-400',
      position: { x: 40, y: 30 },
      ring: 'ring-gray-400/10',
      animPulse: false
    }
  };
  
  return proximityStyles;
}
