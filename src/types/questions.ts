
export interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuestionsByCategory {
  [key: string]: Question[];
}

export interface QuestionsArray {
  questions: Question[];
}

export interface UserProgress {
  id: string;
  user_id: string;
  question_id: number;
  category: string;
  is_correct: boolean;
  created_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  display_name: string;
  total_questions_attempted: number;
  correct_answers: number;
  created_at: string;
  updated_at: string;
}

