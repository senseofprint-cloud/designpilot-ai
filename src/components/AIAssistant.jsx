import React, { useRef, useState } from 'react'
import { Sparkles, X, Send } from 'lucide-react'
import { askAssistant } from '../services/aiService.js'
import { AI_ASSISTANT_SUGGESTIONS } from '../data/mockData.js'

export default function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi! I'm your design assistant. Ask me anything about your brand, or tap a suggestion below." }
  ])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const bodyRef = useRef(null)

  async function send(text) {
    const value = (text ?? input).trim()
    if (!value) return
    setMessages((m) => [...m, { role: 'user', text: value }])
    setInput('')
    setThinking(true)
    const reply = await askAssistant(value)
    setThinking(false)
    setMessages((m) => [...m, { role: 'bot', text: reply }])
    requestAnimationFrame(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight })
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 md:bottom-6 z-[200] grad-vivid text-white font-bold text-sm px-5 py-3.5 rounded-full shadow-lifted flex items-center gap-2 hover:-translate-y-0.5 transition-transform"
      >
        <Sparkles size={16} /> Ask DesignPilot
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-[360px] max-w-[calc(100vw-40px)] max-h-[70vh] bg-white rounded-[20px] shadow-lifted border border-brand-border z-[201] flex flex-col overflow-hidden">
          <div className="grad-primary text-white px-4.5 py-4 flex justify-between items-center">
            <div>
              <h4 className="m-0 text-[15px] font-semibold flex items-center gap-1.5"><Sparkles size={15} /> DesignPilot Assistant</h4>
              <span className="text-[11.5px] opacity-85">Ask about colors, copy or improvements</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-white"><X size={18} /></button>
          </div>

          <div ref={bodyRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-brand-bg">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[13.5px] leading-relaxed whitespace-pre-line ${
                  m.role === 'bot'
                    ? 'bg-white border border-brand-border self-start rounded-bl-sm'
                    : 'grad-primary text-white self-end rounded-br-sm'
                }`}
              >
                {m.text}
              </div>
            ))}
            {thinking && <div className="self-start bg-white border border-brand-border px-3.5 py-2.5 rounded-2xl rounded-bl-sm text-[13.5px] text-brand-navySoft">Thinking…</div>}
          </div>

          <div className="flex flex-wrap gap-1.5 px-4 pb-3 bg-brand-bg">
            {AI_ASSISTANT_SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => send(s)} className="bg-white border border-brand-border rounded-full px-3 py-1.5 text-xs font-semibold text-brand-purple">
                {s}
              </button>
            ))}
          </div>

          <div className="flex gap-2 p-3 border-t border-brand-borderSoft">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Ask DesignPilot anything…"
              className="flex-1 border border-brand-border rounded-full px-4 py-2.5 text-sm outline-none focus:border-brand-purple"
            />
            <button onClick={() => send()} className="w-10 h-10 rounded-full grad-primary text-white flex items-center justify-center flex-shrink-0">
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
