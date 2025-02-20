
import { Check, X } from "lucide-react";

interface QuestionOptionProps {
  option: string;
  index: number;
  isAnswered: boolean;
  status: 'correct' | 'incorrect' | null;
  onClick: () => void;
}

export const QuestionOption = ({ option, index, isAnswered, status, onClick }: QuestionOptionProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border transition-colors
        ${!isAnswered ? 'hover:bg-gray-50' : ''}
        ${status === 'correct' ? 'bg-green-50 border-green-200' : ''}
        ${status === 'incorrect' ? 'bg-red-50 border-red-200' : ''}
      `}
    >
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">{String.fromCharCode(65 + index)}.</span>
        <span>{option}</span>
      </div>
      {status === 'correct' && (
        <Check className="h-5 w-5 text-green-500" />
      )}
      {status === 'incorrect' && (
        <X className="h-5 w-5 text-red-500" />
      )}
    </div>
  );
};
