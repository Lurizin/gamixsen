"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import ScreenIntro from "@/components/screen-intro"
import ScreenPhone from "@/components/screen-phone"
import Screen1 from "@/components/screen-1"
import Screen2 from "@/components/screen-2"
import Screen3 from "@/components/screen-3"
import ScreenDemo from "@/components/screen-demo"
import ScreenReviews from "@/components/screen-reviews"
import Screen4 from "@/components/screen-4"
import Screen5 from "@/components/screen-5"
import LoadingScreen from "@/components/loading-screen"
import { Progress } from "@/components/ui/progress"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState(0) // Start with intro screen
  const [isLoading, setIsLoading] = useState(false)
  const [userAnswers, setUserAnswers] = useState({
    phoneModel: "",
    reason: "",
    gameMode: "",
    banConcern: "",
  })
  const [discount, setDiscount] = useState(0)

  const totalScreens = 9 // Updated to include reviews screen
  const progress = (currentScreen / totalScreens) * 100

  const handleNext = () => {
    if (currentScreen < totalScreens) {
      // Show loading before transitioning (except for the last screen)
      if (currentScreen < totalScreens - 1) {
        setIsLoading(true)

        // Hide loading and show next screen after delay
        setTimeout(() => {
          setIsLoading(false)
          setCurrentScreen(currentScreen + 1)
        }, 2000) // 2 seconds loading
      } else {
        setCurrentScreen(currentScreen + 1)
      }
    }
  }

  const handleAnswerSelect = (question: string, answer: string) => {
    setUserAnswers({
      ...userAnswers,
      [question]: answer,
    })
  }

  const handleDiscountSet = (discountValue: number) => {
    setDiscount(discountValue)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#1a0b2e] to-[#0f172a] text-white overflow-hidden">
      <div className="container max-w-md mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="SENSIS Logo" className="h-8 w-auto" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#00ff66]"></div>
            <span className="text-[#00ff66] text-sm font-medium">Indetect</span>
          </div>
        </div>

        {currentScreen > 0 && !isLoading && (
          <div className="mb-6 w-full">
            <div className="flex justify-between text-xs mb-1">
              <span>Progresso</span>
              <span>{progress.toFixed(0)}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-gray-800">
              <div className="h-full bg-gradient-to-r from-[#00ff66] to-[#ff3399]" style={{ width: `${progress}%` }} />
            </Progress>
          </div>
        )}

        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingScreen key="loading" />
          ) : (
            <>
              {currentScreen === 0 && <ScreenIntro key="screen-intro" onNext={handleNext} />}
              {currentScreen === 1 && (
                <ScreenPhone
                  key="screen-phone"
                  onNext={handleNext}
                  onAnswerSelect={handleAnswerSelect}
                  userAnswers={userAnswers}
                />
              )}
              {currentScreen === 2 && (
                <Screen1
                  key="screen1"
                  onNext={handleNext}
                  onAnswerSelect={handleAnswerSelect}
                  userAnswers={userAnswers}
                />
              )}
              {currentScreen === 3 && <Screen2 key="screen2" onNext={handleNext} onDiscountSet={handleDiscountSet} />}
              {currentScreen === 4 && <Screen3 key="screen3" onNext={handleNext} />}
              {currentScreen === 5 && <ScreenDemo key="screen-demo" onNext={handleNext} />}
              {currentScreen === 6 && <ScreenReviews key="screen-reviews" />}
              {currentScreen === 7 && <Screen4 key="screen4" onNext={handleNext} discount={discount} />}
              {currentScreen === 8 && <Screen5 key="screen5" />}
            </>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
