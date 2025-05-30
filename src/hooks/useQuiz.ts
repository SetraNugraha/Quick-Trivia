/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useQuestions } from "./useQuestions"

export function useQuiz() {
  const { questions, isQuizStart, timeLeft, setTimeLeft } = useQuestions()

  const [currQuiz, setCurrQuiz] = useState<number>(() => JSON.parse(localStorage.getItem("currQuiz") || "0"))

  const [score, setScore] = useState<number>(() => JSON.parse(localStorage.getItem("score") || "0"))

  const [isFinishQuiz, setIsFinishQuiz] = useState<boolean>(localStorage.getItem("isFinishQuiz") === "true")

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const [isGiveUp, setIsGiveUp] = useState<boolean>(false)

  // Handle Button Answer
  const handleAnswer = (answer: string) => {
    const correctAnswer: boolean = answer === questions[currQuiz].correct_answer

    if (correctAnswer) {
      setScore((prev) => prev + 1)
    }

    setSelectedAnswer(answer)

    setTimeout(() => {
      setSelectedAnswer(null)
      setCurrQuiz((prev) => prev + 1)
    }, 2000)
  }

  // Handle Give Up
  const handleGiveUp = () => {
    const isConfirm = confirm("Are you sure want to give up ?")

    if (isConfirm) {
      setIsGiveUp(true)
    }
  }

  // Prepare data result
  const prepareResult = () => {
    setIsFinishQuiz(true)
    localStorage.setItem("isQuizStart", "true")
    localStorage.setItem("isFinishQuiz", "true")
    localStorage.setItem("score", score.toString())
    localStorage.removeItem("timeLeft")
  }

  // Countdown Timer
  useEffect(() => {
    if (!isQuizStart || timeLeft <= 0 || isFinishQuiz) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (currQuiz >= questions.length) {
          return 0
        }

        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  // Update Timeleft or Current Quiz
  useEffect(() => {
    if (!isQuizStart || isFinishQuiz) return
    localStorage.setItem("timeLeft", timeLeft.toString())
    localStorage.setItem("currQuiz", currQuiz.toString())
  }, [timeLeft, currQuiz])

  //  Result Time Out
  useEffect(() => {
    if (!isQuizStart) return
    if (timeLeft === 0 && currQuiz < questions.length) {
      const wait = setTimeout(() => {
        prepareResult()
      }, 3000)

      return () => clearTimeout(wait)
    }
  }, [timeLeft])

  // Result All Questions Answered
  useEffect(() => {
    if (!isQuizStart) return
    if (currQuiz >= questions.length || isGiveUp) {
      prepareResult()
      setIsGiveUp(false)
    }
  }, [currQuiz, isGiveUp])

  return { currQuiz, score, selectedAnswer, timeLeft, isFinishQuiz, handleAnswer, setTimeLeft, handleGiveUp }
}
