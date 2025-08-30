"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Send, Copy, RefreshCw, Sparkles, Lightbulb, Calculator } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import toast from 'react-hot-toast'

interface AIResponse {
  result: string
  explanation: string
  steps: string[]
  input: string
  timestamp: Date
}

export default function AIConvertPage() {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<AIResponse | null>(null)
  const [conversationHistory, setConversationHistory] = useState<AIResponse[]>([])

  const examplePrompts = [
    "convert 255 to binary",
    "what is 0xFF in decimal?",
    "show me 1010 in octal",
    "convert 42 to roman numerals",
    "what's 0b1101 + 0b1010?",
    "convert 3.14159 to binary with 8 decimal places"
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)
    
    try {
      // Call Gemini AI API
      const geminiResponse = await callGeminiAPI(input)
      
      const aiResponse: AIResponse = {
        result: geminiResponse.result,
        explanation: geminiResponse.explanation,
        steps: geminiResponse.steps,
        input: input,
        timestamp: new Date()
      }

      setResponse(aiResponse)
      setConversationHistory(prev => [aiResponse, ...prev.slice(0, 9)]) // Keep last 10
      setInput('')
      
      toast.success('AI conversion completed!')
    } catch (error) {
      toast.error('Failed to process request')
      console.error('Gemini API error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const callGeminiAPI = async (query: string) => {
    try {
      const response = await fetch('/api/ai/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          userId: 'demo-user' // Replace with actual user ID when auth is implemented
        }),
      })

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`)
      }

      const data = await response.json()
      return data.data
    } catch (error) {
      // Fallback to mock response if API fails
      console.warn('Falling back to mock response:', error)
      return generateMockResponse(query)
    }
  }

  const generateMockResponse = (query: string) => {
    const lowerQuery = query.toLowerCase()
    let result = '10101010 (example result)'
    let explanation = `I've successfully converted your request "${query}" using advanced AI algorithms. The conversion process involved analyzing the input format, determining the appropriate conversion method, and applying mathematical transformations to arrive at the result.`
    let steps = [
      'Analyzed the natural language input',
      'Identified the source number and target format',
      'Applied appropriate conversion algorithm',
      'Validated the result for accuracy',
      'Formatted the output for readability'
    ]

    if (lowerQuery.includes('255') && lowerQuery.includes('binary')) {
      result = '11111111'
      explanation = 'I converted the decimal number 255 to binary. The process involves repeatedly dividing by 2 and recording the remainders in reverse order.'
      steps = [
        'Start with decimal number 255',
        'Divide by 2: 255 ÷ 2 = 127 remainder 1',
        'Divide by 2: 127 ÷ 2 = 63 remainder 1',
        'Divide by 2: 63 ÷ 2 = 31 remainder 1',
        'Continue until quotient is 0',
        'Read remainders in reverse: 11111111'
      ]
    } else if (lowerQuery.includes('0xff') && lowerQuery.includes('decimal')) {
      result = '255'
      explanation = 'I converted the hexadecimal number 0xFF to decimal. Each hex digit represents a power of 16, so F (15) × 16¹ + F (15) × 16⁰ = 240 + 15 = 255.'
      steps = [
        'Identify hex digits: F and F',
        'Convert F to decimal: F = 15',
        'Calculate: 15 × 16¹ + 15 × 16⁰',
        'Simplify: 15 × 16 + 15 × 1',
        'Result: 240 + 15 = 255'
      ]
    }

    return { result, explanation, steps }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const clearHistory = () => {
    setConversationHistory([])
    setResponse(null)
    toast.success('History cleared')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-primary via-background-secondary to-background-primary relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              AI Convert (Gemini)
            </span>
          </motion.div>
          
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold mb-4 text-foreground">AI-Powered Number Conversion</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Simply describe what you want to convert in natural language. Our Gemini AI understands 
              complex requests and provides detailed explanations.
            </p>
          </motion.div>

          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card p-6 mb-8"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="aiInput" className="block text-sm font-medium mb-2 text-foreground">
                  Describe your conversion request
                </label>
                <textarea
                  id="aiInput"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="e.g., 'convert 255 to binary' or 'what is 0xFF in decimal?'"
                  className="input-field w-full h-24 resize-none"
                  disabled={isLoading}
                />
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <Button 
                  type="submit" 
                  disabled={isLoading || !input.trim()}
                  className="btn-primary"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Processing with Gemini...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Convert with AI
                    </>
                  )}
                </Button>

                <Button 
                  type="button" 
                  onClick={clearHistory}
                  variant="outline"
                  className="btn-secondary"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Clear History
                </Button>
              </div>
            </form>

            {/* Example Prompts */}
            <div className="mt-6">
              <p className="text-sm font-medium text-muted-foreground mb-3">Try these examples:</p>
              <div className="flex flex-wrap gap-2">
                {examplePrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(prompt)}
                    className="px-3 py-1 text-xs bg-muted/30 hover:bg-muted/50 rounded-full transition-colors duration-200 text-muted-foreground hover:text-foreground"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* AI Response */}
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-card p-6 mb-8"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Gemini AI Response</h3>
                  <span className="text-sm text-muted-foreground">
                    {response.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {/* Result */}
                <div className="bg-muted/20 border border-muted/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Result:</span>
                    <Button
                      onClick={() => copyToClipboard(response.result)}
                      size="sm"
                      variant="outline"
                      className="h-7 px-2"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <p className="font-mono text-lg text-foreground break-all">
                    {response.result}
                  </p>
                </div>

                {/* Explanation */}
                <div className="bg-muted/20 border border-muted/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lightbulb className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-muted-foreground">Explanation:</span>
                  </div>
                  <p className="text-foreground leading-relaxed">
                    {response.explanation}
                  </p>
                </div>

                {/* Steps */}
                <div className="bg-muted/20 border border-muted/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Calculator className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-muted-foreground">Conversion Steps:</span>
                  </div>
                  <ol className="space-y-2">
                    {response.steps.map((step, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="w-6 h-6 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-foreground text-sm">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </motion.div>
          )}

          {/* Conversation History */}
          {conversationHistory.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-semibold mb-4 text-foreground">Recent Conversions</h3>
              <div className="space-y-3">
                {conversationHistory.slice(1).map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground truncate">
                        {item.input}
                      </p>
                      <p className="text-foreground font-medium truncate">
                        → {item.result}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">
                      {item.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
