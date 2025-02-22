
import { supabase } from './supabase';
import type { Question, UserProgress, UserProfile } from '@/types/questions';

function generateQuestions(): Question[] {
  const questions: Question[] = [];
  
  // Quantitative Aptitude Questions (500+ questions)
  for (let i = 1; i <= 500; i++) {
    if (i <= 2) {
      // Base questions
      questions.push({
        id: i,
        category: 'quantitative aptitude',
        question: i === 1 
          ? "What is 15% of 400?"
          : "If a train travels 480 kilometers in 6 hours, what is its average speed in kilometers per hour?",
        options: i === 1 
          ? ["50", "60", "45", "40"]
          : ["60 km/h", "70 km/h", "80 km/h", "90 km/h"],
        correctAnswer: i === 1 ? 1 : 2,
        explanation: i === 1 
          ? "15% of 400 = (15/100) × 400 = 60"
          : "Average speed = Total distance / Total time = 480 km / 6 h = 80 km/h"
      });
    } else {
      // Generate variations
      const num1 = Math.floor(Math.random() * 1000) + 100;
      const percentage = Math.floor(Math.random() * 90) + 10;
      const result = (percentage / 100) * num1;
      
      questions.push({
        id: i,
        category: 'quantitative aptitude',
        question: `What is ${percentage}% of ${num1}?`,
        options: [
          Math.floor(result - 10).toString(),
          result.toString(),
          Math.floor(result + 10).toString(),
          Math.floor(result - 5).toString()
        ],
        correctAnswer: 1,
        explanation: `${percentage}% of ${num1} = (${percentage}/100) × ${num1} = ${result}`
      });
    }
  }

  // Technical Questions (500+ questions)
  const technicalQuestions = [
    {
      question: "Which of the following is NOT a JavaScript data type?",
      options: ["Boolean", "Integer", "String", "Symbol"],
      correctAnswer: 1,
      explanation: "Integer is not a data type in JavaScript. The numeric data type in JavaScript is 'Number'."
    },
    {
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      correctAnswer: 1,
      explanation: "Binary search has a time complexity of O(log n) as it divides the search interval in half with each iteration."
    }
  ];

  for (let i = 501; i <= 1000; i++) {
    const baseQuestion = technicalQuestions[Math.floor(Math.random() * technicalQuestions.length)];
    questions.push({
      id: i,
      category: 'technical',
      question: baseQuestion.question,
      options: [...baseQuestion.options],
      correctAnswer: baseQuestion.correctAnswer,
      explanation: baseQuestion.explanation
    });
  }

  return questions;
}

// Helper function to insert questions
async function insertQuestionsIfNotExist() {
  const questions = generateQuestions();
  
  // Insert questions in batches to avoid timeout
  const batchSize = 50;
  for (let i = 0; i < questions.length; i += batchSize) {
    const batch = questions.slice(i, i + batchSize);
    const { error } = await supabase
      .from('questions')
      .upsert(batch, { onConflict: 'id' });

    if (error) throw error;
  }
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
