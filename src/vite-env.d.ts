
/// <reference types="vite/client" />

interface Window {
  BarcodeDetector?: {
    new(options?: { formats?: string[] }): BarcodeDetector;
  }
}

interface BarcodeDetector {
  detect(image: ImageBitmapSource): Promise<Array<{
    boundingBox: DOMRectReadOnly;
    cornerPoints: Array<{x: number, y: number}>;
    format: string;
    rawValue: string;
  }>>;
}

interface Navigator {
  bluetooth?: {
    requestDevice(options: { acceptAllDevices?: boolean; filters?: Array<{ namePrefix?: string; services?: string[] }>; optionalServices?: string[] }): Promise<any>;
  }
}

interface Window {
  SpeechRecognition?: typeof SpeechRecognition;
  webkitSpeechRecognition?: typeof SpeechRecognition;
}

interface SpeechRecognition extends EventTarget {
  new(): SpeechRecognition;
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: any) => void;
  onend: () => void;
  onstart: () => void;
  onerror: (event: any) => void;
  start(): void;
  stop(): void;
}
