import type { Language } from "./translations";

// Map our language codes to BCP 47 language tags for Web Speech API
const LANGUAGE_CODES: Record<Language, string> = {
  en: "en-US",
  es: "es-US",
  zh: "zh-CN",
  hi: "hi-IN",
  ar: "ar-SA",
  fr: "fr-FR",
  pt: "pt-BR",
  vi: "vi-VN",
  ko: "ko-KR",
  tl: "fil-PH",
};

export function speakText(text: string, lang: Language): void {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = LANGUAGE_CODES[lang] || "en-US";
  utterance.rate = 0.9;
  utterance.pitch = 1;
  
  // Try to find a voice for the language
  const voices = window.speechSynthesis.getVoices();
  const langPrefix = utterance.lang.split("-")[0];
  const voice = voices.find(v => v.lang.startsWith(langPrefix)) ||
    voices.find(v => v.lang.startsWith("en"));
  if (voice) utterance.voice = voice;

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}

export function isSpeaking(): boolean {
  return "speechSynthesis" in window && window.speechSynthesis.speaking;
}

export class VoiceInput {
  private recognition: any;
  private lang: Language;
  private onResult: (text: string) => void;
  private onError: (error: string) => void;
  private onStart: () => void;
  private onEnd: () => void;

  constructor(options: {
    lang: Language;
    onResult: (text: string) => void;
    onError?: (error: string) => void;
    onStart?: () => void;
    onEnd?: () => void;
  }) {
    this.lang = options.lang;
    this.onResult = options.onResult;
    this.onError = options.onError || (() => {});
    this.onStart = options.onStart || (() => {});
    this.onEnd = options.onEnd || (() => {});

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      this.recognition = null;
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.lang = LANGUAGE_CODES[this.lang] || "en-US";
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;
    this.recognition.continuous = false;

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      this.onResult(transcript);
    };

    this.recognition.onerror = (event: any) => {
      this.onError(event.error);
    };

    this.recognition.onstart = () => this.onStart();
    this.recognition.onend = () => this.onEnd();
  }

  isSupported(): boolean {
    return this.recognition !== null;
  }

  start(): void {
    if (this.recognition) {
      this.recognition.lang = LANGUAGE_CODES[this.lang] || "en-US";
      this.recognition.start();
    }
  }

  stop(): void {
    if (this.recognition) this.recognition.stop();
  }

  setLanguage(lang: Language): void {
    this.lang = lang;
    if (this.recognition) {
      this.recognition.lang = LANGUAGE_CODES[lang] || "en-US";
    }
  }
}
