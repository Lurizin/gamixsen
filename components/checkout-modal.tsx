"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Crown, CheckCircle, ExternalLink } from "lucide-react"
import { generateUtmQueryString } from "@/lib/utmUtils";

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  
const handleOffer1 = () => {
  const utmQuery = generateUtmQueryString();
  window.open(`https://pay.xsensis.com.br/permanente${utmQuery}`, "_blank"); // URL corrigida
};

const handleOffer2 = () => {
  const utmQuery = generateUtmQueryString();
  window.open(`https://pay.xsensis.com.br/trimensal${utmQuery}`, "_blank"); // URL corrigida
};


  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const features = [
    "Aimbot Premium",
    "Wallhack HD",
    "No Recoil",
    "Auto Headshot",
    "Suporte 24/7",
    "Atualizações Gratuitas",
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-[#1e1339] rounded-xl border border-[#ff3399]/20 max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-6 pb-4">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              <motion.h2
                variants={itemVariants}
                className="text-2xl font-bold text-center bg-gradient-to-r from-[#00ff66] to-[#ff3399] text-transparent bg-clip-text mb-2"
              >
                Escolha seu Plano
              </motion.h2>

              <motion.p variants={itemVariants} className="text-center text-gray-300 text-sm">
                Oferta por tempo limitado!
              </motion.p>
            </div>

            {/* Offers Container */}
            <div className="px-6 pb-6 space-y-4">
              {/* Offer 1 - DESTACADA */}
              <motion.div variants={itemVariants} className="relative">
                {/* Popular Badge */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-[#00ff66] to-[#ff3399] px-4 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1">
                    <Crown className="h-3 w-3" />
                    MAIS POPULAR
                  </div>
                </div>

                <motion.div
                  className="bg-gradient-to-br from-[#00ff66]/10 to-[#ff3399]/10 border-2 border-[#00ff66]/50 rounded-xl p-5 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(0, 255, 102, 0.3)",
                      "0 0 0 8px rgba(0, 255, 102, 0)",
                      "0 0 0 0 rgba(0, 255, 102, 0.3)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00ff66]/5 to-[#ff3399]/5 rounded-xl"></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-[#00ff66]">Acesso Permanente</h3>
                      <div className="bg-[#ff3399] text-white px-2 py-1 rounded-full text-xs font-bold">75% OFF</div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-white">R$ 12,97</span>
                        <span className="text-sm text-gray-400 line-through">R$ 22,90</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">Pagamento único</div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-[#00ff66] flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                      <div className="text-xs text-gray-400 mt-2">+ Todos os recursos premium</div>
                    </div>

                    <motion.button
                      onClick={handleOffer1}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-3 rounded-lg font-bold text-white bg-gradient-to-r from-[#00ff66] to-[#ff3399] shadow-lg shadow-[#ff3399]/20 flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      ESCOLHER ESTE PLANO
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>

              {/* Offer 2 */}
              <motion.div
                variants={itemVariants}
                className="bg-[#2a1b4a]/50 border border-[#6e40c9]/30 rounded-xl p-5 hover:border-[#ff3399]/50 transition-all"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-white">Acesso Trimestral</h3>
                  <div className="bg-[#6e40c9] text-white px-2 py-1 rounded-full text-xs font-bold">75% OFF</div>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">R$ 5,90</span>
                    <span className="text-sm text-gray-400 line-through">R$ 10,49</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">3 meses de acesso</div>
                </div>

                <div className="space-y-2 mb-4">
                  {features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-[#6e40c9] flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                  <div className="text-xs text-gray-400 mt-2">Recursos completos por 3 meses</div>
                </div>

                <motion.button
                  onClick={handleOffer2}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 rounded-lg font-bold text-white bg-[#6e40c9] hover:bg-[#6e40c9]/80 transition-colors flex items-center justify-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  ESCOLHER ESTE PLANO
                </motion.button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div variants={itemVariants} className="text-center pt-4 border-t border-[#6e40c9]/30">
                <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-[#00ff66] rounded-full"></div>
                    <span>Pagamento Seguro</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-[#00ff66] rounded-full"></div>
                    <span>Suporte 24/7</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-[#00ff66] rounded-full"></div>
                    <span>Antiban</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
