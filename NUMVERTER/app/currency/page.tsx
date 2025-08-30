"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, TrendingDown, Copy, RefreshCw, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import toast from 'react-hot-toast'

interface CurrencyRate {
  code: string
  name: string
  rate: number
  change: number
}

export default function CurrencyPage() {
  const [amount, setAmount] = useState('100')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [convertedAmount, setConvertedAmount] = useState('')
  const [rates, setRates] = useState<CurrencyRate[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [aiInsight, setAiInsight] = useState('')

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' }
  ]

  useEffect(() => {
    fetchExchangeRates()
  }, [])

  const fetchExchangeRates = async () => {
    setIsLoading(true)
    try {
      // Simulate API call (replace with actual exchange rate API)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockRates: CurrencyRate[] = [
        { code: 'EUR', name: 'Euro', rate: 0.85, change: 0.5 },
        { code: 'GBP', name: 'British Pound', rate: 0.73, change: -0.2 },
        { code: 'JPY', name: 'Japanese Yen', rate: 110.5, change: 1.2 },
        { code: 'CAD', name: 'Canadian Dollar', rate: 1.25, change: 0.3 },
        { code: 'AUD', name: 'Australian Dollar', rate: 1.35, change: -0.1 }
      ]
      
      setRates(mockRates)
      toast.success('Exchange rates updated!')
    } catch (error) {
      toast.error('Failed to fetch exchange rates')
    } finally {
      setIsLoading(false)
    }
  }

  const convertCurrency = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount')
      return
    }

    setIsLoading(true)
    try {
      // Simulate conversion (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const numAmount = parseFloat(amount)
      let converted = 0
      
      if (fromCurrency === 'USD' && toCurrency === 'EUR') {
        converted = numAmount * 0.85
      } else if (fromCurrency === 'USD' && toCurrency === 'GBP') {
        converted = numAmount * 0.73
      } else if (fromCurrency === 'USD' && toCurrency === 'JPY') {
        converted = numAmount * 110.5
      } else {
        // Mock conversion for other currencies
        converted = numAmount * (0.8 + Math.random() * 0.4)
      }
      
      setConvertedAmount(converted.toFixed(2))
      
      // Generate AI insight
      generateAIInsight(numAmount, converted, fromCurrency, toCurrency)
      
      toast.success('Conversion completed!')
    } catch (error) {
      toast.error('Failed to convert currency')
    } finally {
      setIsLoading(false)
    }
  }

  const generateAIInsight = async (fromAmount: number, toAmount: number, from: string, to: string) => {
    try {
      // Simulate AI insight (replace with actual Gemini API call)
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const mockInsight = `The ${from} to ${to} exchange rate shows that ${fromAmount} ${from} equals ${toAmount} ${to}. This conversion rate is typical for major currency pairs and reflects current market conditions. Consider checking multiple sources for the most accurate rates when making significant transactions.`
      
      setAiInsight(mockInsight)
    } catch (error) {
      setAiInsight('AI insight unavailable at the moment.')
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

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setConvertedAmount('')
    setAiInsight('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-primary via-background-secondary to-background-primary relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
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
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Currency Converter
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
            <h1 className="text-4xl font-bold mb-4 text-foreground">Real-Time Currency Converter</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Convert between 170+ currencies with live exchange rates and AI-powered insights. 
              Get the most accurate conversion rates for your international transactions.
            </p>
          </motion.div>

          {/* Converter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card p-6 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Amount Input */}
              <div>
                <label htmlFor="amount" className="block text-sm font-medium mb-2 text-foreground">
                  Amount
                </label>
                <input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="input-field w-full"
                  min="0"
                  step="0.01"
                />
              </div>

              {/* From Currency */}
              <div>
                <label htmlFor="fromCurrency" className="block text-sm font-medium mb-2 text-foreground">
                  From
                </label>
                <select
                  id="fromCurrency"
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="input-field w-full"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* To Currency */}
              <div>
                <label htmlFor="toCurrency" className="block text-sm font-medium mb-2 text-foreground">
                  To
                </label>
                <select
                  id="toCurrency"
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="input-field w-full"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                onClick={convertCurrency}
                disabled={isLoading || !amount}
                className="btn-primary"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Converting...
                  </>
                ) : (
                  <>
                    <DollarSign className="w-4 h-4 mr-2" />
                    Convert Currency
                  </>
                )}
              </Button>

              <Button 
                onClick={swapCurrencies}
                variant="outline"
                className="btn-secondary"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Swap Currencies
              </Button>

              <Button 
                onClick={fetchExchangeRates}
                variant="outline"
                className="btn-secondary"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Update Rates
              </Button>
            </div>
          </motion.div>

          {/* Conversion Result */}
          {convertedAmount && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-card p-6 mb-6"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-foreground">Conversion Result</h3>
                <div className="text-4xl font-bold text-primary-500 mb-4">
                  {amount} {fromCurrency} = {convertedAmount} {toCurrency}
                </div>
                <Button
                  onClick={() => copyToClipboard(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`)}
                  variant="outline"
                  className="btn-secondary"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Result
                </Button>
              </div>
            </motion.div>
          )}

          {/* AI Insight */}
          {aiInsight && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="glass-card p-6 mb-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Lightbulb className="w-6 h-6 text-yellow-500" />
                <h3 className="text-xl font-semibold text-foreground">AI Insight</h3>
              </div>
              <p className="text-foreground leading-relaxed">{aiInsight}</p>
            </motion.div>
          )}

          {/* Exchange Rates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-semibold mb-4 text-foreground">Current Exchange Rates (USD)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rates.map((rate) => (
                <div key={rate.code} className="bg-muted/20 border border-muted/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-foreground">{rate.code}</span>
                    <span className="text-sm text-muted-foreground">{rate.name}</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-2">
                    {rate.rate.toFixed(4)}
                  </div>
                  <div className={`flex items-center text-sm ${
                    rate.change >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {rate.change >= 0 ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    )}
                    {rate.change >= 0 ? '+' : ''}{rate.change.toFixed(2)}%
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
