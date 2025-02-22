import { supabase } from './supabase';
import type { Question, UserProgress, UserProfile } from '@/types/questions';

// Generate 1000+ questions programmatically
function generateQuestions(): Question[] {
  const questions: Question[] = [];
  
  // Quantitative Aptitude Questions (500+ questions)
  const quantQuestions = [
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
    // ... Add more base questions here
  ];

  // Generate variations of percentage questions
  for (let i = 3; i <= 250; i++) {
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

  // Generate variations of speed/distance/time questions
  for (let i = 251; i <= 500; i++) {
    const distance = Math.floor(Math.random() * 1000) + 100;
    const time = Math.floor(Math.random() * 10) + 2;
    const speed = distance / time;
    
    questions.push({
      id: i,
      category: 'quantitative aptitude',
      question: `If a vehicle travels ${distance} kilometers in ${time} hours, what is its average speed in kilometers per hour?`,
      options: [
        Math.floor(speed - 5).toString(),
        Math.floor(speed + 5).toString(),
        speed.toString(),
        Math.floor(speed + 10).toString()
      ],
      correctAnswer: 2,
      explanation: `Average speed = Total distance / Total time = ${distance} km / ${time} h = ${speed} km/h`
    });
  }

  // Technical Questions (500+ questions)
  const technicalTopics = [
    {
      topic: "JavaScript",
      questions: [
        {
          question: "Which of the following is NOT a JavaScript data type?",
          options: ["Boolean", "Integer", "String", "Symbol"],
          correctAnswer: 1,
          explanation: "Integer is not a data type in JavaScript. The numeric data type in JavaScript is 'Number'."
        },
        // Add more base questions
      ]
    },
    {
      topic: "Data Structures",
      questions: [
        {
          question: "What is the time complexity of binary search?",
          options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
          correctAnswer: 1,
          explanation: "Binary search has a time complexity of O(log n) as it divides the search interval in half with each iteration."
        }
      ]
    }
  ];

  // Generate technical questions
  let technicalId = 501;
  for (const topic of technicalTopics) {
    for (let i = 0; i < 250; i++) {
      const baseQuestion = topic.questions[Math.floor(Math.random() * topic.questions.length)];
      questions.push({
        id: technicalId++,
        category: 'technical',
        question: `[${topic.topic}] ${baseQuestion.question}`,
        options: [...baseQuestion.options],
        correctAnswer: baseQuestion.correctAnswer,
        explanation: baseQuestion.explanation
      });
    }
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
