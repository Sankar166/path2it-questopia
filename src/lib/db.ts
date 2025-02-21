
import { supabase } from './supabase';
import type { Question, UserProgress, UserProfile } from '@/types/questions';

// Helper function to insert questions
async function insertQuestionsIfNotExist() {
  const questions = [
    // Quantitative Aptitude Questions
    {
      id: 1,
      category: 'quantitative aptitude',
      question: "What is 15% of 400?",
      options: ["50", "60", "45", "40"],
      correctAnswer: 1,
      explanation: "15% of 400 = (15/100) × 400 = 60"
    },
    {
      id: 2,
      category: 'quantitative aptitude',
      question: "If a train travels 480 kilometers in 6 hours, what is its average speed in kilometers per hour?",
      options: ["60 km/h", "70 km/h", "80 km/h", "90 km/h"],
      correctAnswer: 2,
      explanation: "Average speed = Total distance / Total time = 480 km / 6 h = 80 km/h"
    },
    {
      id: 3,
      category: 'quantitative aptitude',
      question: "If 8 workers can complete a task in 15 days, how many days will it take 12 workers to complete the same task?",
      options: ["8 days", "10 days", "12 days", "15 days"],
      correctAnswer: 1,
      explanation: "Using work-time relationship: (Workers × Days) remains constant. So, 8 × 15 = 12 × x, where x = 10 days"
    },
    // Technical Questions
    {
      id: 4,
      category: 'technical',
      question: "Which of the following is NOT a JavaScript data type?",
      options: ["Boolean", "Integer", "String", "Symbol"],
      correctAnswer: 1,
      explanation: "Integer is not a data type in JavaScript. The numeric data type in JavaScript is 'Number' which can represent both integers and floating-point numbers."
    },
    {
      id: 5,
      category: 'technical',
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      correctAnswer: 1,
      explanation: "Binary search has a time complexity of O(log n) as it divides the search interval in half with each iteration."
    },
    {
      id: 6,
      category: 'technical',
      question: "Which HTTP status code indicates a successful response?",
      options: ["200", "404", "500", "301"],
      correctAnswer: 0,
      explanation: "200 OK is the standard response for successful HTTP requests."
    }
  ];

  const { error } = await supabase
    .from('questions')
    .upsert(questions, { onConflict: 'id' });

  if (error) throw error;
}

export async function createUserProfile(userId: string, displayName: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .insert([
      {
        user_id: userId,
        display_name: displayName,
        total_questions_attempted: 0,
        correct_answers: 0,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateUserProgress(
  userId: string,
  questionId: number,
  category: string,
  isCorrect: boolean
) {
  // First get current profile stats
  const { data: profile, error: profileError } = await supabase
    .from('user_profiles')
    .select('total_questions_attempted, correct_answers')
    .eq('user_id', userId)
    .single();

  if (profileError) throw profileError;

  // Insert progress record
  const { data, error } = await supabase
    .from('user_progress')
    .insert([
      {
        user_id: userId,
        question_id: questionId,
        category,
        is_correct: isCorrect,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  // Update profile stats
  const { error: updateError } = await supabase
    .from('user_profiles')
    .update({
      total_questions_attempted: (profile?.total_questions_attempted || 0) + 1,
      correct_answers: (profile?.correct_answers || 0) + (isCorrect ? 1 : 0),
    })
    .eq('user_id', userId);

  if (updateError) throw updateError;
  return data;
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data;
}

export async function getUserProgress(userId: string, category?: string) {
  let query = supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId);

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getQuestions(category: string) {
  // Initialize questions if they don't exist
  await insertQuestionsIfNotExist();

  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('category', category.toLowerCase());

  if (error) throw error;
  return data as Question[];
}

