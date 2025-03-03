
import { supabase } from '../supabase';
import type { Question } from '@/types/questions';

export async function getQuestions(category: string) {
  try {
    // Convert category to lowercase for consistent matching
    const normalizedCategory = category.toLowerCase();
    console.log(`Fetching questions for category: ${normalizedCategory}`);
    
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('category', normalizedCategory)
      .order('id');

    if (error) {
      console.error('Error fetching questions:', error);
      throw error;
    }
    
    // Handle empty data response
    if (!data || data.length === 0) {
      console.log(`No questions found for category: ${normalizedCategory}`);
      // Try fetching from local data if available
      try {
        // Import the questionsData correctly - it's an array export, not a default export
        const localData = await import('@/data/questionsData.ts');
        
        // The data is directly exported as an array, not as default
        if (localData && Array.isArray(localData)) {
          const filteredQuestions = localData.filter(
            (q: any) => {
              // If question has category, check if it matches, otherwise assume it belongs to current category
              return q.category ? 
                q.category.toLowerCase() === normalizedCategory : 
                true; // Include questions without category and assign them below
            }
          );
          
          // Ensure all questions have proper category field
          const processedQuestions = filteredQuestions.map((q: any) => ({
            ...q,
            category: q.category || normalizedCategory, // Add category if missing
          }));
          
          console.log(`Loaded ${processedQuestions.length} questions from local data`);
          return processedQuestions as Question[];
        }
      } catch (localError) {
        console.error('Error loading local question data:', localError);
      }
      return [];
    }
    
    // Ensure all questions have a category field
    const questionsWithCategory = data.map(question => {
      return { 
        ...question, 
        category: question.category || normalizedCategory 
      };
    });

    console.log(`Fetched ${questionsWithCategory.length} questions for category: ${normalizedCategory}`);
    return questionsWithCategory as Question[];
  } catch (error) {
    console.error('Exception fetching questions:', error);
    // Return empty array on error to prevent undefined errors
    return [];
  }
}
