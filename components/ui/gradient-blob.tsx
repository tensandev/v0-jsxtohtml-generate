"use client"

import { useEffect, useRef } from "react"

interface GradientBlobProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  color1: string
  color2: string
}

export function GradientBlob({ position, color1, color2 }: GradientBlobProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const size = 300
    canvas.width = size
    canvas.height = size

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, size, size)
    gradient.addColorStop(0, color1)
    gradient.addColorStop(1, color2)

    let time = 0
    const animate = () => {
      time += 0.005

      // Clear canvas
      ctx.clearRect(0, 0, size, size)

      // Draw blob
      ctx.fillStyle = gradient
      ctx.beginPath()

      const centerX = size / 2
      const centerY = size / 2
      const radius = size * 0.3

      for (let angle = 0; angle < Math.PI * 2; angle += 0.01) {
        const xOffset = Math.sin(angle * 3 + time) * 15
        const yOffset = Math.cos(angle * 2 + time) * 15
        const x = centerX + Math.cos(angle) * (radius + xOffset)
        const y = centerY + Math.sin(angle) * (radius + yOffset)

        if (angle === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.closePath()
      ctx.fill()

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [color1, color2])

  const positionClasses = {
    "top-left": "left-0 top-0",
    "top-right": "right-0 top-0",
    "bottom-left": "left-0 bottom-0",
    "bottom-right": "right-0 bottom-0",
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute w-[300px] h-[300px] opacity-20 pointer-events-none ${positionClasses[position]}`}
      aria-hidden="true"
    />
  )
}
