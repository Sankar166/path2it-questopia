
import { supabase } from '../supabase';
import type { Question } from '@/types/questions';

export async function getQuestions(category: string): Promise<Question[]> {
  try {
    // Convert category to lowercase for consistent matching
    const normalizedCategory = category.toLowerCase();
    console.log(`Fetching questions for category: ${normalizedCategory}`);
    
    // Return an empty array for all categories
    console.log(`Returning empty question array for category: ${normalizedCategory}`);
    return [];
  } catch (error) {
    console.error('Exception fetching questions:', error);
    // Return empty array on error to prevent undefined errors
    return [];
  }
}
