import { useState, useEffect, useRef } from 'react';

export const useSpeechRecognition = (onFinalTranscript?: (text: string) => void) => {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [finalTranscript, setFinalTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side before initializing
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('Speech Recognition API is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ru-RU';
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let final = '';
      let interim = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          final += result[0].transcript + ' ';
        } else {
          interim += result[0].transcript;
        }
      }

      if (final) {
        setFinalTranscript((prev) => {
          const updated = prev + final;
          onFinalTranscript?.(final.trim());
          return updated;
        });
      }

      setInterimTranscript(interim);
    };

    recognition.onend = () => {
      if (isListening) {
        recognition.start();
      }
    };

    recognitionRef.current = recognition;
  }, [isClient, isListening, onFinalTranscript]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setFinalTranscript('');
      setInterimTranscript('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return {
    transcript: finalTranscript + interimTranscript,
    finalTranscript,
    interimTranscript,
    isListening,
    startListening,
    stopListening,
    canUseRecognition: isClient && !!recognitionRef.current,
  };
};
