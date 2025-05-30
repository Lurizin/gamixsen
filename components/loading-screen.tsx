"use client"

import { motion } from "framer-motion"

export default function LoadingScreen() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center z-50"
    >
      {/* Main Text */}
      <motion.div
        className="text-white text-lg font-medium mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        👀 Tem gente no checkout...
      </motion.div>

      {/* Simple Loading Spinner */}
      <motion.div
        className="w-12 h-12 border-3 border-white/20 border-t-white rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        style={{ borderWidth: "3px" }}
      />
    </motion.div>
  )
}
