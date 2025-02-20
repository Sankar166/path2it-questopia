
import { Card } from "@/components/ui/card";
import { QuestionOption } from "@/components/QuestionOption";
import type { Question } from "@/types/questions";

interface QuestionCardProps {
  question: Question;
  isAnswered: boolean;
  onAnswerSelect: (questionId: number, selectedAnswerIndex: number) => void;
  getAnswerStatus: (questionId: number, optionIndex: number) => 'correct' | 'incorrect' | null;
}

export const QuestionCard = ({ question, isAnswered, onAnswerSelect, getAnswerStatus }: QuestionCardProps) => {
  return (
    <Card className="p-6 space-y-4">
      <div className="space-y-2">
        <div className="flex items-start">
          <span className="font-medium text-gray-500 mr-2">Q{question.id}.</span>
          <h3 className="text-lg font-medium">{question.question}</h3>
        </div>
        <div className="ml-6 space-y-2">
          {question.options.map((option, index) => (
            <QuestionOption
              key={index}
              option={option}
              index={index}
              isAnswered={isAnswered}
              status={getAnswerStatus(question.id, index)}
              onClick={() => onAnswerSelect(question.id, index)}
            />
          ))}
        </div>
        {isAnswered && (
          <div className="ml-6 mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-800">{question.explanation}</p>
          </div>
        )}
      </div>
    </Card>
  );
};
