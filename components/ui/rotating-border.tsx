"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface RotatingBorderProps {
  children: React.ReactNode
  className?: string
}

export function RotatingBorder({ children, className = "" }: RotatingBorderProps) {
  const borderRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const border = borderRef.current
    if (!border) return

    let rotation = 0
    const animate = () => {
      rotation += 0.1
      if (border) {
        border.style.background = `
          linear-gradient(${rotation}deg, rgba(255,255,255,0) 0%, rgba(200,200,200,1) 50%, rgba(255,255,255,0) 100%)
        `
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className={`relative p-[1px] rounded-md ${className}`}>
      <div ref={borderRef} className="absolute inset-0 rounded-md opacity-50" aria-hidden="true" />
      <div className="relative bg-white rounded-md h-full">{children}</div>
    </div>
  )
}
