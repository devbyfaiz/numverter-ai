
"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Copy, RefreshCw, Calculator, Binary, Hash, Roman } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { formatNumber, parseNumber, isValidNumber, groupDigits } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function ConverterPage() {
  const [inputValue, setInputValue] = useState('')
  const [fromBase, setFromBase] = useState(10)
  const [grouped, setGrouped] = useState(false)
  const [results, setResults] = useState<Array<{ base: number; label: string; value: string; truncated: boolean }>>([])
  const [error, setError] = useState('')

  const bases = [
    { value: 2, label: 'Binary', icon: Binary, color: 'from-blue-500 to-cyan-500' },
    { value: 8, label: 'Octal', icon: Hash, color: 'from-green-500 to-emerald-500' },
    { value: 10, label: 'Decimal', icon: Calculator, color: 'from-purple-500 to-pink-500' },
    { value: 16, label: 'Hexadecimal', icon: Hash, color: 'from-orange-500 to-red-500' }
  ]

  const convertNumber = () => {
    if (!inputValue.trim()) {
      setResults([])
      setError('')
      return
    }

    try {
      // Validate input
      const cleanInput = inputValue.replace(/[\s_]/g, '')
      if (!isValidNumber(cleanInput, fromBase)) {
        throw new Error(`Invalid number for base ${fromBase}`)
      }

      // Parse the number
      const num = parseNumber(cleanInput, fromBase)
      
      // Convert to all bases
      const newResults = bases.map(({ base, label }) => {
        let value = formatNumber(num, base)
        let truncated = false

        // Handle grouping
        if (grouped) {
          const parts = value.split('.')
          parts[0] = groupDigits(parts[0], base === 2 ? 4 : base === 8 ? 3 : 2)
          value = parts.join('.')
        }

        return { base, label, value, truncated }
      })

      setResults(newResults)
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid input')
      setResults([])
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const clearInput = () => {
    setInputValue('')
    setResults([])
    setError('')
  }

  const useAsInput = (value: string, base: number) => {
    setInputValue(value)
    setFromBase(base)
  }

  // Auto-detect base from input
  useEffect(() => {
    const value = inputValue.trim()
    if (value.startsWith('0b')) setFromBase(2)
    else if (value.startsWith('0o')) setFromBase(8)
    else if (value.startsWith('0x')) setFromBase(16)
  }, [inputValue])

  // Convert on input change
  useEffect(() => {
    const timer = setTimeout(convertNumber, 300)
    return () => clearTimeout(timer)
  }, [inputValue, fromBase, grouped])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-primary via-background-secondary to-background-primary relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
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
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-cyan-500 bg-clip-text text-transparent">
              Numverter AI
            </span>
          </motion.div>
          
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold mb-4 text-foreground">Number Converter</h1>
            <p className="text-muted-foreground text-lg">
              Convert numbers between binary, octal, decimal, and hexadecimal bases
            </p>
          </motion.div>

          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card p-6 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Input Field */}
              <div className="md:col-span-2">
                <label htmlFor="inputValue" className="block text-sm font-medium mb-2 text-foreground">
                  Number to Convert
                </label>
                <input
                  id="inputValue"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter number (e.g., 255, FF, 1111, 1.20, 101.101)"
                  className="input-field w-full"
                />
              </div>

              {/* Base Selector */}
              <div>
                <label htmlFor="fromBase" className="block text-sm font-medium mb-2 text-foreground">
                  From Base
                </label>
                <select
                  id="fromBase"
                  value={fromBase}
                  onChange={(e) => setFromBase(Number(e.target.value))}
                  className="input-field w-full"
                >
                  {bases.map(({ value, label }) => (
                    <option key={value} value={value}>{label} (base {value})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-4 items-center">
              <Button onClick={convertNumber} className="btn-primary">
                <ArrowRight className="w-4 h-4 mr-2" />
                Convert
              </Button>
              
              <Button onClick={clearInput} variant="outline" className="btn-secondary">
                <RefreshCw className="w-4 h-4 mr-2" />
                Clear
              </Button>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="grouped"
                  checked={grouped}
                  onChange={(e) => setGrouped(e.target.checked)}
                  className="w-4 h-4 text-primary-600 bg-background border-input rounded focus:ring-primary-500"
                />
                <label htmlFor="grouped" className="text-sm text-muted-foreground">
                  Group digits
                </label>
              </div>
            </div>

            {/* Input Hints */}
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Tips: Prefixes like <code className="bg-muted px-1 rounded">0b</code>, <code className="bg-muted px-1 rounded">0o</code>, <code className="bg-muted px-1 rounded">0x</code> are recognized. Underscores and spaces are ignored.</p>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}
          </motion.div>

          {/* Results Section */}
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {results.map(({ base, label, value, truncated }, index) => (
                <motion.div
                  key={base}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="glass-card p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${bases.find(b => b.value === base)?.color} rounded-lg flex items-center justify-center`}>
                        <bases.find(b => b.value === base)?.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{label}</h3>
                        <span className="text-sm text-muted-foreground">base {base}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => copyToClipboard(value)}
                        size="sm"
                        variant="outline"
                        className="h-8 px-3"
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Copy
                      </Button>
                      <Button
                        onClick={() => useAsInput(value, base)}
                        size="sm"
                        variant="outline"
                        className="h-8 px-3"
                      >
                        Use as Input
                      </Button>
                    </div>
                  </div>

                  <div className="bg-muted/20 border border-muted/30 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Value:</span>
                      {truncated && (
                        <span className="text-xs bg-yellow-500/20 text-yellow-600 px-2 py-1 rounded">
                          Truncated
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-lg text-foreground mt-1 break-all">
                      {value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
