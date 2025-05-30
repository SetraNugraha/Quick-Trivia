interface ResultPageProps {
  amountQuiz: number
  totalAnswered: number
  totalCorrect: number
  totalIncorrect: number
  playAgain: () => void
}

export default function ResultPage({ amountQuiz, totalAnswered, totalCorrect, totalIncorrect, playAgain }: ResultPageProps) {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-y-5">
      <div className="flex flex-col items-start w-45 justify-center gap-y-3">
        <h1 className="text-3xl font-bold">Result</h1>
        <p className="text-xl font-semibold">Total Questions: {amountQuiz}</p>
        <div className="flex flex-col w-full gap-y-3">
          <p className="text-lg w-full flex justify-between font-semibold px-3 py-1 bg-slate-600 rounded-lg text-white">
            Answered <span>{totalAnswered}</span>
          </p>
          <p className="text-lg w-full flex justify-between font-semibold px-3 py-1 bg-green-600 rounded-lg text-white">
            Correct <span>{totalCorrect}</span>
          </p>
          <p className="text-lg w-full flex justify-between font-semibold px-3 py-1 bg-red-600 rounded-lg text-white">
            Incorrect <span>{totalIncorrect}</span>
          </p>
        </div>

        <button onClick={playAgain} className="mt-3 px-5 py-2 bg-blue-500 font-semibold text-white rounded-lg hover:brightness-70 cursor-pointer">
          Play Again
        </button>
      </div>
    </div>
  )
}
