import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, X } from "lucide-react";
import { useState } from "react";
import { questionsData } from "@/data/questionsData";
import type { Question } from "@/types/questions";

interface AnsweredQuestion {
  questionId: number;
  selectedAnswer: number;
}

const Questions = () => {
  const { category } = useParams();
  const questions = category ? questionsData[category.toLowerCase()] : [];
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
            {questions.map((q) => {
              const isAnswered = answeredQuestions.some(aq => aq.questionId === q.id);
              return (
                <Card key={q.id} className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="font-medium text-gray-500 mr-2">Q{q.id}.</span>
                      <h3 className="text-lg font-medium">{q.question}</h3>
                    </div>
                    <div className="ml-6 space-y-2">
                      {q.options.map((option, index) => {
                        const answerStatus = getAnswerStatus(q.id, index);
                        return (
                          <div
                            key={index}
                            onClick={() => handleAnswerClick(q.id, index)}
                            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border transition-colors
                              ${!isAnswered ? 'hover:bg-gray-50' : ''}
                              ${answerStatus === 'correct' ? 'bg-green-50 border-green-200' : ''}
                              ${answerStatus === 'incorrect' ? 'bg-red-50 border-red-200' : ''}
                            `}
                          >
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">{String.fromCharCode(65 + index)}.</span>
                              <span>{option}</span>
                            </div>
                            {answerStatus === 'correct' && (
                              <Check className="h-5 w-5 text-green-500" />
                            )}
                            {answerStatus === 'incorrect' && (
                              <X className="h-5 w-5 text-red-500" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                    {isAnswered && (
                      <div className="ml-6 mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <p className="text-sm text-blue-800">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Questions;
