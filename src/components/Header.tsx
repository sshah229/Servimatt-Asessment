import { Sparkles, Trash2 } from 'lucide-react'

interface HeaderProps {
  onClear: () => void
  disabled?: boolean
}

export default function Header({ onClear, disabled }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-white/10 bg-gradient-to-b from-black/60 to-transparent backdrop-blur">
      <div className="w-full flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight">Gemini Playground</h1>
            <p className="text-xs text-white/60">Beautiful, fast, and simple AI prompts</p>
          </div>
        </div>
        <button
          onClick={onClear}
          disabled={disabled}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Trash2 className="h-4 w-4" />
          Clear
        </button>
      </div>
    </header>
  )
}
