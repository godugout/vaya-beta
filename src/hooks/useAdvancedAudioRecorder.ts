
import { useState, useRef, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface AdvancedAudioConfig {
  sampleRate?: number;
  bitDepth?: number;
  silenceThreshold?: number;
  silenceTimeout?: number;
}

export const useAdvancedAudioRecorder = (config: AdvancedAudioConfig = {}) => {
  const {
    sampleRate = 48000,
    bitDepth = 16,
    silenceThreshold = -45, // dB
    silenceTimeout = 2000, // ms
  } = config;

  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [volume, setVolume] = useState(0);
  const [duration, setDuration] = useState(0);
  const { toast } = useToast();

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const silenceStartRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number>();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        }
      });

      streamRef.current = stream;
      const audioContext = new AudioContext({ sampleRate });
      audioContextRef.current = audioContext;

      // Create analyzer for volume monitoring
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      analyserRef.current = analyser;

      // Connect audio nodes
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      // Create MediaRecorder with opus codec if available
      const options: MediaRecorderOptions = {
        mimeType: MediaRecorder.isTypeSupported('audio/webm;codecs=opus') 
          ? 'audio/webm;codecs=opus' 
          : 'audio/webm'
      };

      const recorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(audioBlob);
        setIsRecording(false);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };

      // Start recording
      recorder.start(100);
      startTimeRef.current = Date.now();
      setIsRecording(true);

      // Start volume monitoring
      const monitorVolume = () => {
        if (!analyser || !isRecording) return;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(dataArray);

        // Calculate average volume
        const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
        const normalizedVolume = average / 255;
        setVolume(normalizedVolume);

        // Calculate duration
        setDuration((Date.now() - startTimeRef.current) / 1000);

        // Check for silence
        if (normalizedVolume < silenceThreshold) {
          if (!silenceStartRef.current) {
            silenceStartRef.current = Date.now();
          } else if (Date.now() - silenceStartRef.current > silenceTimeout) {
            stopRecording();
            return;
          }
        } else {
          silenceStartRef.current = null;
        }

        animationFrameRef.current = requestAnimationFrame(monitorVolume);
      };

      monitorVolume();

    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        variant: "destructive",
        title: "Recording Error",
        description: "Could not start recording. Please check your microphone permissions.",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      streamRef.current?.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return {
    isRecording,
    audioBlob,
    volume,
    duration,
    startRecording,
    stopRecording
  };
};
