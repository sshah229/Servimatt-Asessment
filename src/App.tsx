import { useEffect, useMemo, useRef, useState } from 'react'
import InputBar from './components/InputBar'
import ChatMessage from './components/ChatMessage'
import { useLocalStorage } from './hooks/useLocalStorage'
import { generateFromGemini } from './lib/gemini'
import toast, { Toaster } from 'react-hot-toast'

type Role = 'user' | 'assistant'
interface Message { role: Role; content: string }

export default function App() {
  const [messages, setMessages] = useLocalStorage<Message[]>('chat-history', [])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const hasHistory = useMemo(() => messages.length > 0, [messages])

  const onClearChat = () => {
    setMessages([])
    toast.success('Cleared conversation')
  }

  const onSubmit = async () => {
    const trimmed = input.trim()
    if (!trimmed || loading) return

    const userMsg: Message = { role: 'user', content: trimmed }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)
    try {
      const text = await generateFromGemini(trimmed)
      const aiMsg: Message = { role: 'assistant', content: text }
      setMessages((prev) => [...prev, aiMsg])
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-dvh w-full bg-black text-white app-gradient">
      <div className="flex min-h-dvh flex-col">
        <main className="w-full flex-1 py-6">
          <div className="flex flex-1 flex-col gap-4">
            {!hasHistory && !loading ? (
              <div className="mt-24 text-center">
                <h2 className="mb-3 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-3xl font-semibold text-transparent">
                  Start a conversation
                </h2>
                <p className="text-sm text-white/70">
                  Type a prompt below and I’ll ask Gemini for you. Try “Explain quantum computing
                  simply” or “Give me 3 ideas for a weekend project”.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4 pb-2">
                {messages.map((m, idx) => (
                  <ChatMessage key={idx} role={m.role} content={m.content} />
                ))}
                {loading && (
                  <div className="flex w-full justify-start">
                    <div className="max-w-[78ch] animate-pulse rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                      Thinking…
                    </div>
                  </div>
                )}
                <div ref={endRef} />
              </div>
            )}
          </div>
        </main>

        <div className="sticky bottom-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent pt-2">
          <InputBar value={input} onChange={setInput} onSubmit={onSubmit} onClearChat={onClearChat} disabled={loading} />
          <div className="pb-4 text-center text-xs text-white/40">Press Enter to send • Shift+Enter for newline</div>
        </div>
      </div>

      <Toaster position="top-right" toastOptions={{ className: 'bg-white/10 backdrop-blur text-white border border-white/10' }} />
    </div>
  )
}
