
import React, { useState, useEffect, useRef } from 'react';
import { Camera, CameraOff, Check, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { AnimatedContainer } from '@/components/animation/AnimatedContainer';

interface QRCodeScannerProps {
  onScan: (data: string) => void;
  onError?: (error: Error) => void;
  onClose?: () => void;
}

export function QRCodeScanner({ onScan, onError, onClose }: QRCodeScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const [scanComplete, setScanComplete] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  // Initialize QR code scanner
  useEffect(() => {
    let stream: MediaStream | null = null;
    let animationFrameId: number | null = null;
    let worker: Worker | null = null;
    
    const initializeScanner = async () => {
      // First, check if BarcodeDetector API is available
      if ('BarcodeDetector' in window) {
        try {
          const barcodeDetector = new window.BarcodeDetector({
            formats: ['qr_code']
          });
          
          stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
          });
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            await videoRef.current.play();
            setCameraPermission(true);
            setScanning(true);
            
            const detectQRCode = async () => {
              if (!videoRef.current || !canvasRef.current || scanComplete) return;
              
              try {
                const barcodes = await barcodeDetector.detect(videoRef.current);
                
                if (barcodes.length > 0) {
                  const qrData = barcodes[0].rawValue;
                  setScanComplete(true);
                  setScanning(false);
                  
                  // Success feedback
                  const canvas = canvasRef.current;
                  const context = canvas.getContext('2d');
                  if (context) {
                    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                    
                    // Draw success overlay
                    context.fillStyle = 'rgba(0, 200, 0, 0.3)';
                    context.fillRect(0, 0, canvas.width, canvas.height);
                  }
                  
                  toast({
                    title: "QR Code Detected!",
                    description: "Successfully scanned code.",
                  });
                  
                  onScan(qrData);
                } else {
                  animationFrameId = requestAnimationFrame(detectQRCode);
                }
              } catch (error) {
                console.error('QR detection error:', error);
                animationFrameId = requestAnimationFrame(detectQRCode);
              }
            };
            
            detectQRCode();
          }
        } catch (error) {
          if (error instanceof Error) {
            if (error.name === 'NotAllowedError') {
              setCameraPermission(false);
              toast({
                title: "Camera Access Denied",
                description: "Please allow camera access to scan QR codes.",
                variant: "destructive"
              });
              onError?.(error);
            } else {
              console.error('Error accessing camera:', error);
              toast({
                title: "Camera Error",
                description: "Couldn't access your camera.",
                variant: "destructive"
              });
              onError?.(error);
            }
          }
        }
      } else {
        // Fallback to jsQR library if BarcodeDetector is not available
        try {
          // Dynamically import jsQR
          const jsQRModule = await import('jsqr');
          const jsQR = jsQRModule.default;
          
          stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
          });
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            await videoRef.current.play();
            setCameraPermission(true);
            setScanning(true);
            
            const detectQRCode = () => {
              if (!videoRef.current || !canvasRef.current || scanComplete) return;
              
              const canvas = canvasRef.current;
              const context = canvas.getContext('2d');
              
              if (context) {
                const width = videoRef.current.videoWidth;
                const height = videoRef.current.videoHeight;
                
                canvas.width = width;
                canvas.height = height;
                
                context.drawImage(videoRef.current, 0, 0, width, height);
                
                const imageData = context.getImageData(0, 0, width, height);
                const code = jsQR(imageData.data, width, height, {
                  inversionAttempts: 'dontInvert',
                });
                
                if (code) {
                  setScanComplete(true);
                  setScanning(false);
                  
                  // Draw success overlay
                  context.fillStyle = 'rgba(0, 200, 0, 0.3)';
                  context.fillRect(0, 0, width, height);
                  
                  toast({
                    title: "QR Code Detected!",
                    description: "Successfully scanned code.",
                  });
                  
                  onScan(code.data);
                } else {
                  animationFrameId = requestAnimationFrame(detectQRCode);
                }
              }
            };
            
            detectQRCode();
          }
        } catch (error) {
          if (error instanceof Error) {
            toast({
              title: "QR Scanner Error",
              description: error.message,
              variant: "destructive"
            });
            onError?.(error);
          }
        }
      }
    };
    
    if (scanning && !scanComplete) {
      initializeScanner();
    }
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (worker) {
        worker.terminate();
      }
    };
  }, [scanning, scanComplete, onScan, onError, toast]);

  const handleStartScanning = () => {
    setScanComplete(false);
    setScanning(true);
  };

  const handleClose = () => {
    setScanning(false);
    onClose?.();
  };

  const renderCameraPermissionState = () => {
    if (cameraPermission === false) {
      return (
        <div className="text-center p-6 space-y-4">
          <CameraOff className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="text-lg font-medium">Camera Access Needed</h3>
          <p className="text-sm text-gray-500">
            Please allow camera access in your browser settings to scan QR codes.
          </p>
          <Button onClick={handleClose}>Close</Button>
        </div>
      );
    }
    
    return (
      <div className="text-center p-6 space-y-4">
        <Camera className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="text-lg font-medium">Ready to Scan</h3>
        <p className="text-sm text-gray-500">
          Position the QR code within the camera view.
        </p>
        <Button onClick={handleStartScanning}>Start Scanning</Button>
      </div>
    );
  };

  return (
    <AnimatedContainer variant="fade" className="w-full max-w-md mx-auto">
      <div className="rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
        <div className="relative aspect-square overflow-hidden">
          {scanning ? (
            <>
              <video 
                ref={videoRef}
                className={`w-full h-full object-cover ${scanComplete ? 'hidden' : 'block'}`}
                playsInline
                muted
              />
              <canvas 
                ref={canvasRef}
                className={`w-full h-full object-cover ${scanComplete ? 'block' : 'hidden'}`}
              />
              <div className="absolute inset-0 border-2 border-white border-opacity-50 pointer-events-none" />
              {!scanComplete && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-48 border-2 border-green-500 rounded-lg animate-pulse" />
                </div>
              )}
            </>
          ) : (
            renderCameraPermissionState()
          )}
        </div>
        
        <div className="p-4 flex justify-between">
          {scanComplete ? (
            <>
              <Button variant="outline" onClick={handleStartScanning}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Scan Again
              </Button>
              <Button onClick={handleClose}>
                <Check className="mr-2 h-4 w-4" />
                Done
              </Button>
            </>
          ) : (
            <Button variant="ghost" onClick={handleClose} className="ml-auto">
              Cancel
            </Button>
          )}
        </div>
      </div>
    </AnimatedContainer>
  );
}
