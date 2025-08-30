"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Calculator, Copy, RefreshCw, Plus, Minus, X, Divide } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import toast from 'react-hot-toast'

export default function BinaryCalculatorPage() {
  const [input1, setInput1] = useState('')
  const [input2, setInput2] = useState('')
  const [operation, setOperation] = useState('+')
  const [result, setResult] = useState('')
  const [decimalResult, setDecimalResult] = useState('')
  const [hexResult, setHexResult] = useState('')

  const operations = [
    { symbol: '+', name: 'Addition', icon: Plus },
    { symbol: '-', name: 'Subtraction', icon: Minus },
    { symbol: '*', name: 'Multiplication', icon: X },
    { symbol: '/', name: 'Division', icon: Divide }
  ]

  const calculateBinary = () => {
    if (!input1 || !input2) {
      toast.error('Please enter both binary numbers')
      return
    }

    // Validate binary input
    if (!/^[01]+$/.test(input1) || !/^[01]+$/.test(input2)) {
      toast.error('Please enter valid binary numbers (only 0s and 1s)')
      return
    }

    try {
      const num1 = parseInt(input1, 2)
      const num2 = parseInt(input2, 2)
      let calculatedResult = 0

      switch (operation) {
        case '+':
          calculatedResult = num1 + num2
          break
        case '-':
          calculatedResult = num1 - num2
          break
        case '*':
          calculatedResult = num1 * num2
          break
        case '/':
          if (num2 === 0) {
            toast.error('Cannot divide by zero')
            return
          }
          calculatedResult = Math.floor(num1 / num2)
          break
        default:
          calculatedResult = num1 + num2
      }

      // Convert results to different bases
      const binaryResult = calculatedResult.toString(2)
      const decimalResult = calculatedResult.toString()
      const hexResult = calculatedResult.toString(16).toUpperCase()

      setResult(binaryResult)
      setDecimalResult(decimalResult)
      setHexResult(hexResult)

      toast.success('Calculation completed!')
    } catch (error) {
      toast.error('Calculation failed')
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

  const clearAll = () => {
    setInput1('')
    setInput2('')
    setResult('')
    setDecimalResult('')
    setHexResult('')
  }

  const setOperationAndCalculate = (op: string) => {
    setOperation(op)
    if (input1 && input2) {
      setTimeout(calculateBinary, 100)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-primary via-background-secondary to-background-primary relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
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
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Binary Calculator
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
            <h1 className="text-4xl font-bold mb-4 text-foreground">Binary Arithmetic Calculator</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Perform advanced binary arithmetic operations with real-time conversion to decimal and hexadecimal. 
              Perfect for computer science students and developers.
            </p>
          </motion.div>

          {/* Calculator Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card p-6 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* First Input */}
              <div>
                <label htmlFor="input1" className="block text-sm font-medium mb-2 text-foreground">
                  First Binary Number
                </label>
                <input
                  id="input1"
                  type="text"
                  value={input1}
                  onChange={(e) => setInput1(e.target.value)}
                  placeholder="e.g., 1010"
                  className="input-field w-full font-mono"
                />
                {input1 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Decimal: {parseInt(input1, 2) || 0}
                  </p>
                )}
              </div>

              {/* Operation Selector */}
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Operation
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {operations.map((op) => (
                    <Button
                      key={op.symbol}
                      onClick={() => setOperationAndCalculate(op.symbol)}
                      variant={operation === op.symbol ? "default" : "outline"}
                      size="sm"
                      className="h-10"
                    >
                      <op.icon className="w-4 h-4 mr-1" />
                      {op.symbol}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Second Input */}
              <div>
                <label htmlFor="input2" className="block text-sm font-medium mb-2 text-foreground">
                  Second Binary Number
                </label>
                <input
                  id="input2"
                  type="text"
                  value={input2}
                  onChange={(e) => setInput2(e.target.value)}
                  placeholder="e.g., 1100"
                  className="input-field w-full font-mono"
                />
                {input2 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Decimal: {parseInt(input2, 2) || 0}
                  </p>
                )}
              </div>
            </div>

            {/* Calculate Button */}
            <div className="text-center">
              <Button 
                onClick={calculateBinary}
                disabled={!input1 || !input2}
                className="btn-primary"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Calculate
              </Button>
            </div>
          </motion.div>

          {/* Results Section */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-card p-6 mb-6"
            >
              <h3 className="text-xl font-semibold mb-4 text-foreground text-center">Calculation Results</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Binary Result */}
                <div className="bg-muted/20 border border-muted/30 rounded-lg p-4 text-center">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Binary</h4>
                  <p className="font-mono text-lg text-foreground mb-2">{result}</p>
                  <Button
                    onClick={() => copyToClipboard(result)}
                    size="sm"
                    variant="outline"
                    className="h-8 px-3"
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </Button>
                </div>

                {/* Decimal Result */}
                <div className="bg-muted/20 border border-muted/30 rounded-lg p-4 text-center">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Decimal</h4>
                  <p className="font-mono text-lg text-foreground mb-2">{decimalResult}</p>
                  <Button
                    onClick={() => copyToClipboard(decimalResult)}
                    size="sm"
                    variant="outline"
                    className="h-8 px-3"
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </Button>
                </div>

                {/* Hexadecimal Result */}
                <div className="bg-muted/20 border border-muted/30 rounded-lg p-4 text-center">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Hexadecimal</h4>
                  <p className="font-mono text-lg text-foreground mb-2">0x{hexResult}</p>
                  <Button
                    onClick={() => copyToClipboard(hexResult)}
                    size="sm"
                    variant="outline"
                    className="h-8 px-3"
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </Button>
                </div>
              </div>

              {/* Clear Button */}
              <div className="text-center mt-6">
                <Button 
                  onClick={clearAll}
                  variant="outline"
                  className="btn-secondary"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </div>
            </motion.div>
          )}

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-semibold mb-4 text-foreground">💡 Binary Calculator Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Input Format</h4>
                <ul className="space-y-1">
                  <li>• Use only 0s and 1s</li>
                  <li>• No spaces or special characters</li>
                  <li>• Examples: 1010, 1100, 1111</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Operations</h4>
                <ul className="space-y-1">
                  <li>• Addition: 1010 + 1100 = 10110</li>
                  <li>• Subtraction: 1010 - 1100 = -10</li>
                  <li>• Multiplication: 1010 × 1100 = 1111000</li>
                  <li>• Division: 1010 ÷ 1100 = 0</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
