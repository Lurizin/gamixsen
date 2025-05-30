"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Play } from "lucide-react"

interface ScreenIntroProps {
  onNext: () => void
}

export default function ScreenIntro({ onNext }: ScreenIntroProps) {
  const [canStart, setCanStart] = useState(false)
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setCanStart(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

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
      <motion.div className="text-center mb-8" variants={itemVariants}>
        <motion.div
          className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-[#00ff66] to-[#ff3399] rounded-full flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Play className="h-8 w-8 text-white ml-1" />
        </motion.div>

        <motion.h1
          className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#00ff66] to-[#ff3399] text-transparent bg-clip-text"
          variants={itemVariants}
        >
          Criar Perfil de Jogo
        </motion.h1>

        <motion.p className="text-lg text-gray-300 mb-6 leading-relaxed" variants={itemVariants}>
          Participe da promoção do <span className="text-[#00ff66] font-semibold">Xsensis</span> respondendo algumas
          perguntinhas, em seguida veja como nosso painel funciona!
        </motion.p>

        <motion.div className="text-sm text-gray-400 mb-8" variants={itemVariants}>
          Clique no botão abaixo:
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} className="flex justify-center">
        <motion.button
          whileHover={canStart ? { scale: 1.05 } : {}}
          whileTap={canStart ? { scale: 0.95 } : {}}
          onClick={canStart ? onNext : undefined}
          disabled={!canStart}
          className={`w-full py-4 rounded-full font-bold text-lg text-white flex items-center justify-center gap-3 transition-all ${
            canStart
              ? "bg-gradient-to-r from-[#00ff66] to-[#ff3399] shadow-lg shadow-[#ff3399]/20 hover:shadow-[#ff3399]/40 cursor-pointer"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          <Play className="h-5 w-5" />
          <span>{canStart ? "Começar agora!" : `Aguarde ${countdown}s`}</span>
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
