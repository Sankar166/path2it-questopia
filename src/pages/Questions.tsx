import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, X } from "lucide-react";
import { useState } from "react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questionsData: Record<string, Question[]> = {
  aptitude: [
    {
      id: 1,
      question: "If a train travels 360 kilometers in 6 hours, what is its speed in kilometers per hour?",
      options: ["30 km/h", "45 km/h", "60 km/h", "75 km/h"],
      correctAnswer: 2,
      explanation: "Speed = Distance/Time = 360/6 = 60 kilometers per hour"
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
      question: "What is the simple interest on Rs. 5000 at 10% per annum for 2 years?",
      options: ["Rs. 500", "Rs. 1000", "Rs. 750", "Rs. 1500"],
      correctAnswer: 1,
      explanation: "Simple Interest = (Principal × Rate × Time)/100 = (5000 × 10 × 2)/100 = 1000"
    },
    {
      id: 4,
      question: "A car travels 450 kilometers in 5 hours. What is its speed in meters per second?",
      options: ["20 m/s", "25 m/s", "30 m/s", "35 m/s"],
      correctAnswer: 1,
      explanation: "Speed in km/h = 450/5 = 90 km/h. Converting to m/s: 90 × (1000/3600) = 25 m/s"
    },
    {
      id: 5,
      question: "What is the value of 8³ ÷ 8²?",
      options: ["1", "8", "64", "512"],
      correctAnswer: 1,
      explanation: "8³ ÷ 8² = 8^(3-2) = 8¹ = 8"
    }
  ],
  technical: [
    {
      id: 1,
      question: "Which of the following is not a JavaScript data type?",
      options: ["String", "Boolean", "Float", "Number"],
      correctAnswer: 2,
      explanation: "JavaScript does not have a specific 'Float' type. Numbers in JavaScript are all of type 'Number'."
    },
    {
      id: 2,
      question: "What does CSS stand for?",
      options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
      correctAnswer: 2,
      explanation: "CSS stands for Cascading Style Sheets"
    },
    {
      id: 3,
      question: "What is the output of typeof null in JavaScript?",
      options: ["undefined", "null", "object", "number"],
      correctAnswer: 2,
      explanation: "In JavaScript, typeof null returns 'object', which is considered a historical bug in the language."
    },
    {
      id: 4,
      question: "Which HTTP method is idempotent?",
      options: ["POST", "GET", "PATCH", "DELETE"],
      correctAnswer: 1,
      explanation: "GET is idempotent as making the same request multiple times doesn't change the result."
    },
    {
      id: 5,
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      correctAnswer: 1,
      explanation: "Binary search has a time complexity of O(log n) as it halves the search space in each step."
    }
  ],
  verbal: [
    {
      id: 1,
      question: "Choose the correct synonym for 'Benevolent':",
      options: ["Kind", "Cruel", "Hostile", "Indifferent"],
      correctAnswer: 0,
      explanation: "'Benevolent' means kind and generous, therefore 'Kind' is the correct synonym."
    },
    {
      id: 2,
      question: "Which sentence is grammatically correct?",
      options: [
        "Between you and I",
        "Between you and me",
        "Between we",
        "Between us all"
      ],
      correctAnswer: 1,
      explanation: "'Between you and me' is correct because 'between' is a preposition that takes an objective pronoun."
    }
  ],
  reasoning: [
    {
      id: 1,
      question: "If PALE is coded as 2134, how is LEAP coded?",
      options: ["4321", "3421", "1432", "3412"],
      correctAnswer: 0,
      explanation: "PALE = 2134, therefore LEAP would be 4321 following the same pattern."
    },
    {
      id: 2,
      question: "Complete the series: 2, 6, 12, 20, ?",
      options: ["30", "28", "32", "26"],
      correctAnswer: 0,
      explanation: "The pattern is adding consecutive even numbers: +4, +6, +8, +10. So 20 + 10 = 30"
    }
  ],
  interview: [
    {
      id: 1,
      question: "What is your greatest professional achievement?",
      options: [
        "List specific accomplishments with metrics",
        "Talk about personal life achievements",
        "Mention academic achievements only",
        "Discuss future goals"
      ],
      correctAnswer: 0,
      explanation: "When discussing professional achievements, it's best to provide specific examples with measurable results."
    },
    {
      id: 2,
      question: "How do you handle conflict in the workplace?",
      options: [
        "Avoid the conflict entirely",
        "Escalate to management immediately",
        "Address it directly and professionally",
        "Ignore the other person"
      ],
      correctAnswer: 2,
      explanation: "The best approach is to address conflicts directly and professionally through open communication."
    }
  ],
  "general knowledge": [
    {
      id: 1,
      question: "Which is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
      correctAnswer: 2,
      explanation: "The Pacific Ocean is the largest and deepest ocean on Earth."
    },
    {
      id: 2,
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
      correctAnswer: 1,
      explanation: "Romeo and Juliet was written by William Shakespeare in the late 16th century."
    }
  ]
};

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
