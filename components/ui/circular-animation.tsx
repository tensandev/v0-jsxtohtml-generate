"use client"

import { useEffect, useRef } from "react"

export function CircularAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const size = 60
    canvas.width = size
    canvas.height = size

    let time = 0
    const animate = () => {
      time += 0.02

      // Clear canvas
      ctx.clearRect(0, 0, size, size)

      // Draw circle
      ctx.strokeStyle = "#e0e0e0"
      ctx.lineWidth = 1

      const centerX = size / 2
      const centerY = size / 2
      const radius = size * 0.35

      // Draw outer circle
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.stroke()

      // Draw moving dot
      const dotX = centerX + Math.cos(time) * radius
      const dotY = centerY + Math.sin(time) * radius

      ctx.fillStyle = "#888888"
      ctx.beginPath()
      ctx.arc(dotX, dotY, 3, 0, Math.PI * 2)
      ctx.fill()

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="w-[60px] h-[60px]" aria-hidden="true" />
}
