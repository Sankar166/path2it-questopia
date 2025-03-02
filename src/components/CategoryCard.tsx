
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

interface CategoryCardProps {
  title: string;
  description: string;
  questionsCount: number;
  progress: number;
  isLoading?: boolean;
  onClick: () => void;
}

export const CategoryCard = ({
  title,
  description,
  questionsCount,
  progress,
  isLoading,
  onClick,
}: CategoryCardProps) => {
  if (isLoading) {
    return (
      <Card className="p-6 space-y-4 cursor-pointer hover:shadow-md transition-shadow">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-2 w-full" />
      </Card>
    );
  }

  // Show actual question count if available, otherwise display "Loading questions..."
  const displayCount = isLoading 
    ? "Loading questions..." 
    : questionsCount > 0 
      ? `${questionsCount} Questions` 
      : "No questions available";

  return (
    <Card
      className="p-6 space-y-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>{displayCount}</span>
          <span>{progress}% Complete</span>
        </div>
        <Progress value={progress} />
      </div>
    </Card>
  );
};
