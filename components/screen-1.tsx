"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle } from "lucide-react"
import BanModal from "@/components/ban-modal"

interface Screen1Props {
  onNext: () => void
  onAnswerSelect: (question: string, answer: string) => void
  userAnswers: {
    reason: string
    gameMode: string
    banConcern: string
  }
}

export default function Screen1({ onNext, onAnswerSelect, userAnswers }: Screen1Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<"correct" | "incorrect">("correct")

  const questions = [
    {
      question: "Porque você quer o painel?",
      options: ["Não consigo dar capa", "Minha sensibilidade nunca fica boa", "Meu celular trava muito", "Quero xitar"],
      key: "reason",
    },
    {
      question: "O que você mais joga?",
      options: ["CS Ranked", "Ranqueada", "Apostado", "Sala Verde"],
      key: "gameMode",
    },
    {
      question: "Você acha que o painel dá ban?",
      options: ["Sim", "Não"],
      key: "banConcern",
    },
  ]

  const handleOptionSelect = (option: string) => {
    onAnswerSelect(questions[currentQuestion].key, option)

    // Special handling for ban question
    if (questions[currentQuestion].key === "banConcern") {
      setModalType(option === "Sim" ? "incorrect" : "correct")
      setShowModal(true)
      return
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      onNext()
    }
  }

  const handleModalContinue = () => {
    setShowModal(false)
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
    <>
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
          Perfil de Jogador
        </motion.h2>

        <motion.div variants={itemVariants} className="mb-6">
          <h3 className="text-lg font-medium mb-4">{questions[currentQuestion].question}</h3>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOptionSelect(option)}
                className={`w-full p-4 rounded-lg flex items-center justify-between text-left ${
                  userAnswers[questions[currentQuestion].key as keyof typeof userAnswers] === option
                    ? "bg-gradient-to-r from-[#00ff66]/20 to-[#ff3399]/20 border border-[#00ff66]/50"
                    : "bg-[#2a1b4a]/50 border border-[#6e40c9]/30 hover:border-[#ff3399]/50"
                }`}
              >
                <span className="text-sm sm:text-base">{option}</span>
                {userAnswers[questions[currentQuestion].key as keyof typeof userAnswers] === option && (
                  <CheckCircle className="h-5 w-5 text-[#00ff66] flex-shrink-0" />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div className="flex justify-center" variants={itemVariants}>
          <motion.div className="text-xs text-center text-gray-400">
            Pergunta {currentQuestion + 1} de {questions.length}
          </motion.div>
        </motion.div>
      </motion.div>

      <AnimatePresence>{showModal && <BanModal type={modalType} onContinue={handleModalContinue} />}</AnimatePresence>
    </>
  )
}
