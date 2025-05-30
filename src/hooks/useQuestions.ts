/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import axios from "axios"
import type { Category, Difficulty, Question, GetCategoriesResponse, GetQuestionsResponse } from "../types"

export function useQuestions() {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  // Get Data From API
  const [categories, setCategories] = useState<Category[]>([])
  // Selected Category before quiz start
  const [category, setCategory] = useState<number>(0)
  const [quizAmount, setQuizAmount] = useState<string | number>("10")
  const [difficulty, setDifficulty] = useState<Difficulty>("easy")

  const [isLoading, setIsLoading] = useState<{ generateCategories: boolean; generateQuestions: boolean }>({
    generateCategories: false,
    generateQuestions: false,
  })

  const [questions, setQuestions] = useState<Question[]>(() => JSON.parse(localStorage.getItem("questions") || "[]"))

  const [isQuizStart, setIsQuizStart] = useState<boolean>(localStorage.getItem("isQuizStart") === "true")

  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const storedTimeLeft = localStorage.getItem("timeLeft")
    return storedTimeLeft ? Number(storedTimeLeft) : 600
  })

  const getCategories = async () => {
    setIsLoading((prev) => ({ ...prev, generateCategories: true }))
    try {
      const res = await axios.get<GetCategoriesResponse>(`${BASE_URL}/api_category.php`)
      setCategories(res.data.trivia_categories)
    } catch (error) {
      console.error("getCategories Error: ", error)
    } finally {
      setIsLoading((prev) => ({ ...prev, generateCategories: false }))
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  const startQuiz = () => {
    setIsLoading((prev) => ({ ...prev, generateQuestions: true }))
    setTimeout(async () => {
      try {
        const totalQuiz = Number(quizAmount) < 1 ? 10 : quizAmount
        const res = await axios.get<GetQuestionsResponse>(`${BASE_URL}/api.php`, {
          params: {
            amount: totalQuiz,
            category: category,
            difficulty: difficulty,
            type: "multiple",
          },
        })

        setQuestions(res.data.results)
        localStorage.setItem("questions", JSON.stringify(res.data.results))
        setIsQuizStart(true)
        localStorage.setItem("isQuizStart", "true")
        localStorage.setItem("isFinishQuiz", "false")
        localStorage.setItem("timeLeft", timeLeft.toString())
        localStorage.setItem("score", JSON.stringify(0))
      } catch (error) {
        console.log("Error generate questions: ", error)
      } finally {
        setIsLoading((prev) => ({ ...prev, generateQuestions: false }))
      }
    }, 3500)
  }

  const handlePlayAgain = () => {
    setCategory(0)
    setQuizAmount(10)
    setDifficulty("easy")
    setIsQuizStart(false)
    localStorage.removeItem("questions")
    localStorage.removeItem("isQuizStart")
    localStorage.removeItem("score")
    localStorage.removeItem("currQuiz")
    localStorage.removeItem("isFinishQuiz")
    localStorage.removeItem("timeLeft")
  }

  return {
    categories,
    questions,
    category,
    quizAmount,
    difficulty,
    timeLeft,
    isQuizStart,
    isLoading,
    startQuiz,
    handlePlayAgain,
    setCategory,
    setDifficulty,
    setQuizAmount,
    setTimeLeft,
  }
}
