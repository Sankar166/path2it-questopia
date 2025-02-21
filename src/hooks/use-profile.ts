
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/components/AuthProvider';
import { createUserProfile, getUserProfile, updateUserProgress } from '@/lib/db';
import type { UserProfile } from '@/types/questions';

export function useProfile() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => getUserProfile(user!.id),
    enabled: !!user,
  });

  const createProfile = useMutation({
    mutationFn: ({ displayName }: { displayName: string }) => 
      createUserProfile(user!.id, displayName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
    },
  });

  const updateProgress = useMutation({
    mutationFn: ({ questionId, category, isCorrect }: { questionId: number; category: string; isCorrect: boolean }) =>
      updateUserProgress(user!.id, questionId, category, isCorrect),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['progress', user?.id] });
    },
  });

  return {
    profile: profile as UserProfile | undefined,
    isLoading: profileLoading,
    createProfile,
    updateProgress,
  };
}
