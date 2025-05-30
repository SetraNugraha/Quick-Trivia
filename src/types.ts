export interface Category {
  id: number
  name: string
}

export interface GetCategoriesResponse {
  trivia_categories: Category[]
}

export type Difficulty = "easy" | "medium" | "hard"

export interface Question {
  type: string
  difficulty: Difficulty
  category: string
  question: string
  correct_answer: string
  incorrect_answers: string[3]
}

export interface GetQuestionsResponse {
  results: Question[]
}
