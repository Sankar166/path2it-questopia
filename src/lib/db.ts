import { supabase } from './supabase';
import type { Question, UserProgress, UserProfile } from '@/types/questions';

export async function createUserProfile(userId: string, displayName: string, isAdmin: boolean = false) {
  console.log("Creating profile with admin status:", isAdmin);
  
  // First check if profile already exists to prevent duplicate attempts
  const { data: existingProfile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
    
  if (existingProfile) {
    console.log("Profile already exists:", existingProfile);
    return existingProfile;
  }
  
  // If no profile exists, create a new one
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert([
        {
          user_id: userId,
          display_name: displayName,
          total_questions_attempted: 0,
          correct_answers: 0,
          is_admin: isAdmin,
        },
      ])
      .select()
      .maybeSingle();

    if (error) {
      console.error("Error creating user profile:", error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Exception creating user profile:", error);
    throw error;
  }
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

  if (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
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
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('category', category.toLowerCase())
      .order('id');

    if (error) {
      console.error('Error fetching questions:', error);
      throw error;
    }
    
    // Ensure all questions have a category field
    const questionsWithCategory = data.map(question => {
      if (!question.category) {
        return { ...question, category: category.toLowerCase() };
      }
      return question;
    });

    console.log(`Fetched ${questionsWithCategory.length} questions for category: ${category}`);
    return questionsWithCategory as Question[];
  } catch (error) {
    console.error('Exception fetching questions:', error);
    throw error;
  }
}

export async function setAdminStatus(userId: string, isAdmin: boolean) {
  const { data, error } = await supabase
    .from('user_profiles')
    .update({ is_admin: isAdmin })
    .eq('user_id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getAllUsers() {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}
