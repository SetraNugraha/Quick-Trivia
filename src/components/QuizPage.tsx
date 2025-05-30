import ResultPage from "./ResultPage"
import { formatTimer } from "../utils/formatTimer"
import type { Question } from "../types"
import { useQuiz } from "../hooks/useQuiz"

interface QuizPageProps {
  questions: Question[]
  playAgain: () => void
}

export default function QuizPage({ questions, playAgain }: QuizPageProps) {
  const { currQuiz, score, selectedAnswer, timeLeft, isFinishQuiz, handleAnswer, handleGiveUp } = useQuiz()

  if (questions.length === 0) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center gap-y-5">
        <h1 className="text-3xl font-bold">Sorry, there are no questions</h1>
        <button onClick={playAgain} className="mt-3 px-5 py-2 bg-blue-500 font-semibold text-white rounded-lg hover:brightness-70 cursor-pointer">
          Back
        </button>
      </div>
    )
  }

  // Result PAGE
  if (isFinishQuiz) {
    return (
      <ResultPage playAgain={playAgain} totalCorrect={score} totalIncorrect={currQuiz - score} amountQuiz={questions.length} totalAnswered={currQuiz} />
    )
  }

  if (currQuiz >= questions.length || !questions[currQuiz]) {
    return null
  }

  return (
    <>
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-300">
        <div className="mx-5 p-5 xl:w-[60%] bg-slate-200 xl:p-7 rounded-xl flex flex-col items-center gap-y-3">
          {/* Header */}
          <div className="w-full text-center">
            <h1 className="xl:text-2xl font-bold">Quiz has started! Choose your answers correctly</h1>
            <p className="font-semibold text-slate-500 italic text-[18px] mt-2">Questions {`${currQuiz + 1} of ${questions.length}`}</p>
            <p className="font-semibold">{timeLeft !== 0 ? formatTimer(timeLeft) : <span className="text-red-500">Time Out !</span>}</p>
          </div>

          {/* Quetions */}
          <div className="mt-5 w-full flex flex-col justify-start">
            <h1 className="font-bold italic tracking-wider" dangerouslySetInnerHTML={{ __html: `${currQuiz + 1}. ${questions[currQuiz].question}` }}></h1>

            {/* Answer */}
            <div className="grid grid-cols-2 gap-x-15">
              {[...questions[currQuiz].incorrect_answers, questions[currQuiz].correct_answer].sort().map((item, index) => {
                const isCorrect = item === questions[currQuiz].correct_answer
                const isSelected = selectedAnswer === item

                return (
                  <button
                    key={index}
                    disabled={selectedAnswer !== null || timeLeft === 0}
                    onClick={() => handleAnswer(item)}
                    className={`mt-3 px-3 py-1 font-semibold text-slate-200  rounded-lg hover:brightness-70 cursor-pointer disabled:cursor-not-allowed  disabled:hover:brightness-100 ${
                      selectedAnswer === null ? "bg-slate-500" : isCorrect ? "bg-green-700" : isSelected ? "bg-red-500" : "bg-slate-500"
                    } `}>
                    {item}
                  </button>
                )
              })}
            </div>

            {/* Info  */}
            {currQuiz + 1 >= questions.length && selectedAnswer !== null ? (
              <p className="mt-5 ml-1 font-semibold italic">You've finished all questions. Loading result ...</p>
            ) : timeLeft === 0 ? (
              <p className="mt-5 ml-1 font-semibold italic">Time's up. Loading result ...</p>
            ) : (
              selectedAnswer !== null && <p className="mt-5 ml-1 font-semibold italic">loading next question ...</p>
            )}
          </div>
        </div>

        <button onClick={handleGiveUp} className="mt-5 px-5 py-2 bg-red-500 font-semibold text-white rounded-lg hover:brightness-70 cursor-pointer">
          Give Up
        </button>
      </div>
    </>
  )
}
