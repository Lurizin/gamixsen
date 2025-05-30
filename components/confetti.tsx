"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ConfettiPiece {
  id: number
  x: number
  y: number
  color: string
  size: number
  rotation: number
}

export default function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    const colors = ["#00ff66", "#ff3399", "#6e40c9", "#ffcc00", "#00ccff"]
    const newPieces: ConfettiPiece[] = []

    for (let i = 0; i < 50; i++) {
      newPieces.push({
        id: i,
        x: Math.random() * 100,
        y: -20 - Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 5 + Math.random() * 10,
        rotation: Math.random() * 360,
      })
    }

    setPieces(newPieces)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "0%",
          }}
          initial={{ y: piece.y, x: piece.x, rotate: piece.rotation }}
          animate={{
            y: "120%",
            x: [piece.x - 10, piece.x + 10, piece.x - 5, piece.x + 5, piece.x],
            rotate: piece.rotation + 360 * 2,
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            ease: "easeOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}
