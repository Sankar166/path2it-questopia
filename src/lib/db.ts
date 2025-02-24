import { supabase, supabaseAdmin } from './supabase';
import type { Question, UserProgress, UserProfile } from '@/types/questions';

function generateQuestions(): Question[] {
  const questions: Question[] = [];
  
  // Reasoning Questions
  const reasoningTemplates = [
    {
      question: "If all A are B, and all B are C, what can we conclude?",
      options: ["All A are C", "Some A are C", "No A are C", "Cannot determine"],
      correctAnswer: 0,
      explanation: "Following the transitive property, if all A are B and all B are C, then all A must be C."
    },
    {
      question: "If X is greater than Y, and Y is greater than Z, what is the relationship between X and Z?",
      options: ["X is greater than Z", "X is less than Z", "X equals Z", "Cannot determine"],
      correctAnswer: 0,
      explanation: "Due to the transitive property of inequality, if X > Y and Y > Z, then X must be greater than Z."
    },
    {
      question: "In a line of people, if John is ahead of Mary, and Mary is ahead of Peter, what is John's position relative to Peter?",
      options: ["Ahead of Peter", "Behind Peter", "Same position as Peter", "Cannot determine"],
      correctAnswer: 0,
      explanation: "Using transitive reasoning, if John is ahead of Mary and Mary is ahead of Peter, then John must be ahead of Peter."
    }
  ];

  // General Knowledge Questions
  const generalKnowledgeTemplates = [
    {
      question: "Which gas makes up the majority of Earth's atmosphere?",
      options: ["Nitrogen", "Oxygen", "Carbon Dioxide", "Argon"],
      correctAnswer: 0,
      explanation: "Nitrogen makes up approximately 78% of Earth's atmosphere."
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
      correctAnswer: 0,
      explanation: "'Romeo and Juliet' was written by William Shakespeare in the late 16th century."
    },
    {
      question: "What is the largest planet in our solar system?",
      options: ["Jupiter", "Saturn", "Mars", "Venus"],
      correctAnswer: 0,
      explanation: "Jupiter is the largest planet in our solar system."
    }
  ];

  // Generate Reasoning Questions
  for (let i = 1; i <= 500; i++) {
    const template = reasoningTemplates[Math.floor(Math.random() * reasoningTemplates.length)];
    questions.push({
      id: i + 1000,
      category: 'reasoning',
      question: template.question,
      options: template.options,
      correctAnswer: template.correctAnswer,
      explanation: template.explanation
    });
  }

  // Generate General Knowledge Questions
  for (let i = 1; i <= 500; i++) {
    const template = generalKnowledgeTemplates[Math.floor(Math.random() * generalKnowledgeTemplates.length)];
    questions.push({
      id: i + 1500,
      category: 'general knowledge',
      question: template.question,
      options: template.options,
      correctAnswer: template.correctAnswer,
      explanation: template.explanation
    });
  }

  return questions;
}

async function insertQuestionsIfNotExist() {
  try {
    const { count } = await supabase
      .from('questions')
      .select('*', { count: 'exact', head: true });

    if (!count || count < 2000) {
      const questions = generateQuestions();
      const batchSize = 50;
      
      for (let i = 0; i < questions.length; i += batchSize) {
        const batch = questions.slice(i, i + batchSize);
        const { error } = await supabaseAdmin
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
    .maybeSingle();

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

    return data as Question[];
  } catch (error) {
    console.error('Error in getQuestions:', error);
    throw error;
  }
}
