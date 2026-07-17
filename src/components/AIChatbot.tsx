"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

const suggestions = [
  "What needs my signature?",
  "Summarize Kemess North",
  "Show budget variance",
  "Urgent tasks this week",
];

function replyTo(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("signature") || q.includes("approval") || q.includes("sign")) {
    return "3 items need your attention: TKN letter (Kemess North) — Sign, FPX share-holding — Decide, and Pathways dispute brief — Review. Open Needs Approval to act on them.";
  }
  if (q.includes("kemess")) {
    return "Kemess North is at 78% progress (Urgent). Final TKN letter package is ready for Chief signature on May 13. Lead: Terry. Supporting annex v1.0 was uploaded May 7.";
  }
  if (q.includes("budget") || q.includes("finance") || q.includes("variance") || q.includes("spend")) {
    return "Finance snapshot: $5.05M allocated, $3.05M spent, $2.00M remaining. Overall variance −2.1% (on track). Major Projects is at 70% utilization; Capital Projects at 34%.";
  }
  if (q.includes("urgent") || q.includes("task")) {
    return "Urgent items: Kemess TKN letter, bi-weekly progress aggregation, Kemess supporting docs upload, Lands referral flag, cutting permit package, and water phase 2 change order.";
  }
  if (q.includes("meeting") || q.includes("calendar")) {
    return "Upcoming: 13 MAY — Kemess North final TKN letter; NEXT WK — FPX share-holding discussion; 20 MAY — Pathways dispute resolution. Most are still TBC.";
  }
  if (q.includes("hello") || q.includes("hi") || q.includes("help")) {
    return "I can help with approvals, project status, budgets, tasks, and meetings across the Chief's Office Portal. Try asking about Kemess North, signatures, or budget variance.";
  }
  return "I can help with projects, approvals, finance, and tasks. Try: “What needs my signature?”, “Summarize Kemess North”, or “Show budget variance”.";
}

export function AIChatbot() {
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi Chief — I'm the Takla portal assistant. Ask about approvals, projects, finance, or tasks.",
    },
  ]);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, open]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text: trimmed,
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);

    window.setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          text: replyTo(trimmed),
        },
      ]);
      setTyping(false);
    }, 650);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <div className="pointer-events-none fixed right-5 bottom-5 z-50 flex flex-col items-end gap-3">
      {open ? (
        <div className="pointer-events-auto flex h-[min(520px,70vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-[#dce5e0] bg-white shadow-[0_12px_40px_rgba(10,61,46,0.18)]">
          <div className="flex items-center justify-between bg-[#0a3d2e] px-4 py-3 text-white">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Takla AI Assistant</p>
                <p className="text-[11px] text-white/60">Portal help · Demo</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1.5 text-white/70 hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-[#f7faf8] px-3 py-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-[13px] leading-relaxed ${
                    msg.role === "user"
                      ? "rounded-br-md bg-[#0a3d2e] text-white"
                      : "rounded-bl-md border border-[#e5ebe8] bg-white text-[#1a2e26]"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {typing ? (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md border border-[#e5ebe8] bg-white px-3 py-2 text-[12px] text-[#8a9a92]">
                  Thinking…
                </div>
              </div>
            ) : null}
            <div ref={bottomRef} />
          </div>

          {messages.length <= 2 ? (
            <div className="flex flex-wrap gap-1.5 border-t border-[#eef2f0] bg-white px-3 py-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-[#dce5e0] bg-[#f7faf8] px-2.5 py-1 text-[11px] font-medium text-[#0a3d2e] hover:bg-[#e8f5ef]"
                >
                  {s}
                </button>
              ))}
            </div>
          ) : null}

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-[#eef2f0] bg-white p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about projects, approvals…"
              className="h-10 flex-1 rounded-full border border-[#dce5e0] bg-[#f7faf8] px-3.5 text-[13px] outline-none focus:border-[#0a3d2e] focus:ring-2 focus:ring-[#0a3d2e]/15"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0a3d2e] text-white transition hover:bg-[#0d4a38] disabled:opacity-40"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#0a3d2e] text-white shadow-[0_8px_24px_rgba(10,61,46,0.35)] transition hover:scale-105 hover:bg-[#0d4a38]"
        aria-label={open ? "Close AI chat" : "Open AI chat"}
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>
    </div>
  );
}
