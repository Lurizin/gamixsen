"use client"

import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

interface Screen3Props {
  onNext: () => void
}

export default function Screen3({ onNext }: Screen3Props) {
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
        Como funciona o Painel?
      </motion.h2>

      <motion.div variants={itemVariants} className="mb-8">
        <div className="relative">
          <img
            src="/images/panel-interface.png"
            alt="Interface do Painel SENSIS"
            className="w-full h-auto rounded-lg border border-[#6e40c9]/30"
          />

          {/* Overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e1339]/20 to-transparent rounded-lg"></div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="w-full py-4 rounded-full font-medium text-white bg-gradient-to-r from-[#00ff66] to-[#ff3399] shadow-lg shadow-[#ff3399]/20 hover:shadow-[#ff3399]/40 flex items-center justify-center gap-2"
        >
          <span>Testar Funções</span>
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
