
// Define the types of devices we can detect
export type ProximityDeviceType = 'bluetooth' | 'wifi' | 'nfc' | 'uwb';

export interface ProximityDevice {
  id: string;
  name: string;
  type: ProximityDeviceType;
  distance?: number; // Approximate distance in meters (if available)
  rssi?: number; // Signal strength
  lastSeen: Date;
  metadata?: Record<string, any>; // Additional device-specific data
}

export interface UseProximityDetectionOptions {
  enabled?: boolean;
  onDeviceDetected?: (device: ProximityDevice) => void;
  onDeviceLost?: (deviceId: string) => void;
  detectionInterval?: number; // in milliseconds
  signalThreshold?: number; // RSSI threshold for considering a device "near"
  crowdedEnvironment?: boolean; // Optimize for crowded environments
  batteryEfficient?: boolean; // Optimize for battery efficiency
  deviceFilters?: Partial<ProximityDevice>[]; // Filter specific devices
  offlineMode?: boolean; // Continue tracking when offline
}

export interface DeviceHistory {
  appearances: number;
  lastRssi: number[];
}
