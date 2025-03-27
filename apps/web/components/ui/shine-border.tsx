"use client"

import type React from "react"
import { useRef, useEffect } from "react"

interface ShineBorderProps {
  children: React.ReactNode
  className?: string
  borderClassName?: string
  duration?: number
}

export function ShineBorder({ children, className = "", borderClassName = "", duration = 2000 }: ShineBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect()
      const x = (e.clientX - left) / width
      const y = (e.clientY - top) / height

      container.style.setProperty("--mouse-x", `${x * 100}%`)
      container.style.setProperty("--mouse-y", `${y * 100}%`)
    }

    container.addEventListener("mousemove", handleMouseMove)
    return () => container.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
  ref={containerRef}
  className={`group relative ${className}`}
//   @ts-ignore
  style={{ "--shine-duration": `${duration}ms`, position: "relative" }} // Ensure a stacking context
>
  <div className={`absolute inset-0 rounded-xl ${borderClassName}`} style={{ zIndex: -1 }}>
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
      style={{
        background: `radial-gradient(
          300px circle at var(--mouse-x) var(--mouse-y),
          rgba(75, 0, 130, 0.3),   /* Darker Purple for center */
          rgba(128, 0, 255, 0.15), /* Subtle glow effect */
          transparent 60%
        )`,
        backdropFilter: "blur(12px)",  // Glass blur effect
        WebkitBackdropFilter: "blur(12px)",
        transition: "background 0.4s ease, backdrop-filter 0.4s ease",
      }}
      
    />
  </div>

  {/* Content gets a higher stacking level */}
  <div className="relative z-10">{children}</div>
</div>

  )
}

