"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mic, MicOff, Play, Copy, RefreshCw, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import toast from 'react-hot-toast'

export default function VoicePage() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [convertedNumber, setConvertedNumber] = useState('')
  const [error, setError] = useState('')

  // Check if speech recognition is supported
  const isSupported = typeof window !== 'undefined' && 'webkitSpeechRecognition' in window

  useEffect(() => {
    if (!isSupported) {
      setError('Speech recognition is not supported in this browser. Please use Chrome or Edge.')
    }
  }, [isSupported])

  const startListening = () => {
    if (!isSupported) return

    setIsListening(true)
    setTranscript('')
    setError('')
    
    // Mock speech recognition for demo
    setTimeout(() => {
      const mockTranscript = "one hundred twenty three point four five"
      setTranscript(mockTranscript)
      setIsListening(false)
      toast.success('Voice captured successfully!')
    }, 3000)
  }

  const stopListening = () => {
    setIsListening(false)
  }

  const processVoice = async () => {
    if (!transcript) return

    setIsProcessing(true)
    try {
      // Simulate AI processing (replace with actual Gemini API call)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock conversion - replace with actual Gemini API call
      const mockConversion = "123.45"
      setConvertedNumber(mockConversion)
      toast.success('Voice converted successfully!')
    } catch (error) {
      toast.error('Failed to process voice input')
    } finally {
      setIsProcessing(false)
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
    setTranscript('')
    setConvertedNumber('')
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-primary via-background-secondary to-background-primary relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
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
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Voice Input
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
            <h1 className="text-4xl font-bold mb-4 text-foreground">Voice Number Converter</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Speak numbers naturally and let our AI convert them to any base. 
              Perfect for hands-free number conversion and accessibility.
            </p>
          </motion.div>

          {/* Voice Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card p-8 mb-8 text-center"
          >
            {/* Microphone Button */}
            <div className="mb-6">
              <Button
                onClick={isListening ? stopListening : startListening}
                disabled={!isSupported || isProcessing}
                size="lg"
                className={`w-24 h-24 rounded-full ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                    : 'bg-primary-500 hover:bg-primary-600'
                }`}
              >
                {isListening ? (
                  <MicOff className="w-8 h-8 text-white" />
                ) : (
                  <Mic className="w-8 h-8 text-white" />
                )}
              </Button>
            </div>

            {/* Status */}
            <div className="mb-6">
              {isListening ? (
                <div className="flex items-center justify-center space-x-2 text-primary-500">
                  <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse" />
                  <span className="font-medium">Listening... Speak now!</span>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Click the microphone to start speaking
                </p>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-6 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}

            {/* Instructions */}
            <div className="text-sm text-muted-foreground mb-6">
              <p>💡 Try saying: "one hundred twenty three", "fifty point five", or "zero point zero one"</p>
            </div>
          </motion.div>

          {/* Transcript Section */}
          {transcript && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-card p-6 mb-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Voice Transcript</h3>
                <Button
                  onClick={() => copyToClipboard(transcript)}
                  size="sm"
                  variant="outline"
                  className="h-8 px-3"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
              </div>

              <div className="bg-muted/20 border border-muted/30 rounded-lg p-4">
                <p className="text-foreground font-medium">
                  "{transcript}"
                </p>
              </div>

              <div className="mt-4">
                <Button 
                  onClick={processVoice}
                  disabled={isProcessing}
                  className="btn-primary"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Convert to Number
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {/* Conversion Result */}
          {convertedNumber && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="glass-card p-6 mb-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Converted Number</h3>
                <Button
                  onClick={() => copyToClipboard(convertedNumber)}
                  size="sm"
                  variant="outline"
                  className="h-8 px-3"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
              </div>

              <div className="bg-muted/20 border border-muted/30 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Volume2 className="w-5 h-5 text-primary-500" />
                  <p className="font-mono text-lg text-foreground">
                    {convertedNumber}
                  </p>
                </div>
              </div>

              <div className="mt-4 text-sm text-muted-foreground">
                <p>💡 Use this number in our Number Converter or AI Convert tools!</p>
              </div>
            </motion.div>
          )}

          {/* Clear Button */}
          {(transcript || convertedNumber) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center"
            >
              <Button 
                onClick={clearAll}
                variant="outline"
                className="btn-secondary"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
