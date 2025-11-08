import { GoogleGenerativeAI } from '@google/generative-ai'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined

export async function generateFromGemini(prompt: string): Promise<string> {
  if (!API_KEY) {
    throw new Error('Missing VITE_GEMINI_API_KEY. Add it to a .env file at the project root.')
  }
  const genAI = new GoogleGenerativeAI(API_KEY)
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

  const result = await model.generateContent(prompt)
  const text = result.response.text()
  return text
}
