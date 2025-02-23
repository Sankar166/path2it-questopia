
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { QuestionCard } from "@/components/QuestionCard";
import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "@/lib/db";
import { useProfile } from "@/hooks/use-profile";
import { useToast } from "@/hooks/use-toast";
import type { Question } from "@/types/questions";

interface AnsweredQuestion {
  questionId: number;
  selectedAnswer: number;
}

const Questions = () => {
  const { category } = useParams();
  const { toast } = useToast();
  const { updateProgress } = useProfile();
  const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestion[]>([]);

  const { data: questions = [], isLoading, error } = useQuery({
    queryKey: ['questions', category],
    queryFn: () => getQuestions(category || ''),
    enabled: !!category,
    retry: 3,
    onError: (error) => {
      console.error('Error fetching questions:', error);
      toast({
        title: "Error",
        description: "Failed to load questions. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAnswerClick = async (questionId: number, selectedAnswerIndex: number) => {
    if (!answeredQuestions.some(q => q.questionId === questionId)) {
      const question = questions.find(q => q.id === questionId);
      if (!question) return;

      const isCorrect = selectedAnswerIndex === question.correctAnswer;
      setAnsweredQuestions(prev => [...prev, { questionId, selectedAnswer: selectedAnswerIndex }]);

      try {
        await updateProgress.mutateAsync({
          questionId,
          category: category || '',
          isCorrect,
        });

        toast({
          title: isCorrect ? "Correct!" : "Incorrect",
          description: isCorrect ? "Well done!" : "Try again next time",
          variant: isCorrect ? "default" : "destructive",
        });
      } catch (error) {
        console.error('Failed to update progress:', error);
        toast({
          title: "Error",
          description: "Failed to save your progress",
          variant: "destructive",
        });
      }
    }
  };

  const getAnswerStatus = (questionId: number, optionIndex: number) => {
    const answeredQuestion = answeredQuestions.find(q => q.questionId === questionId);
    if (!answeredQuestion) return null;

    const question = questions.find(q => q.id === questionId);
    if (!question) return null;

    if (optionIndex === question.correctAnswer) {
      return "correct";
    }
    if (optionIndex === answeredQuestion.selectedAnswer) {
      return "incorrect";
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto"></div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600">Error Loading Questions</h2>
            <p className="mt-2 text-gray-600">Please try refreshing the page</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Retry
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!category || !questions.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="mb-8">
            <Link to="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Categories
              </Button>
            </Link>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold">No questions found for this category</h2>
            <p className="mt-2 text-gray-600">Please select a different category</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Categories
            </Button>
          </Link>
        </div>
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold capitalize">{category} Questions</h2>
            <p className="text-xl text-gray-600">
              Test your knowledge with these practice questions
            </p>
          </div>
          <div className="space-y-6">
            {questions.map((q: Question) => (
              <QuestionCard
                key={q.id}
                question={q}
                isAnswered={answeredQuestions.some(aq => aq.questionId === q.id)}
                onAnswerSelect={handleAnswerClick}
                getAnswerStatus={getAnswerStatus}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Questions;
