import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { speakText, stopSpeaking, isSpeaking } from "@/lib/voiceUtils";
import type { Language } from "@/lib/translations";

interface Props {
  text: string;
  lang: Language;
  className?: string;
}

export default function VoiceButton({ text, lang, className = "" }: Props) {
  const [playing, setPlaying] = useState(false);

  function toggle() {
    if (playing) {
      stopSpeaking();
      setPlaying(false);
    } else {
      setPlaying(true);
      speakText(text, lang);
      // Poll for end of speech
      const check = setInterval(() => {
        if (!isSpeaking()) {
          setPlaying(false);
          clearInterval(check);
        }
      }, 200);
    }
  }

  return (
    <button
      data-testid="btn-voice-read"
      onClick={toggle}
      className={`inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors ${className}`}
      title={playing ? "Stop reading" : "Listen to this"}
    >
      {playing ? (
        <>
          <span className="voice-wave flex items-end gap-0.5 h-4">
            <span /><span /><span /><span />
          </span>
          <VolumeX className="w-3.5 h-3.5" />
        </>
      ) : (
        <Volume2 className="w-3.5 h-3.5" />
      )}
    </button>
  );
}
