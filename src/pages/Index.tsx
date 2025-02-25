
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryCard } from "@/components/CategoryCard";
import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "@/lib/db";

const Index = () => {
  const navigate = useNavigate();
  
  // Pre-fetch questions for all categories
  const { isLoading: quantitativeLoading } = useQuery({
    queryKey: ['questions', 'quantitative aptitude'],
    queryFn: () => getQuestions('quantitative aptitude'),
  });

  const { isLoading: technicalLoading } = useQuery({
    queryKey: ['questions', 'technical'],
    queryFn: () => getQuestions('technical'),
  });

  const { isLoading: reasoningLoading } = useQuery({
    queryKey: ['questions', 'reasoning'],
    queryFn: () => getQuestions('reasoning'),
  });

  const { isLoading: generalKnowledgeLoading } = useQuery({
    queryKey: ['questions', 'general knowledge'],
    queryFn: () => getQuestions('general knowledge'),
  });

  const categories = [
    {
      id: 1,
      title: "Quantitative Aptitude",
      description: "Practice mathematical and numerical reasoning questions to improve your problem-solving skills",
      questionsCount: 500,
      progress: 0,
      isLoading: quantitativeLoading,
    },
    {
      id: 2,
      title: "Technical",
      description: "Test your technical knowledge with questions covering various technical concepts",
      questionsCount: 500,
      progress: 0,
      isLoading: technicalLoading,
    },
    {
      id: 3,
      title: "Reasoning",
      description: "Enhance your logical thinking and problem-solving abilities with reasoning questions",
      questionsCount: 500,
      progress: 0,
      isLoading: reasoningLoading,
    },
    {
      id: 4,
      title: "General Knowledge",
      description: "Test your knowledge on various topics including science, literature, and history",
      questionsCount: 500,
      progress: 0,
      isLoading: generalKnowledgeLoading,
    }
  ];

  const handleCategoryClick = (categoryTitle: string) => {
    navigate(`/questions/${categoryTitle.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50/80 to-gray-100/80">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16 flex-grow">
        <section className="space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              Master Your Skills
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Practice with comprehensive questions across multiple categories
              to improve your understanding and prepare for exams.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                title={category.title}
                description={category.description}
                questionsCount={category.questionsCount}
                progress={category.progress}
                isLoading={category.isLoading}
                onClick={() => handleCategoryClick(category.title)}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
