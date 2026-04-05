import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { speakText, stopSpeaking, isSpeaking } from "@/lib/voiceUtils";
import type { Language } from "@/lib/translations";

interface Props {
  text: string;
  lang: Language;
  className?: string;
}

type PlayState = "idle" | "loading" | "playing";

export default function VoiceButton({ text, lang, className = "" }: Props) {
  const [state, setState] = useState<PlayState>("idle");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function clearPoll() {
    if (pollRef.current !== null) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }

  function handleEnd() {
    clearPoll();
    setState("idle");
  }

  async function toggle() {
    if (state === "loading") return;

    if (state === "playing") {
      stopSpeaking();
      clearPoll();
      setState("idle");
      return;
    }

    setState("loading");
    try {
      await speakText(text, lang, handleEnd);
      if (isSpeaking()) {
        setState("playing");
        // Belt-and-suspenders poll for Web Speech API fallback path
        pollRef.current = setInterval(() => {
          if (!isSpeaking()) handleEnd();
        }, 200);
      } else {
        setState("idle");
      }
    } catch {
      setState("idle");
    }
  }

  return (
    <button
      data-testid="btn-voice-read"
      onClick={toggle}
      disabled={state === "loading"}
      className={`inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors disabled:opacity-50 ${className}`}
      title={state !== "idle" ? "Stop reading" : "Listen to this"}
    >
      {state === "loading" ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : state === "playing" ? (
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
