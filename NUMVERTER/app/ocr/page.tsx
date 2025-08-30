"use client"

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Camera, Upload, FileText, Copy, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'

export default function OCRPage() {
  const [image, setImage] = useState<File | null>(null)
  const [extractedText, setExtractedText] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('')

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setImage(file)
      setPreviewUrl(URL.createObjectURL(file))
      setExtractedText('')
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp']
    },
    multiple: false
  })

  const processImage = async () => {
    if (!image) return

    setIsProcessing(true)
    try {
      // Simulate OCR processing (replace with actual Gemini Vision API)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock extracted text - replace with actual Gemini API call
      const mockText = "123.45\n67.89\n101.112"
      setExtractedText(mockText)
      toast.success('Image processed successfully!')
    } catch (error) {
      toast.error('Failed to process image')
    } finally {
      setIsProcessing(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(extractedText)
      toast.success('Copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const clearAll = () => {
    setImage(null)
    setExtractedText('')
    setPreviewUrl('')
    if (previewUrl) URL.revokeObjectURL(previewUrl)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-primary via-background-secondary to-background-primary relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
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
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
              OCR Scanner
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
            <h1 className="text-4xl font-bold mb-4 text-foreground">OCR Number Scanner</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Upload an image containing numbers and let our AI extract them automatically. 
              Perfect for receipts, documents, and handwritten numbers.
            </p>
          </motion.div>

          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card p-6 mb-8"
          >
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                isDragActive 
                  ? 'border-primary-500 bg-primary-500/10' 
                  : 'border-muted-foreground/30 hover:border-primary-500/50'
              }`}
            >
              <input {...getInputProps()} />
              
              {!image ? (
                <div>
                  <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium text-foreground mb-2">
                    {isDragActive ? 'Drop the image here' : 'Drag & drop an image here'}
                  </p>
                  <p className="text-muted-foreground">
                    or click to select a file (JPEG, PNG, GIF, BMP)
                  </p>
                </div>
              ) : (
                <div>
                  <FileText className="w-16 h-16 mx-auto mb-4 text-primary-500" />
                  <p className="text-lg font-medium text-foreground mb-2">
                    Image selected: {image.name}
                  </p>
                  <p className="text-muted-foreground">
                    Ready to process
                  </p>
                </div>
              )}
            </div>

            {/* Image Preview */}
            {previewUrl && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3 text-foreground">Image Preview:</h3>
                <div className="max-w-md mx-auto">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="w-full h-auto rounded-lg border border-muted-foreground/20"
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mt-6">
              <Button 
                onClick={processImage}
                disabled={!image || isProcessing}
                className="btn-primary"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4 mr-2" />
                    Extract Numbers
                  </>
                )}
              </Button>

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

          {/* Results Section */}
          {extractedText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-foreground">Extracted Numbers</h3>
                <Button
                  onClick={copyToClipboard}
                  size="sm"
                  variant="outline"
                  className="h-8 px-3"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy All
                </Button>
              </div>

              <div className="bg-muted/20 border border-muted/30 rounded-lg p-4">
                <pre className="font-mono text-foreground whitespace-pre-wrap break-words">
                  {extractedText}
                </pre>
              </div>

              <div className="mt-4 text-sm text-muted-foreground">
                <p>💡 Tip: Use the extracted numbers in our Number Converter or AI Convert tools!</p>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
