
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { QuestionCard } from "@/components/QuestionCard";
import type { Question } from "@/types/questions";

interface AnsweredQuestion {
  questionId: number;
  selectedAnswer: number;
}

const sampleQuestions = {
  aptitude: [
    {
      id: 1,
      question: "If a train travels 360 kilometers in 4 hours, what is its average speed in kilometers per hour?",
      options: ["80 km/h", "90 km/h", "85 km/h", "95 km/h"],
      correctAnswer: 0,
      explanation: "Average speed = Total distance / Total time = 360 km / 4 h = 90 km/h"
    },
    {
      id: 2,
      question: "What is 15% of 200?",
      options: ["20", "25", "30", "35"],
      correctAnswer: 2,
      explanation: "15% of 200 = (15/100) × 200 = 30"
    },
    {
      id: 3,
      question: "If 6 workers can complete a task in 12 days, how many days will it take 9 workers to complete the same task?",
      options: ["6 days", "8 days", "10 days", "14 days"],
      correctAnswer: 1,
      explanation: "Using the formula: (Number of workers × Days) remains constant. So, 6 × 12 = 9 × x, where x = 8 days"
    }
  ]
};

const Questions = () => {
  const { category } = useParams();
  const questions = category ? sampleQuestions[category.toLowerCase() as keyof typeof sampleQuestions] || [] : [];
  const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestion[]>([]);

  const handleAnswerClick = (questionId: number, selectedAnswerIndex: number) => {
    if (!answeredQuestions.some(q => q.questionId === questionId)) {
      setAnsweredQuestions(prev => [...prev, { questionId, selectedAnswer: selectedAnswerIndex }]);
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
