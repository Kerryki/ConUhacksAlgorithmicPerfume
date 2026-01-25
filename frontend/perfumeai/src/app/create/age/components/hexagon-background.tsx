"use client"

import { useEffect, useRef } from "react"

export function HexagonBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawHexagons()
    }

    const drawHexagon = (x: number, y: number, size: number, opacity: number) => {
      const numberOfSides = 6
      ctx.beginPath()
      ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0))

      for (let i = 1; i <= numberOfSides; i++) {
        ctx.lineTo(
          x + size * Math.cos((i * 2 * Math.PI) / numberOfSides),
          y + size * Math.sin((i * 2 * Math.PI) / numberOfSides)
        )
      }

      ctx.closePath()
      ctx.strokeStyle = `rgba(251, 191, 36, ${opacity})`
      ctx.lineWidth = 1
      ctx.stroke()
    }

    const drawHexagons = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const size = 60
      const horizontalSpacing = size * 1.75
      const verticalSpacing = size * 1.5

      for (let row = -1; row < canvas.height / verticalSpacing + 2; row++) {
        for (let col = -1; col < canvas.width / horizontalSpacing + 2; col++) {
          const x = col * horizontalSpacing + (row % 2 === 0 ? 0 : horizontalSpacing / 2)
          const y = row * verticalSpacing

          const distanceFromCenter = Math.sqrt(
            Math.pow(x - canvas.width / 2, 2) + Math.pow(y - canvas.height / 2, 2)
          )
          const maxDistance = Math.sqrt(
            Math.pow(canvas.width / 2, 2) + Math.pow(canvas.height / 2, 2)
          )
          const opacity = 0.03 + (1 - distanceFromCenter / maxDistance) * 0.08

          drawHexagon(x, y, size, opacity)
        }
      }

      // Add some glowing nodes at random intersections
      const nodePositions = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3 },
        { x: canvas.width * 0.8, y: canvas.height * 0.2 },
        { x: canvas.width * 0.15, y: canvas.height * 0.7 },
        { x: canvas.width * 0.85, y: canvas.height * 0.8 },
        { x: canvas.width * 0.5, y: canvas.height * 0.1 },
        { x: canvas.width * 0.5, y: canvas.height * 0.9 },
      ]

      nodePositions.forEach((pos) => {
        const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 80)
        gradient.addColorStop(0, "rgba(251, 191, 36, 0.12)")
        gradient.addColorStop(1, "rgba(251, 191, 36, 0)")
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, 80, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = "rgba(251, 191, 36, 0.5)"
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, 3, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
