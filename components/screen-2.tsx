"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Gift } from "lucide-react"

interface Screen2Props {
  onNext: () => void
  onDiscountSet: (discount: number) => void
}

export default function Screen2({ onNext, onDiscountSet }: Screen2Props) {
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<number | null>(null)

  // CONFIGURAÇÃO FÁCIL: Altere este valor para mudar onde a roleta para
  // Valores possíveis: 10, 30, 50, 75, 90 ou 0 (sem desconto)
  const WINNING_DISCOUNT = 75

  // Mapeamento dos descontos para rotação (em graus)
  // Baseado na posição dos segmentos na imagem da roleta
  const discountToRotation: { [key: number]: number } = {
    10: 45, // 10% OFF (verde, topo direita)
    50: 135, // 50% OFF (laranja, direita)
    30: 225, // 30% OFF (vermelho, baixo direita)
    75: 315, // 75% OFF (azul, baixo esquerda)
    90: 0, // 90% OFF (laranja, esquerda)
    0: 180, // SEM DESCONTO (vermelho, baixo)
  }

  const handleSpin = () => {
    if (spinning || result !== null) return

    setSpinning(true)

    // Calcular rotação final baseada no desconto configurado
    const baseRotation = 360 * 5 // 5 voltas completas
    const finalPosition = discountToRotation[WINNING_DISCOUNT] || 0
    const totalRotation = baseRotation + finalPosition

    setTimeout(() => {
      setSpinning(false)
      setResult(WINNING_DISCOUNT)
      onDiscountSet(WINNING_DISCOUNT)

      // Auto proceed after showing result
      setTimeout(() => {
        onNext()
      }, 3000)
    }, 3000)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-[#1e1339]/80 backdrop-blur-sm rounded-xl p-6 border border-[#ff3399]/20"
    >
      <motion.h2
        className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-[#00ff66] to-[#ff3399] text-transparent bg-clip-text"
        variants={itemVariants}
      >
        Desbloqueie um Desconto Exclusivo!
      </motion.h2>

      <motion.div variants={itemVariants} className="flex flex-col items-center justify-center mb-8">
        {/* Arrow Pointer */}
        <motion.div
          className="mb-2"
          animate={spinning ? { rotate: [0, 10, -10, 0] } : {}}
          transition={{ duration: 0.5, repeat: spinning ? Number.POSITIVE_INFINITY : 0 }}
        >
          <div className="w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-[#ff3399]"></div>
        </motion.div>

        {/* Wheel Container */}
        <div className="relative">
          <motion.img
            src="/images/roleta.png"
            alt="Roleta de Descontos"
            className="w-64 h-64 rounded-full"
            animate={
              spinning
                ? {
                    rotate: [0, 260 * 5 + (discountToRotation[WINNING_DISCOUNT] || 0)],
                  }
                : {}
            }
            transition={
              spinning
                ? {
                    duration: 3,
                    ease: "easeOut",
                  }
                : {}
            }
          />

          {/* Result Overlay */}
          {result !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-full"
            >
              <div className="text-center">
                <Gift className="h-12 w-12 text-[#00ff66] mx-auto mb-2" />
                <div className="text-[#00ff66] font-bold text-2xl">
                  {result > 0 ? `${result}% OFF` : "Tente Novamente"}
                </div>
                <div className="text-white text-sm mt-1">Parabéns!</div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Instructions */}
        <motion.div className="mt-4 text-center" variants={itemVariants}>
          <div className="text-sm text-gray-400">
            {spinning ? "Girando..." : result ? "Desconto desbloqueado!" : "Clique no botão para girar"}
          </div>
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSpin}
          disabled={spinning || result !== null}
          className={`px-8 py-3 rounded-full font-medium text-white ${
            spinning || result !== null
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-[#00ff66] to-[#ff3399] shadow-lg shadow-[#ff3399]/20 hover:shadow-[#ff3399]/40"
          }`}
        >
          {spinning ? "Girando..." : result ? "Parabéns!" : "Girar Roleta"}
        </motion.button>
      </motion.div>

      {/* Easy Configuration Comment */}
      <div className="hidden">
        {/* 
        CONFIGURAÇÃO DA ROLETA:
        Para alterar onde a roleta para, mude o valor de WINNING_DISCOUNT no topo do componente.
        
        Valores disponíveis:
        - 10: Para no 10% OFF (verde)
        - 30: Para no 30% OFF (vermelho)
        - 50: Para no 50% OFF (laranja)
        - 75: Para no 75% OFF (azul) - PADRÃO
        - 90: Para no 90% OFF (laranja)
        - 0: Para no SEM DESCONTO (vermelho)
        */}
      </div>
    </motion.div>
  )
}
