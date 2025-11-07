"use client"

import { useState, useRef, useEffect } from "react"
import { CheckCircle, Download, Upload, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

interface PFPBorderAppProps {
  isOpen: boolean
  onClose: () => void
}

export default function PFPBorderApp({ isOpen, onClose }: PFPBorderAppProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [status, setStatus] = useState<{ type: "idle" | "success"; message: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev)
        return objectUrl
      })
      setStatus({ type: "success", message: "Image uploaded! Border applied automatically." })
    }
  }

  const handleDownload = async () => {
    if (!selectedImage || !canvasRef.current) {
      setStatus({ type: "idle", message: "Please upload an image before downloading." })
      return
    }

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
    setStatus({ type: "success", message: "Download ready! Check your downloads folder." })
  }

  const handleClose = () => {
    setSelectedImage(null)
    setPreviewUrl(null)
    setStatus(null)
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 -z-10 opacity-40 blur-3xl bg-gradient-to-br from-orange-500/60 via-pink-500/40 to-purple-700/40" />
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/30 text-white transition hover:bg-black/50"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-8">
              <div className="space-y-2 text-center">
                <p className="text-sm uppercase tracking-[0.35em] text-orange-200">Custom Tool</p>
                <h2 className="text-3xl font-bold text-white">PFP Border Creator</h2>
                <p className="text-white/70">Upload a profile image and instantly wrap it in the official border.</p>
              </div>

              {/* Preview Area */}
              <div className="flex flex-col gap-6 lg:flex-row">
                <div className="flex-1 rounded-3xl border border-white/25 bg-black/30 p-6 text-center shadow-inner">
                  <div className="relative mx-auto flex h-64 w-64 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-black">
                    {previewUrl ? (
                      <>
                        <img
                          src={previewUrl}
                          alt="User preview"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <img
                          src="/pfp-border.png"
                          alt="Border overlay"
                          className="absolute inset-0 h-[115%] w-[115%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none z-10"
                        />
                      </>
                    ) : (
                      <p className="px-4 text-center text-white/60">Upload an image to preview</p>
                    )}
                  </div>
                </div>
                <div className="flex-1 space-y-4 rounded-3xl border border-white/20 bg-white/5 p-6 backdrop-blur">
                  <h3 className="text-lg font-semibold text-white">How it works</h3>
                  <ul className="space-y-3 text-sm text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-orange-400" />
                      Upload a square image for best results. Non-square images auto-crop.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-orange-400" />
                      Preview updates instantly with our border overlay.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-orange-400" />
                      Download produces a 512×512 PNG ready for socials.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Buttons */}
              <div className="grid gap-3 md:grid-cols-2">
                <button
                  type="button"
                  onClick={handleUploadClick}
                  className="group flex items-center justify-center gap-2 rounded-2xl border border-orange-300/40 bg-white/10 px-4 py-3 font-semibold text-white transition hover:bg-white/20"
                >
                  <Upload className="h-5 w-5 text-orange-300 transition group-hover:translate-y-0.5" />
                  Upload Image
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={!selectedImage}
                  className="group flex items-center justify-center gap-2 rounded-2xl border border-emerald-300/40 bg-emerald-500/80 px-4 py-3 font-semibold text-white transition hover:bg-emerald-400/90 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/10"
                >
                  <Download className="h-5 w-5 transition group-hover:translate-y-0.5" />
                  Download PFP
                </button>
              </div>

              {status && (
                <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-sm text-white/80">
                  <CheckCircle className="h-4 w-4 text-emerald-300" />
                  {status.message}
                </div>
              )}

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
