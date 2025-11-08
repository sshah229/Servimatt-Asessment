import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { User, Bot, Clipboard, Check } from 'lucide-react'
import { cn } from '../lib/utils'

interface ChatMessageProps {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const [copied, setCopied] = React.useState(false)
  const isUser = role === 'user'

  const copy = async () => {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  return (
    <div className={cn('w-full', isUser ? 'justify-end' : 'justify-start', 'flex')}>      
      <div
        className={cn(
          'relative w-full rounded-2xl border p-4 text-sm shadow-md',
          isUser
            ? 'border-white/10 bg-white/10 backdrop-blur'
            : 'border-white/10 bg-gradient-to-br from-violet-500/15 to-fuchsia-500/10'
        )}
      >
        <div className="mb-2 flex items-center gap-2 text-xs text-white/60">
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
          <span>{isUser ? 'You' : 'Gemini'}</span>
          <button
            onClick={copy}
            className="ml-auto inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/70 transition hover:bg-white/10"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" /> Copied
              </>
            ) : (
              <>
                <Clipboard className="h-3.5 w-3.5" /> Copy
              </>
            )}
          </button>
        </div>
        <div className="prose prose-invert max-w-none prose-pre:rounded-xl prose-pre:bg-black/40 prose-pre:p-3">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
