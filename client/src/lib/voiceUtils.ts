import type { Language } from "./translations";
import { apiRequest } from "./queryClient";

// BCP-47 codes — used by VoiceInput (STT) and Web Speech API fallback
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

// ElevenLabs voice IDs — eleven_multilingual_v2 handles all 10 languages
// Visit https://elevenlabs.io/voice-library to pick different voices per language
export const ELEVENLABS_VOICE_IDS: Record<Language, string> = {
  en: "21m00Tcm4TlvDq8ikWAM",  // Rachel — clear American English
  es: "VR6AewLTigWG4xSOukaG",  // Arnold — Spanish
  zh: "21m00Tcm4TlvDq8ikWAM",  // Rachel (multilingual v2 handles Mandarin)
  hi: "21m00Tcm4TlvDq8ikWAM",  // Rachel (multilingual v2 handles Hindi)
  ar: "21m00Tcm4TlvDq8ikWAM",  // Rachel (multilingual v2 handles Arabic)
  fr: "MF3mGyEYCl7XYWbV9V6O",  // Elli — French
  pt: "21m00Tcm4TlvDq8ikWAM",  // Rachel (multilingual v2 handles Portuguese)
  vi: "21m00Tcm4TlvDq8ikWAM",  // Rachel (multilingual v2 handles Vietnamese)
  ko: "21m00Tcm4TlvDq8ikWAM",  // Rachel (multilingual v2 handles Korean)
  tl: "21m00Tcm4TlvDq8ikWAM",  // Rachel (multilingual v2 handles Filipino)
};

// ---------------------------------------------------------------------------
// Module-level audio singleton — tracks the active <audio> element
// ---------------------------------------------------------------------------
let activeAudio: HTMLAudioElement | null = null;
let activeObjectUrl: string | null = null;

function releaseActiveAudio() {
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.src = "";
    activeAudio = null;
  }
  if (activeObjectUrl) {
    URL.revokeObjectURL(activeObjectUrl);
    activeObjectUrl = null;
  }
}

// ---------------------------------------------------------------------------
// Public TTS API
// ---------------------------------------------------------------------------

/**
 * Speak text using ElevenLabs (via /api/tts proxy) with Web Speech API fallback.
 *
 * @param text   Text to speak
 * @param lang   App language code
 * @param onEnd  Called when ElevenLabs playback ends. Not called for Web Speech
 *               fallback — VoiceButton polls isSpeaking() in that case.
 */
export async function speakText(
  text: string,
  lang: Language,
  onEnd: () => void = () => {},
): Promise<void> {
  releaseActiveAudio();

  try {
    const response = await apiRequest("POST", "/api/tts", {
      text,
      voiceId: ELEVENLABS_VOICE_IDS[lang],
    });
    const blob = await response.blob();
    activeObjectUrl = URL.createObjectURL(blob);
    activeAudio = new Audio(activeObjectUrl);
    activeAudio.onended = () => { releaseActiveAudio(); onEnd(); };
    activeAudio.onerror = () => { releaseActiveAudio(); onEnd(); };
    await activeAudio.play();
  } catch (err) {
    console.warn("ElevenLabs TTS failed, falling back to Web Speech API:", err);

    // Web Speech API fallback
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = LANGUAGE_CODES[lang] || "en-US";
    utterance.rate = 0.9;
    utterance.pitch = 1;
    const voices = window.speechSynthesis.getVoices();
    const langPrefix = utterance.lang.split("-")[0];
    const voice =
      voices.find((v) => v.lang.startsWith(langPrefix)) ||
      voices.find((v) => v.lang.startsWith("en"));
    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
    // onEnd is not called for Web Speech path — callers poll isSpeaking()
  }
}

export function stopSpeaking(): void {
  releaseActiveAudio();
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}

export function isSpeaking(): boolean {
  if (activeAudio && !activeAudio.paused && !activeAudio.ended) return true;
  return "speechSynthesis" in window && window.speechSynthesis.speaking;
}

// ---------------------------------------------------------------------------
// Speech-to-Text (STT) — ElevenLabs Scribe v1 via MediaRecorder
// Works on all browsers (Chrome, Safari, Firefox, iOS) unlike Web Speech API
// ---------------------------------------------------------------------------
export class ElevenLabsVoiceInput {
  private mediaRecorder: MediaRecorder | null = null;
  private chunks: Blob[] = [];
  private lang: Language;
  private onResult: (text: string) => void;
  private onError: (error: string) => void;
  private onStart: () => void;
  private onEnd: () => void;
  private stream: MediaStream | null = null;

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
  }

  isSupported(): boolean {
    return !!((navigator.mediaDevices as unknown as Record<string, unknown>)?.["getUserMedia"] && "MediaRecorder" in window);
  }

  async start(): Promise<void> {
    if (!this.isSupported()) {
      this.onError("MediaRecorder not supported in this browser");
      return;
    }
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.chunks = [];
      this.mediaRecorder = new MediaRecorder(this.stream);

      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) this.chunks.push(e.data);
      };

      this.mediaRecorder.onstop = async () => {
        this.releaseStream();
        const blob = new Blob(this.chunks, { type: "audio/webm" });
        this.chunks = [];
        try {
          const formData = new FormData();
          formData.append("audio", blob, "audio.webm");
          // Pass language prefix (e.g. "hi", "ar") to improve Scribe accuracy
          formData.append("language_code", LANGUAGE_CODES[this.lang].split("-")[0]);
          // Use raw fetch — apiRequest forces Content-Type: application/json,
          // but FormData needs multipart/form-data with a browser-generated boundary
          const res = await fetch("/api/stt", { method: "POST", body: formData });
          if (!res.ok) throw new Error(await res.text());
          const data = await res.json() as { text: string };
          this.onResult(data.text);
        } catch (err: any) {
          this.onError(err.message || "STT request failed");
        } finally {
          this.onEnd();
        }
      };

      this.mediaRecorder.start();
      this.onStart();
    } catch (err: any) {
      this.onError(err.message || "Microphone access denied");
    }
  }

  stop(): void {
    if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
      this.mediaRecorder.stop();
    }
  }

  private releaseStream(): void {
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;
  }

  setLanguage(lang: Language): void {
    this.lang = lang;
  }
}

// ---------------------------------------------------------------------------
// Speech-to-Text (STT) — legacy Web Speech API fallback (Chrome desktop only)
// ---------------------------------------------------------------------------
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
