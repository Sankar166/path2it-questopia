
import { supabase } from './supabase';
import type { Question, UserProgress, UserProfile } from '@/types/questions';

function generateQuestions(): Question[] {
  const questions: Question[] = [];
  
  // Quantitative Aptitude Questions
  const quantTemplates = [
    {
      question: "What is {n1}% of {n2}?",
      generateOptions: (n1: number, n2: number) => {
        const correct = (n1 * n2) / 100;
        return {
          options: [
            correct.toString(),
            (correct + 10).toString(),
            (correct - 10).toString(),
            (correct + 5).toString()
          ],
          correctAnswer: 0,
          explanation: `${n1}% of ${n2} = (${n1}/100) × ${n2} = ${correct}`
        };
      }
    },
    {
      question: "If a train travels {n1} kilometers in {n2} hours, what is its average speed in kilometers per hour?",
      generateOptions: (n1: number, n2: number) => {
        const correct = n1 / n2;
        return {
          options: [
            correct.toString(),
            (correct + 5).toString(),
            (correct - 5).toString(),
            (correct + 10).toString()
          ],
          correctAnswer: 0,
          explanation: `Average speed = Total distance / Total time = ${n1} km / ${n2} h = ${correct} km/h`
        };
      }
    }
  ];

  // Generate Quantitative Questions
  for (let i = 1; i <= 500; i++) {
    const template = quantTemplates[Math.floor(Math.random() * quantTemplates.length)];
    const n1 = Math.floor(Math.random() * 100) + 1;
    const n2 = Math.floor(Math.random() * 1000) + 100;
    const { options, correctAnswer, explanation } = template.generateOptions(n1, n2);
    
    questions.push({
      id: i,
      category: 'quantitative aptitude',
      question: template.question.replace('{n1}', n1.toString()).replace('{n2}', n2.toString()),
      options,
      correctAnswer,
      explanation
    });
  }

  // Technical Questions
  const technicalTemplates = [
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
    },
    {
      question: "What does DOM stand for in web development?",
      options: ["Document Object Model", "Data Object Model", "Document Oriented Model", "Digital Object Model"],
      correctAnswer: 0,
      explanation: "DOM stands for Document Object Model, which represents the HTML document as a tree structure of objects."
    }
  ];

  // Generate Technical Questions
  for (let i = 501; i <= 1000; i++) {
    const template = technicalTemplates[Math.floor(Math.random() * technicalTemplates.length)];
    questions.push({
      id: i,
      category: 'technical',
      ...template
    });
  }

  return questions;
}

// Helper function to insert questions
async function insertQuestionsIfNotExist() {
  try {
    const { count } = await supabase
      .from('questions')
      .select('*', { count: 'exact', head: true });

    if (!count || count < 1000) {
      const questions = generateQuestions();
      const batchSize = 50;
      
      for (let i = 0; i < questions.length; i += batchSize) {
        const batch = questions.slice(i, i + batchSize);
        const { error } = await supabase
          .from('questions')
          .upsert(batch, { onConflict: 'id' });

        if (error) {
          console.error('Error inserting questions batch:', error);
          throw error;
        }
      }
      console.log('Questions generated and inserted successfully');
    }
  } catch (error) {
    console.error('Error in insertQuestionsIfNotExist:', error);
    throw error;
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
  try {
    // Initialize questions if they don't exist
    await insertQuestionsIfNotExist();

    // Fetch questions for the specified category
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('category', category.toLowerCase())
      .order('id');

    if (error) {
      console.error('Error fetching questions:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      console.log('No questions found for category:', category);
    }

    return data as Question[];
  } catch (error) {
    console.error('Error in getQuestions:', error);
    throw error;
  }
}
