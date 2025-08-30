"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Calculator, Brain, Camera, Mic, DollarSign, Zap } from 'lucide-react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'

export default function HomePage() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const features = [
    {
      icon: Calculator,
      title: 'Number Converter',
      description: 'Convert between binary, decimal, hex, octal, and Roman numerals',
      href: '/converter',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Brain,
      title: 'AI Convert',
      description: 'Natural language conversion with AI explanations',
      href: '/ai-convert',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Camera,
      title: 'OCR Scanner',
      description: 'Extract numbers from images and convert them',
      href: '/ocr',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Mic,
      title: 'Voice Input',
      description: 'Convert spoken numbers to any base',
      href: '/voice',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: DollarSign,
      title: 'Currency Converter',
      description: 'Real-time currency conversion with AI insights',
      href: '/currency',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Zap,
      title: 'Binary Calculator',
      description: 'Advanced binary arithmetic operations',
      href: '/binary-calculator',
      color: 'from-indigo-500 to-purple-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-primary via-background-secondary to-background-primary relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-glow" />
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
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto text-center">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Intelligent Number Conversion
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Transform numbers between any base with AI-powered natural language processing, 
              OCR scanning, voice input, and real-time currency conversion.
            </p>
          </motion.div>

          {/* Splash Screen */}
          <AnimatePresence>
            {!showContent && (
              <motion.div
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="mb-16"
              >
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary-500 to-cyan-500 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-white text-4xl font-bold">N</span>
                </div>
                <p className="text-lg text-muted-foreground mt-4">Loading Numverter AI...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Features Grid */}
          <AnimatePresence>
            {showContent && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group"
                  >
                    <Link href={feature.href}>
                      <div className="glass-card p-6 h-full cursor-pointer transition-all duration-300 hover:shadow-glass-hover">
                        <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <feature.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-foreground">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {feature.description}
                        </p>
                        <div className="mt-4 flex items-center text-primary-500 group-hover:text-primary-400 transition-colors duration-300">
                          <span className="text-sm font-medium">Get Started</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA Section */}
          <AnimatePresence>
            {showContent && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-16"
              >
                <div className="glass-card p-8 max-w-2xl mx-auto">
                  <h2 className="text-3xl font-bold mb-4 text-foreground">
                    Ready to Transform Numbers?
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Experience the future of number conversion with AI-powered intelligence, 
                    real-time processing, and intuitive interfaces.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/converter">
                      <button className="btn-primary">
                        Start Converting
                      </button>
                    </Link>
                    <Link href="/ai-convert">
                      <button className="btn-secondary">
                        Try AI Convert
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-6 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">
            Made with ❤️ by <span className="font-semibold text-foreground">FAIZUDDIN</span>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            For support, contact at{' '}
            <a 
              href="mailto:devbyfaiz@outlook.com" 
              className="text-primary-500 hover:text-primary-400 transition-colors duration-300"
            >
              devbyfaiz@outlook.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
