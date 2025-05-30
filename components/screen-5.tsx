"use client"

import { motion } from "framer-motion"
import { CheckCircle, Download, MessageSquare, Star } from "lucide-react"
import Confetti from "@/components/confetti"

export default function Screen5() {
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
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const floatVariants = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <>
      <Confetti />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-[#1e1339]/80 backdrop-blur-sm rounded-xl p-6 border border-[#ff3399]/20"
      >
        <motion.div className="flex justify-center mb-6" variants={itemVariants}>
          <motion.div
            className="w-20 h-20 rounded-full bg-gradient-to-r from-[#00ff66] to-[#ff3399] flex items-center justify-center"
            variants={floatVariants}
            animate="float"
          >
            <CheckCircle className="h-10 w-10 text-white" />
          </motion.div>
        </motion.div>

        <motion.h2
          className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-[#00ff66] to-[#ff3399] text-transparent bg-clip-text"
          variants={itemVariants}
        >
          Vitória!
        </motion.h2>

        <motion.div className="text-xl font-medium mb-8 text-center" variants={itemVariants}>
          Bem-vindo ao Clã Elite
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <div className="bg-[#2a1b4a]/50 rounded-lg p-5 border border-[#6e40c9]/30 mb-6">
            <h3 className="font-bold text-lg mb-4 text-center">Seus Benefícios VIP</h3>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00ff66]/20 to-[#ff3399]/20 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-[#00ff66]" />
                </div>
                <div>
                  <div className="font-medium">Grupo VIP no WhatsApp</div>
                  <div className="text-sm text-gray-400">Suporte exclusivo 24/7</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00ff66]/20 to-[#ff3399]/20 flex items-center justify-center">
                  <Download className="h-5 w-5 text-[#ff3399]" />
                </div>
                <div>
                  <div className="font-medium">E-book Secreto</div>
                  <div className="text-sm text-gray-400">Dicas avançadas do painel</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00ff66]/20 to-[#ff3399]/20 flex items-center justify-center">
                  <Star className="h-5 w-5 text-[#00ff66]" />
                </div>
                <div>
                  <div className="font-medium">Atualizações Exclusivas</div>
                  <div className="text-sm text-gray-400">Seja o primeiro a receber novidades</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4">
          <motion.a
            href="#"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 rounded-full font-medium text-white bg-[#25D366] flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20"
          >
            <MessageSquare className="h-5 w-5" />
            <span>Entrar no Grupo VIP</span>
          </motion.a>

          <motion.a
            href="#"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 rounded-full font-medium text-white bg-gradient-to-r from-[#00ff66] to-[#ff3399] flex items-center justify-center gap-2 shadow-lg shadow-[#ff3399]/20"
          >
            <Download className="h-5 w-5" />
            <span>Baixar E-book Secreto</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </>
  )
}
