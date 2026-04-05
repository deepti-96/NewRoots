import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Mic, Loader2, Volume2, Trash2 } from "lucide-react";
import { useApp } from "@/App";
import { apiRequest } from "@/lib/queryClient";
import { ElevenLabsVoiceInput, speakText, stopSpeaking } from "@/lib/voiceUtils";
import type { Language } from "@/lib/translations";
import ReactMarkdown from "react-markdown";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function AgentChatWidget() {
  const { user, language } = useApp();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [speakingIdx, setSpeakingIdx] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const voiceRef = useRef<ElevenLabsVoiceInput | null>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Show a welcome message when chat opens for the first time
  useEffect(() => {
    if (open && messages.length === 0) {
      const welcomeMap: Record<string, string> = {
        en: "Hi! I'm your NewRoots AI assistant. Ask me anything about your milestones — documents, benefits, links, next steps. How can I help?",
        es: "¡Hola! Soy tu asistente de NewRoots. Pregúntame sobre tus trámites, documentos, beneficios o próximos pasos. ¿En qué puedo ayudarte?",
        zh: "你好！我是你的NewRoots AI助手。你可以问我关于移民手续、文件、福利或下一步的任何问题。",
        hi: "नमस्ते! मैं आपका NewRoots AI सहायक हूँ। अपने दस्तावेज़ों, लाभों, या अगले कदमों के बारे में कुछ भी पूछें।",
        ar: "مرحباً! أنا مساعد NewRoots الذكي. اسألني أي شيء عن مراحلك — المستندات، المزايا، الروابط، الخطوات التالية.",
      };
      setMessages([{
        role: "assistant",
        content: welcomeMap[language] || welcomeMap.en,
      }]);
    }
  }, [open]);

  async function sendMessage(text: string, viaVoice = false) {
    if (!text.trim() || !user || loading) return;

    const userMsg: ChatMessage = { role: "user", content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await apiRequest("POST", "/api/chat", {
        text: text.trim(),
        userId: user.id,
      });
      const data = await res.json();
      const reply: ChatMessage = { role: "assistant", content: data.reply };
      setMessages(prev => [...prev, reply]);

      // Only auto-speak when the user asked via voice (mic)
      if (viaVoice) {
        speakText(data.reply, language, () => setSpeakingIdx(null));
        setSpeakingIdx(messages.length + 1);
      }
    } catch (err) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Sorry, I couldn't process that right now. Please try again.",
      }]);
    } finally {
      setLoading(false);
    }
  }

  function handleVoiceInput() {
    if (listening) {
      voiceRef.current?.stop();
      return;
    }
    voiceRef.current = new ElevenLabsVoiceInput({
      lang: language,
      onResult: (text: string) => {
        setInput(text);
        // Auto-send voice input and flag it as voice so the response is spoken back
        sendMessage(text, true);
      },
      onStart: () => setListening(true),
      onEnd: () => setListening(false),
      onError: (err: string) => {
        console.error("STT error:", err);
        setListening(false);
      },
    });
    voiceRef.current.start();
  }

  function speakMessage(content: string, idx: number) {
    if (speakingIdx === idx) {
      stopSpeaking();
      setSpeakingIdx(null);
      return;
    }
    stopSpeaking();
    speakText(content, language, () => setSpeakingIdx(null));
    setSpeakingIdx(idx);
  }

  async function clearChat() {
    if (!user) return;
    stopSpeaking();
    setSpeakingIdx(null);
    setMessages([]);
    try {
      await apiRequest("POST", "/api/chat/clear", { userId: user.id });
    } catch {}
  }

  if (!user) return null;

  return (
    <>
      {/* Floating Action Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-24 right-5 md:bottom-8 md:right-8 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-50 w-[calc(100vw-2rem)] max-w-[420px] h-[min(70vh,560px)] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-primary/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">AI</span>
              </div>
              <div>
                <p className="font-bold text-sm text-foreground">NewRoots Assistant</p>
                <p className="text-xs text-muted-foreground">Ask about your milestones</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                title="Clear chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => { setOpen(false); stopSpeaking(); }}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`relative max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md"
                }`}>
                  <div className="prose prose-sm w-full break-words max-w-none dark:prose-invert prose-p:leading-relaxed prose-pre:p-0">
                    <ReactMarkdown>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                  {msg.role === "assistant" && (
                    <button
                      onClick={() => speakMessage(msg.content, i)}
                      className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                        speakingIdx === i
                          ? "bg-primary text-primary-foreground"
                          : "bg-background border border-border text-muted-foreground hover:text-primary"
                      }`}
                      title="Listen to this"
                    >
                      <Volume2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-muted text-muted-foreground px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="border-t border-border px-3 py-2.5 bg-background">
            <div className="flex items-center gap-2">
              <button
                onClick={handleVoiceInput}
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  listening
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10"
                }`}
                title={listening ? "Stop recording" : "Speak your question"}
              >
                <Mic className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }}}
                placeholder={listening ? "Listening..." : "Ask about your milestones..."}
                className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
                disabled={loading || listening}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 disabled:opacity-40 hover:bg-primary/90 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
