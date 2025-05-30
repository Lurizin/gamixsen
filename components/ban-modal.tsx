"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle, XCircle } from "lucide-react"

interface BanModalProps {
  type: "correct" | "incorrect"
  onContinue: () => void
}

export default function BanModal({ type, onContinue }: BanModalProps) {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const isCorrect = type === "correct"

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-[#1e1339] rounded-xl p-6 border border-[#ff3399]/20 max-w-sm w-full"
      >
        <div className="text-center">
          <motion.div
            className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
              isCorrect ? "bg-[#00ff66]/20" : "bg-red-500/20"
            }`}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            {isCorrect ? (
              <CheckCircle className="h-8 w-8 text-[#00ff66]" />
            ) : (
              <XCircle className="h-8 w-8 text-red-500" />
            )}
          </motion.div>

          <h3 className={`text-xl font-bold mb-4 ${isCorrect ? "text-[#00ff66]" : "text-red-500"}`}>
            {isCorrect ? "Você está correto!" : "Errado!"}
          </h3>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Nosso painel é totalmente <span className="text-[#00ff66] font-semibold">antiban</span> e{" "}
            <span className="text-[#00ff66] font-semibold">indetectável</span>, podendo ser usado em qualquer modo de
            jogo e conta.
          </p>

          <button
            onClick={onContinue}
            disabled={countdown > 0}
            className={`w-full py-3 rounded-lg font-medium transition-all ${
              countdown > 0
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#00ff66] to-[#ff3399] text-white hover:shadow-lg hover:shadow-[#ff3399]/20"
            }`}
          >
            {countdown > 0 ? `Continuar (${countdown}s)` : "Continuar"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
