"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, ExternalLink } from "lucide-react"
import CheckoutModal from "@/components/checkout-modal"

export default function ScreenReviews() {
  const [countdown, setCountdown] = useState(15)
  const [canCheckout, setCanCheckout] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [videoError, setVideoError] = useState(false)

  const totalTime = 15
  const progress = ((totalTime - countdown) / totalTime) * 100

  useEffect(() => {
    // Start countdown when component mounts
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setCanCheckout(true)
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

  const handleCheckout = () => {
    if (canCheckout) {
      setShowModal(true)
    }
  }

  // Calculate stroke dash array for circular progress
  const radius = 20
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference

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
          Veja algumas avaliações de quem usou XSensis!
        </motion.h2>

        <motion.div variants={itemVariants} className="mb-6">
          {/* Stars */}
          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.div
                key={star}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + star * 0.1 }}
              >
                <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
              </motion.div>
            ))}
          </div>

          {/* Video Label */}
          <motion.div
            className="text-center mb-3"
            variants={itemVariants}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <span className="text-[#00ff66] font-semibold text-lg">👀 Veja este vídeo</span>
          </motion.div>

          {/* Video Container - Simplified */}
          <div className="relative w-full aspect-square mb-6 rounded-lg overflow-hidden bg-[#2a1b4a]/50 border border-[#6e40c9]/30">
            {!videoError ? (
              <iframe
                src="https://iframe.mediadelivery.net/embed/428817/dda29e37-5909-4f67-9461-212bbf0097bb?autoplay=false&loop=true&muted=true&preload=true&responsive=true"
                loading="lazy"
                className="absolute top-0 left-0 w-full h-full border-0"
                allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
                allowFullScreen
                onError={() => setVideoError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#ff3399]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-[#ff3399]" />
                  </div>
                  <p className="text-white font-medium">Vídeo de Demonstração</p>
                  <p className="text-gray-400 text-sm mt-2">Mostrando resultados incríveis!</p>
                </div>
              </div>
            )}
          </div>

          {/* Testimonial Quote */}
          <div className="text-center mb-6">
            <blockquote className="italic text-gray-300">
              "O XSensis mudou completamente minha experiência no jogo. Recomendo a todos!"
            </blockquote>
            <div className="mt-2 text-[#00ff66] font-medium">- Pedroxxs</div>
          </div>
        </motion.div>

        {/* Progress Circle - Only show during countdown */}
        {!canCheckout && (
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-4"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <div className="relative w-16 h-16">
              {/* Background Circle */}
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 50 50">
                <circle
                  cx="25"
                  cy="25"
                  r={radius}
                  stroke="rgba(110, 64, 201, 0.3)"
                  strokeWidth="3"
                  fill="transparent"
                />
                {/* Progress Circle */}
                <motion.circle
                  cx="25"
                  cy="25"
                  r={radius}
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  fill="transparent"
                  strokeLinecap="round"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
                {/* Gradient Definition */}
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00ff66" />
                    <stop offset="100%" stopColor="#ff3399" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Countdown Number */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  className="text-white font-bold text-lg"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  {countdown}
                </motion.span>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div variants={itemVariants} className="flex justify-center">
          <motion.button
            whileHover={canCheckout ? { scale: 1.05 } : {}}
            whileTap={canCheckout ? { scale: 0.95 } : {}}
            onClick={handleCheckout}
            disabled={!canCheckout}
            className={`w-full py-4 rounded-full font-bold text-lg text-white flex items-center justify-center gap-2 transition-all ${
              canCheckout
                ? "bg-gradient-to-r from-[#00ff66] to-[#ff3399] shadow-lg shadow-[#ff3399]/20 hover:shadow-[#ff3399]/40 cursor-pointer"
                : "bg-gray-600 cursor-not-allowed"
            }`}
            animate={
              canCheckout
                ? {
                    boxShadow: [
                      "0 0 0 0 rgba(0, 255, 102, 0.3)",
                      "0 0 0 8px rgba(0, 255, 102, 0)",
                      "0 0 0 0 rgba(0, 255, 102, 0.3)",
                    ],
                  }
                : {}
            }
            transition={canCheckout ? { duration: 2, repeat: Number.POSITIVE_INFINITY } : {}}
          >
            {canCheckout && <ExternalLink className="w-5 h-5" />}
            <span>{canCheckout ? "Resgatar meu Painel" : `Aguarde ${countdown}s`}</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Checkout Modal */}
      <CheckoutModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}
