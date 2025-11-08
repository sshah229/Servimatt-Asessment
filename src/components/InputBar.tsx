import { useRef } from 'react'
import type { KeyboardEvent } from 'react'
import { Send, X, Trash2 } from 'lucide-react'

interface InputBarProps {
  value: string
  onChange: (v: string) => void
  onSubmit: () => void
  onClearChat: () => void
  disabled?: boolean
}

export default function InputBar({ value, onChange, onSubmit, onClearChat, disabled }: InputBarProps) {
  const ref = useRef<HTMLTextAreaElement>(null)

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!disabled && value.trim()) onSubmit()
    }
  }

  return (
    <div className="w-full py-4">
      <div className="relative rounded-2xl border border-white/10 bg-white/5 p-3 shadow-lg">
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={3}
          placeholder="Ask anything... (Shift+Enter for new line)"
          className="min-h-[56px] w-full resize-none bg-transparent pr-72 md:pr-96 text-base outline-none placeholder:text-white/40"
          disabled={disabled}
        />
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <button
            onClick={() => onChange('')}
            disabled={disabled || !value}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 text-white shadow-lg transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Clear input"
          >
            <X className="h-4 w-4" />
            <span className="text-xs sm:text-sm">clear input</span>
          </button>
          <button
            onClick={onClearChat}
            disabled={disabled}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 text-white shadow-lg transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Clear conversation"
          >
            <Trash2 className="h-4 w-4" />
            <span className="text-xs sm:text-sm">Clear conversation</span>
          </button>
          <button
            onClick={onSubmit}
            disabled={disabled || !value.trim()}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 px-4 text-white shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
            <span className="text-xs sm:text-sm">Send</span>
          </button>
        </div>
      </div>
    </div>
  )
}
