
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface CategoryCardProps {
  title: string;
  description: string;
  questionsCount: number;
  progress: number;
  onClick: () => void;
}

export const CategoryCard = ({
  title,
  description,
  questionsCount,
  progress,
  onClick,
}: CategoryCardProps) => {
  return (
    <Card
      className="group relative overflow-hidden p-6 transition-all duration-300 hover:shadow-lg cursor-pointer animate-fade-up backdrop-blur-sm bg-white/80"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="space-y-4">
        <div>
          <span className="text-sm font-medium text-gray-500">{questionsCount} questions</span>
          <h3 className="mt-1 text-xl font-semibold">{title}</h3>
          <p className="mt-2 text-sm text-gray-600">{description}</p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-1" />
        </div>
      </div>
    </Card>
  );
};
