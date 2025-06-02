declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }

  interface SpeechRecognition extends EventTarget {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    start(): void;
    stop(): void;
    abort(): void;
    onaudioend?: (this: SpeechRecognition, ev: Event) => any;
    onend?: (this: SpeechRecognition, ev: Event) => any;
    onerror?: (this: SpeechRecognition, ev: Event) => any;
    onnomatch?: (this: SpeechRecognition, ev: Event) => any;
    onresult?: (this: SpeechRecognition, ev: SpeechRecognitionEvent) => any;
    onsoundend?: (this: SpeechRecognition, ev: Event) => any;
    onspeechend?: (this: SpeechRecognition, ev: Event) => any;
    onstart?: (this: SpeechRecognition, ev: Event) => any;
  }

  interface SpeechRecognitionEvent extends Event {
    resultIndex: number;
    results: SpeechRecognitionResultList;
  }

  interface SpeechRecognitionResultList {
    [index: number]: SpeechRecognitionResult;
    length: number;
  }

  interface SpeechRecognitionResult {
    [index: number]: SpeechRecognitionAlternative;
    isFinal: boolean;
    length: number;
  }

  interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
  }
}

export {};
