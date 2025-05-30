"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Clock, Flame, Shield, Zap } from "lucide-react"

interface Screen4Props {
  onNext: () => void
  discount: number
}

export default function Screen4({ onNext, discount }: Screen4Props) {
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [features] = useState([
    { name: "Aimbot Premium", icon: <Flame className="h-5 w-5" />, description: "Mira automática avançada" },
    {
      name: "Wallhack HD",
      icon: <Shield className="h-5 w-5" />,
      description: "Visão através de paredes em alta definição",
    },
    { name: "Auto Headshot", icon: <Zap className="h-5 w-5" />, description: "Tiros certeiros na cabeça" },
  ])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const originalPrice = 97
  const discountedPrice = originalPrice * (1 - discount / 100)

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

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.9, 1, 0.9],
      transition: {
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-[#1e1339]/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-[#ff3399]/20"
    >
      <motion.h2
        className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center bg-gradient-to-r from-[#00ff66] to-[#ff3399] text-transparent bg-clip-text"
        variants={itemVariants}
      >
        Missão Final
      </motion.h2>

      <motion.div className="text-lg sm:text-xl font-medium mb-4 text-center" variants={itemVariants}>
        Ative seu Painel de Guerra
      </motion.div>

      {discount > 0 && (
        <motion.div variants={itemVariants} className="text-center mb-4">
          <div className="inline-block bg-[#00ff66]/20 border border-[#00ff66]/50 rounded-lg px-4 py-2">
            <span className="text-[#00ff66] font-bold text-lg">🎉 {discount}% OFF Desbloqueado!</span>
          </div>
        </motion.div>
      )}

      <motion.div variants={itemVariants} className="flex items-center justify-center mb-4 sm:mb-6">
        <motion.div
          className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-[#2a1b4a]/70 border border-[#ff3399]/30"
          variants={pulseVariants}
          animate="pulse"
        >
          <Clock className="h-4 w-4 text-[#ff3399]" />
          <span className="text-[#ff3399] font-mono font-bold text-sm sm:text-base">{formatTime(timeLeft)}</span>
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
        <div className="bg-[#2a1b4a]/50 rounded-lg p-4 sm:p-5 border border-[#6e40c9]/30 mb-4 sm:mb-6">
          <h3 className="font-bold text-lg mb-4 text-center">Painel SENSIS Elite</h3>

          <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-gradient-to-r from-[#00ff66]/20 to-[#ff3399]/20 flex items-center justify-center flex-shrink-0">
                  {feature.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm sm:text-base">{feature.name}</div>
                  <div className="text-xs sm:text-sm text-gray-400">{feature.description}</div>
                </div>
                <div className="flex-shrink-0">
                  <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5 text-[#00ff66]" />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center border-t border-[#6e40c9]/30 pt-4">
            <div>
              <div className="text-xs sm:text-sm text-gray-400">Preço normal</div>
              <div className="text-base sm:text-lg line-through text-gray-500">R$ {originalPrice.toFixed(2)}</div>
            </div>
            <div className="text-right">
              {discount > 0 && <div className="text-xs sm:text-sm text-[#00ff66]">Desconto de {discount}%</div>}
              <div className="text-xl sm:text-2xl font-bold text-[#00ff66]">R$ {discountedPrice.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="w-full py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg text-white bg-gradient-to-r from-[#00ff66] to-[#ff3399] shadow-lg shadow-[#ff3399]/20 hover:shadow-[#ff3399]/40"
          variants={pulseVariants}
          animate="pulse"
        >
          DESBLOQUEAR AGORA
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
