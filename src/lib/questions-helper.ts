import type { Question } from '@/types/questions';

// Helper function to ensure questions have categories
export function ensureQuestionCategory(question: any, defaultCategory: string): Question {
  return {
    ...question,
    category: question.category || defaultCategory
  } as Question;
}

// Helper function to categorize questions without categories
export function categorizeQuestions(questions: any[], defaultCategories: Record<number, string>): Question[] {
  return questions.map(q => {
    // If the question already has a category, use it
    if (q.category) {
      return q as Question;
    }
    
    // Otherwise, try to assign a category based on ID ranges or a default
    const category = defaultCategories[q.id] || 
                    (q.id <= 250 ? 'quantitative aptitude' :
                     q.id <= 500 ? 'technical' :
                     q.id <= 750 ? 'reasoning' : 'general knowledge');
    
    return {
      ...q,
      category
    } as Question;
  });
}
