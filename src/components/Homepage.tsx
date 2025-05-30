import QuizPage from "../components/QuizPage"
import type { Difficulty } from "../types"
import { useQuestions } from "../hooks/useQuestions"

interface HomepageProps {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Homepage({ setIsLogin }: HomepageProps) {
  const {
    categories,
    questions,
    category,
    quizAmount,
    difficulty,
    isQuizStart,
    isLoading,
    timeLeft,
    setTimeLeft,
    startQuiz,
    handlePlayAgain,
    setCategory,
    setDifficulty,
    setQuizAmount,
  } = useQuestions()
  const storedAuth = localStorage.getItem("auth")
  const user = storedAuth ? JSON.parse(storedAuth) : null
  const isLogin: boolean = localStorage.getItem("isLogin") === "true"

  if (isLoading.generateCategories || isLoading.generateQuestions) {
    return (
      <div className="h-screen w-full flex items-center justify-center font-bold text-2xl italic">
        {isLoading.generateCategories ? "Loading please wait ..." : isLoading.generateQuestions && "Loading generate questions ..."}
      </div>
    )
  }

  const handleLogout = () => {
    const isConfirm: boolean = confirm("are you sure want to logout ?")

    if (isConfirm) {
      localStorage.setItem("isLogin", "false")
      setIsLogin(false)
    }
  }

  if (isLogin && isQuizStart) {
    return <QuizPage questions={questions} playAgain={handlePlayAgain} />
  }

  return (
    <>
      <div className="h-screen w-full flex items-center justify-center bg-slate-300">
        <div className="w-120 p-5 flex flex-col gap-y-3">
          <h1 className="  text-2xl font-bold mb-5">Quick Trivia</h1>
          <div className="flex items-center justify-between w-full">
            <p className="capitalize ">
              Welcome, <span className="font-semibold">{user?.username}</span>
            </p>

            <button
              type="button"
              onClick={handleLogout}
              className="text-white px-2 py-1 bg-red-500 text-sm font-semibold rounded-lg hover:opacity-70 cursor-pointer">
              Logout
            </button>
          </div>

          {/* Select Category */}
          <div className="flex flex-col justify-start gap-y-2 px-1">
            <label htmlFor="category" className="font-semibold">
              Select Category
            </label>
            <select
              name="categories"
              id="category"
              className="ring-1 ring-slate-500 py-1 px-3"
              value={category}
              onChange={(e) => setCategory(Number(e.target.value))}>
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Select Difficulty */}
          <div className="flex flex-col justify-start gap-y-2 px-1">
            <label htmlFor="difficulty" className="font-semibold">
              Select Difficulty
            </label>
            <select
              name="difficulty"
              id="difficulty"
              className="ring-1 ring-slate-500 py-1 px-3"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty)}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Total Question */}
          <div className="flex flex-col justify-start gap-y-2 px-1">
            <label htmlFor="totalQuestions" className="font-semibold">
              Select Total Questions
            </label>
            <select
              name="totalQuestions"
              id="totalQuestions"
              className="ring-1 ring-slate-500 py-1 px-3"
              value={quizAmount}
              onChange={(e) => setQuizAmount(e.target.value)}>
              <option value={10}>10 questions</option>
              <option value={20}>20 questions</option>
              <option value={30}>30 questions</option>
            </select>
          </div>

          {/* Set Timer*/}
          <div className="flex flex-col justify-start gap-y-2 px-1">
            <label htmlFor="timeLeft" className="font-semibold">
              Select Timer
            </label>
            <select
              name="timeLeft"
              id="timeLeft"
              className="ring-1 ring-slate-500 py-1 px-3"
              value={timeLeft}
              onChange={(e) => setTimeLeft(Number(e.target.value))}>
              <option value={600}>10 : 00</option>
              <option value={1200}>20 : 00</option>
              <option value={1800}>30 : 00</option>
            </select>
          </div>

          {/* Button Start Quiz */}
          <button onClick={startQuiz} className="mt-3 px-5 py-2 bg-blue-500 font-semibold text-white rounded-lg hover:brightness-70 cursor-pointer">
            Start Quiz
          </button>
        </div>
      </div>
    </>
  )
}
