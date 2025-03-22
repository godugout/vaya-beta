
import React from 'react';
import { Bluetooth, Wifi, MapPin, UserRound } from 'lucide-react';
import { ProximityDevice } from '@/hooks/proximityDetection/types';

interface DeviceIconProps {
  device: ProximityDevice;
  className?: string;
}

export function DeviceIcon({ device, className }: DeviceIconProps) {
  // Determine icon based on device type
  switch (device.type) {
    case 'bluetooth':
      return <Bluetooth className={className} />;
    case 'wifi':
      return <Wifi className={className} />;
    case 'nfc':
      return <MapPin className={className} />;
    case 'uwb':
      return <UserRound className={className} />;
    default:
      return <UserRound className={className} />;
  }
}
