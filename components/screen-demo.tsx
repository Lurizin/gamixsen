"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Switch } from "@/components/ui/switch"
import { ChevronRight, ToggleLeft, MousePointer } from "lucide-react"

interface ScreenDemoProps {
  onNext: () => void
}

export default function ScreenDemo({ onNext }: ScreenDemoProps) {
  const [activeDemo, setActiveDemo] = useState("aimbot")
  const [aimbotActive, setAimbotActive] = useState(false)
  const [wallhackActive, setWallhackActive] = useState(false)
  const [noRecoilActive, setNoRecoilActive] = useState(false)
  const [shooting, setShooting] = useState(false)
  const [bulletHoles, setBulletHoles] = useState<{ x: number; y: number; id: number }[]>([])
  const [countdown, setCountdown] = useState(5)
  const [canContinue, setCanContinue] = useState(false)

  useEffect(() => {
    // Start countdown when component mounts
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setCanContinue(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const demos = [
    { id: "aimbot", name: "Aimbot", description: "Mira automática inteligente" },
    { id: "wallhack", name: "Wallhack", description: "Visão através de paredes" },
    { id: "norecoil", name: "No Recoil", description: "Controle total de recuo" },
  ]

  const handleShoot = () => {
    if (shooting) return
    setShooting(true)

    setBulletHoles([])

    if (noRecoilActive) {
      const centerShots = Array.from({ length: 5 }, (_, i) => ({
        x: 60 + (Math.random() - 0.5) * 10,
        y: 60 + (Math.random() - 0.5) * 10,
        id: i,
      }))
      setBulletHoles(centerShots)
    } else {
      const spreadShots = Array.from({ length: 5 }, (_, i) => ({
        x: 10 + Math.random() * 100,
        y: 10 + Math.random() * 100,
        id: i,
      }))
      setBulletHoles(spreadShots)
    }

    setTimeout(() => setShooting(false), 1000)
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
      className="bg-[#1e1339]/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-[#ff3399]/20"
    >
      <motion.h2
        className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center bg-gradient-to-r from-[#00ff66] to-[#ff3399] text-transparent bg-clip-text"
        variants={itemVariants}
      >
        Demonstração das Funções
      </motion.h2>

      <motion.div className="text-base sm:text-lg font-medium mb-4 sm:mb-6 text-center" variants={itemVariants}>
        Veja como cada hack funciona na prática
      </motion.div>

      {/* Demo Selection */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4 sm:mb-6">
        {demos.map((demo) => (
          <button
            key={demo.id}
            onClick={() => setActiveDemo(demo.id)}
            className={`p-3 rounded-lg text-sm font-medium transition-all ${
              activeDemo === demo.id
                ? "bg-gradient-to-r from-[#00ff66]/20 to-[#ff3399]/20 border border-[#00ff66]/50"
                : "bg-[#2a1b4a]/50 border border-[#6e40c9]/30 hover:border-[#ff3399]/50"
            }`}
          >
            <div className="text-sm sm:text-base">{demo.name}</div>
            <div className="text-xs text-gray-400 mt-1">{demo.description}</div>
          </button>
        ))}
      </motion.div>

      {/* Demo Area */}
      <motion.div
        variants={itemVariants}
        className="bg-[#2a1b4a]/50 rounded-lg p-4 sm:p-6 border border-[#6e40c9]/30 mb-4 sm:mb-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
          <h3 className="font-bold text-lg">{demos.find((d) => d.id === activeDemo)?.name}</h3>

          {/* Highlighted Switch */}
          <motion.div
            className="flex items-center gap-3 p-3 rounded-lg bg-[#00ff66]/10 border border-[#00ff66]/30"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(0, 255, 102, 0.3)",
                "0 0 0 8px rgba(0, 255, 102, 0)",
                "0 0 0 0 rgba(0, 255, 102, 0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <ToggleLeft className="h-5 w-5 text-[#00ff66]" />
            <span className="text-sm font-medium">
              {activeDemo === "aimbot" && (aimbotActive ? "Ativado" : "Desativado")}
              {activeDemo === "wallhack" && (wallhackActive ? "Ativado" : "Desativado")}
              {activeDemo === "norecoil" && (noRecoilActive ? "Ativado" : "Desativado")}
            </span>
            <Switch
              checked={
                activeDemo === "aimbot" ? aimbotActive : activeDemo === "wallhack" ? wallhackActive : noRecoilActive
              }
              onCheckedChange={(checked) => {
                if (activeDemo === "aimbot") setAimbotActive(checked)
                else if (activeDemo === "wallhack") setWallhackActive(checked)
                else setNoRecoilActive(checked)
              }}
            />
          </motion.div>
        </div>

        {/* Aimbot Demo */}
        {activeDemo === "aimbot" && (
          <div className="relative w-full h-48 sm:h-64 bg-gradient-to-b from-[#0f172a] to-[#1e293b] rounded-lg overflow-hidden">
            {/* Enemy Character */}
            <motion.div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <motion.div
                className="w-6 sm:w-8 h-6 sm:h-8 bg-[#8b5a3c] rounded-full relative mx-auto"
                animate={shooting ? { scale: [1, 0.9, 1] } : {}}
              >
                <AnimatePresence>
                  {shooting && (
                    <motion.div
                      key={Date.now()}
                      initial={{ opacity: 0, y: 0, scale: 0.5 }}
                      animate={{ opacity: 1, y: -20, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className={`absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2 font-bold text-sm sm:text-lg ${
                        aimbotActive ? "text-red-500" : "text-yellow-500"
                      }`}
                    >
                      {aimbotActive ? "144" : "60"}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              <div className="w-8 sm:w-12 h-12 sm:h-16 bg-[#4a5568] rounded-lg mt-1 mx-auto"></div>
              <div className="flex justify-between w-10 sm:w-16 -mt-8 sm:-mt-12">
                <div className="w-2 sm:w-3 h-8 sm:h-12 bg-[#8b5a3c] rounded-lg"></div>
                <div className="w-2 sm:w-3 h-8 sm:h-12 bg-[#8b5a3c] rounded-lg"></div>
              </div>
              <div className="flex justify-center gap-1 mt-2 sm:mt-4">
                <div className="w-3 sm:w-4 h-8 sm:h-12 bg-[#2d3748] rounded-lg"></div>
                <div className="w-3 sm:w-4 h-8 sm:h-12 bg-[#2d3748] rounded-lg"></div>
              </div>
            </motion.div>

            {/* Crosshair */}
            <motion.div
              className="absolute w-6 sm:w-8 h-6 sm:h-8 pointer-events-none"
              animate={{
                left: "calc(49% - 12px)",
                top: aimbotActive ? "calc(32% - 36px)" : "calc(40% - 8px)",
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="relative w-full h-full">
                <div className="absolute top-1/2 left-1/2 w-3 sm:w-4 h-0.5 bg-[#00ff66] transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-1/2 w-0.5 h-3 sm:h-4 bg-[#00ff66] transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-1/2 w-5 sm:w-6 h-5 sm:h-6 border border-[#00ff66] rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </motion.div>

            {/* Highlighted Shoot Button */}
            <motion.button
              onClick={() => {
                setShooting(true)
                setTimeout(() => setShooting(false), 800)
              }}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-[#ff3399] rounded-lg text-white font-medium hover:bg-[#ff3399]/80 transition-colors border-2 border-[#00ff66]/50"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(255, 51, 153, 0.3)",
                  "0 0 0 8px rgba(255, 51, 153, 0)",
                  "0 0 0 0 rgba(255, 51, 153, 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="flex items-center gap-2">
                <MousePointer className="h-4 w-4" />
                <span className="text-sm">Atirar</span>
              </div>
            </motion.button>
          </div>
        )}

        {/* Wallhack Demo */}
        {activeDemo === "wallhack" && (
          <div className="relative w-full h-48 sm:h-64 bg-gradient-to-b from-[#0f172a] to-[#1e293b] rounded-lg overflow-hidden">
            <motion.div
              className="relative w-full h-full"
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.img
                key={wallhackActive ? "ativado" : "desativado"}
                src={wallhackActive ? "/images/ativado.jpg" : "/images/desativado.jpg"}
                alt={wallhackActive ? "Wallhack Ativado" : "Wallhack Desativado"}
                className="w-full h-full object-cover rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />

              {wallhackActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[#00ff66]/10 rounded-lg"
                />
              )}
            </motion.div>

            <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-black/70 px-2 sm:px-3 py-1 rounded-lg">
              <div
                className={`flex items-center gap-2 text-xs sm:text-sm font-medium ${wallhackActive ? "text-[#00ff66]" : "text-gray-400"}`}
              >
                <div className={`w-2 h-2 rounded-full ${wallhackActive ? "bg-[#00ff66]" : "bg-gray-400"}`}></div>
                <span>{wallhackActive ? "WALLHACK ATIVO" : "WALLHACK INATIVO"}</span>
              </div>
            </div>

            <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 text-center bg-black/70 px-3 sm:px-4 py-1 sm:py-2 rounded-lg">
              <div className="text-xs sm:text-sm text-white">
                {wallhackActive ? "Inimigos visíveis através das paredes" : "Visão normal do jogo"}
              </div>
            </div>
          </div>
        )}

        {/* No Recoil Demo */}
        {activeDemo === "norecoil" && (
          <div className="relative w-full h-48 sm:h-64 bg-gradient-to-b from-[#0f172a] to-[#1e293b] rounded-lg overflow-hidden">
            <div className="absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2">
              <div className="relative w-24 sm:w-32 h-24 sm:h-32">
                <div className="absolute inset-0 border-2 sm:border-4 border-white rounded-full"></div>
                <div className="absolute inset-2 sm:inset-4 border-2 sm:border-4 border-red-500 rounded-full"></div>
                <div className="absolute inset-4 sm:inset-8 border-2 sm:border-4 border-white rounded-full"></div>
                <div className="absolute inset-6 sm:inset-12 border-2 sm:border-4 border-red-500 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 w-2 sm:w-4 h-2 sm:h-4 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>

                <AnimatePresence>
                  {bulletHoles.map((hole) => (
                    <motion.div
                      key={hole.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute w-1.5 sm:w-2 h-1.5 sm:h-2 bg-black rounded-full"
                      style={{
                        left: `${hole.x}px`,
                        top: `${hole.y}px`,
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="absolute left-4 sm:left-8 bottom-12 sm:bottom-16">
              <motion.div
                className="w-12 sm:w-16 h-3 sm:h-4 bg-[#4a5568] rounded-lg"
                animate={shooting ? { x: [0, -2, 0], y: [0, -1, 0] } : {}}
                transition={{ duration: 0.1, repeat: shooting ? 5 : 0 }}
              >
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#ff3399] rounded-full ml-10 sm:ml-14 mt-0.5 sm:mt-1"></div>
              </motion.div>
            </div>

            {/* Highlighted Shoot Button */}
            <motion.button
              onClick={handleShoot}
              disabled={shooting}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-[#ff3399] rounded-lg text-white font-medium disabled:opacity-50 border-2 border-[#00ff66]/50"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(255, 51, 153, 0.3)",
                  "0 0 0 8px rgba(255, 51, 153, 0)",
                  "0 0 0 0 rgba(255, 51, 153, 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="flex items-center gap-2">
                <MousePointer className="h-4 w-4" />
                <span className="text-sm">{shooting ? "Atirando..." : "Atirar"}</span>
              </div>
            </motion.button>

            <div className="absolute top-2 sm:top-4 left-1/2 transform -translate-x-1/2 text-center">
              <div className="text-xs sm:text-sm text-gray-400">
                {noRecoilActive ? "Tiros precisos no centro" : "Tiros espalhados"}
              </div>
            </div>
          </div>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="flex justify-center">
        <motion.button
          whileHover={canContinue ? { scale: 1.05 } : {}}
          whileTap={canContinue ? { scale: 0.95 } : {}}
          onClick={canContinue ? onNext : undefined}
          disabled={!canContinue}
          className={`px-6 sm:px-8 py-3 rounded-full font-medium text-white flex items-center gap-2 transition-all ${
            canContinue
              ? "bg-gradient-to-r from-[#00ff66] to-[#ff3399] shadow-lg shadow-[#ff3399]/20 hover:shadow-[#ff3399]/40 cursor-pointer"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          <span className="text-sm sm:text-base">{canContinue ? "Continuar" : `Aguarde ${countdown}s`}</span>
          {canContinue && <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />}
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
