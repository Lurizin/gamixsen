"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Smartphone, ChevronRight } from "lucide-react"

interface ScreenPhoneProps {
  onNext: () => void
  onAnswerSelect: (question: string, answer: string) => void
  userAnswers: {
    phoneModel: string
    reason: string
    gameMode: string
    banConcern: string
  }
}

export default function ScreenPhone({ onNext, onAnswerSelect, userAnswers }: ScreenPhoneProps) {
  const [phoneModel, setPhoneModel] = useState(userAnswers.phoneModel || "")

  const handleNext = () => {
    onAnswerSelect("phoneModel", phoneModel)
    onNext()
  }

  const handleSkip = () => {
    onAnswerSelect("phoneModel", "Não informado")
    onNext()
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
      <motion.div className="text-center mb-8" variants={itemVariants}>
        <motion.div
          className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#00ff66] to-[#ff3399] rounded-full flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Smartphone className="h-8 w-8 text-white" />
        </motion.div>

        <motion.h2
          className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#00ff66] to-[#ff3399] text-transparent bg-clip-text"
          variants={itemVariants}
        >
          Qual é o seu celular?
        </motion.h2>

        <motion.p className="text-gray-300 mb-6" variants={itemVariants}>
          Nos ajude a otimizar o painel para o seu dispositivo
        </motion.p>
      </motion.div>

      <motion.div variants={itemVariants} className="mb-6">
        <label htmlFor="phoneModel" className="block text-sm font-medium mb-3 text-gray-300">
          Modelo do celular
        </label>
        <input
          id="phoneModel"
          type="text"
          value={phoneModel}
          onChange={(e) => setPhoneModel(e.target.value)}
          placeholder="Ex: iPhone 14, Samsung Galaxy S23, Xiaomi Redmi..."
          className="w-full p-4 rounded-lg bg-[#2a1b4a]/50 border border-[#6e40c9]/30 text-white placeholder-gray-400 focus:border-[#00ff66]/50 focus:outline-none focus:ring-2 focus:ring-[#00ff66]/20 transition-all"
        />
      </motion.div>

      <motion.div variants={itemVariants} className="mb-8">
        <button onClick={handleSkip} className="text-sm text-gray-400 hover:text-[#ff3399] transition-colors underline">
          Não sei o modelo
        </button>
      </motion.div>

      <motion.div variants={itemVariants} className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="w-full py-4 rounded-full font-medium text-white bg-gradient-to-r from-[#00ff66] to-[#ff3399] shadow-lg shadow-[#ff3399]/20 hover:shadow-[#ff3399]/40 flex items-center justify-center gap-2"
        >
          <span>Prosseguir</span>
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
