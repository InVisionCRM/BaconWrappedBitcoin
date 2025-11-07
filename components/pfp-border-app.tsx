"use client"

import { useState, useRef } from "react"
import { X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

interface PFPBorderAppProps {
  isOpen: boolean
  onClose: () => void
}

export default function PFPBorderApp({ isOpen, onClose }: PFPBorderAppProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)
    }
  }

  const handleDownload = async () => {
    if (!selectedImage || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const size = 512
    canvas.width = size
    canvas.height = size

    // Load user image
    const userImg = new Image()
    userImg.src = previewUrl!

    // Load border image
    const borderImg = new Image()
    borderImg.src = "/pfp-border.png"

    // Wait for both images to load
    await Promise.all([
      new Promise((resolve) => {
        userImg.onload = resolve
      }),
      new Promise((resolve) => {
        borderImg.onload = resolve
      }),
    ])

    // Create circular clipping path
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
    ctx.closePath()
    ctx.clip()

    // Calculate aspect ratio for user image to prevent stretching
    const imgAspect = userImg.width / userImg.height
    let drawWidth = size
    let drawHeight = size
    let offsetX = 0
    let offsetY = 0

    if (imgAspect > 1) {
      // Image is wider - fit height and crop width
      drawWidth = size * imgAspect
      offsetX = -(drawWidth - size) / 2
    } else if (imgAspect < 1) {
      // Image is taller - fit width and crop height
      drawHeight = size / imgAspect
      offsetY = -(drawHeight - size) / 2
    }

    // Draw user image (cover fit, no stretching)
    ctx.drawImage(userImg, offsetX, offsetY, drawWidth, drawHeight)

    // Calculate border size (15% bigger means scale to 1.15)
    const borderScale = 1.15
    const borderSize = size * borderScale
    const borderOffset = (size - borderSize) / 2

    // Draw border on top (15% bigger, centered)
    ctx.drawImage(borderImg, borderOffset, borderOffset, borderSize, borderSize)

    // Convert to data URL and trigger download
    const dataUrl = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.href = dataUrl
    link.download = "pfp-with-border.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleClose = () => {
    setSelectedImage(null)
    setPreviewUrl(null)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[6000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-white"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">PFP Border Creator</h2>
                <p className="text-gray-400">Upload your image and add a custom border</p>
              </div>

              {/* Preview Area */}
              <div className="flex justify-center">
                <div className="relative w-64 h-64 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                  {previewUrl ? (
                    <>
                      <img
                        src={previewUrl}
                        alt="User preview"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <img
                        src="/pfp-border.png"
                        alt="Border overlay"
                        className="absolute inset-0 w-[115%] h-[115%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none z-10"
                      />
                    </>
                  ) : (
                    <p className="text-gray-500 text-center px-4">Upload an image to preview</p>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleUploadClick}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                >
                  Upload Image
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={!selectedImage}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                  Download PFP
                </button>
              </div>

              {/* Hidden Elements */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <canvas ref={canvasRef} className="hidden" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
