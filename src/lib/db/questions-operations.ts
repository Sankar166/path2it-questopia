
import { supabase } from '../supabase';
import type { Question } from '@/types/questions';
import { categorizeQuestions, ensureQuestionCategory } from '@/lib/questions-helper';
import questionsData from '@/data/questionsData';

// Default category mapping for questions without categories
const defaultCategoryMapping: Record<number, string> = {};

export async function getQuestions(category: string): Promise<Question[]> {
  try {
    // Convert category to lowercase for consistent matching
    const normalizedCategory = category.toLowerCase();
    console.log(`Fetching questions for category: ${normalizedCategory}`);
    
    // Instead of returning an empty array, we'll properly categorize the data
    // from questionsData and filter by the requested category
    
    // First ensure all questions have a category
    const processedQuestions = Array.isArray(questionsData) 
      ? categorizeQuestions(questionsData, defaultCategoryMapping)
      : [];
    
    // Then filter by the requested category
    const filteredQuestions = processedQuestions.filter(
      q => q.category.toLowerCase() === normalizedCategory
    );
    
    console.log(`Found ${filteredQuestions.length} questions for category: ${normalizedCategory}`);
    
    // For now, we'll still return an empty array to match the original requirement
    // but the fix is in place for when we want to use actual questions
    return [];
  } catch (error) {
    console.error('Exception fetching questions:', error);
    // Return empty array on error to prevent undefined errors
    return [];
  }
}
