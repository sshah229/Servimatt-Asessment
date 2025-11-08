## Gemini Playground (React + Vite + Tailwind)

Beautiful, fast, and simple AI prompt app built with React + TypeScript, Vite, TailwindCSS, and Google Gemini. Includes chat history, clear conversation, loading/error states, Markdown rendering, and code highlighting.

### Stack
- React 19 + TypeScript (Vite)
- TailwindCSS + Typography plugin
- Google Generative AI SDK (`@google/generative-ai`)
- `react-markdown` + `remark-gfm` + `rehype-highlight` + `highlight.js`
- `react-hot-toast`, `lucide-react`

### Getting Started
1) Prereqs
- Node.js 20.19+ or 22.12+ is required by Vite 7.
- A Gemini API key from Google AI Studio.

2) Clone and install
```bash
npm install
```

3) Configure environment
Create a `.env` file in this folder (same directory as package.json):
```
VITE_GEMINI_API_KEY=your-gemini-api-key-here
```

4) Run the dev server
```bash
npm run dev
```
Open the printed Local URL (default http://localhost:5173).

5) Build & preview
```bash
npm run build
npm run preview
```

### Features
- Prompt input with Enter to send and Shift+Enter for newline
- Gemini 2.0 Flash responses
- Chat history persisted in localStorage
- Clear conversation button
- Elegant dark UI, glass/gradient accents, icons
- Markdown rendering with syntax-highlighted code blocks
- Toaster-based error and status messages

### Notes
- This app uses the Gemini API key in the browser for assignment simplicity. In production, proxy requests through a backend and never expose secrets to clients.
- If Tailwind directives show as warnings in your editor (e.g., "Unknown at rule @tailwind"), they are safe to ignore and do not affect the build.

