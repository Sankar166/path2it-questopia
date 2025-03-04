
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryCard } from "@/components/CategoryCard";

const Index = () => {
  const navigate = useNavigate();
  
  const categories = [
    {
      id: 1,
      title: "Quantitative Aptitude",
      description: "Practice mathematical problems including clocks, calendars, boats, cisterns, pipes, ages, trains, time and work, profit and loss",
      questionsCount: 250,
      progress: 0,
      isLoading: false,
    },
    {
      id: 2,
      title: "Technical",
      description: "Test your technical knowledge with questions covering various technical concepts",
      questionsCount: 250,
      progress: 0,
      isLoading: false,
    },
    {
      id: 3,
      title: "Reasoning",
      description: "Enhance your logical thinking and problem-solving abilities with reasoning questions from topics like puzzles, coding-decoding and logical reasoning",
      questionsCount: 250,
      progress: 0,
      isLoading: false,
    },
    {
      id: 4,
      title: "General Knowledge",
      description: "Test your knowledge on various topics including science, literature, history, current affairs and general awareness",
      questionsCount: 250,
      progress: 0,
      isLoading: false,
    },
    {
      id: 5,
      title: "Grammar Bot",
      description: "Correct spelling and grammatical errors in your text. Improve your writing with instant feedback.",
      questionsCount: 0,
      progress: 0,
      isLoading: false,
    }
  ];

  const handleCategoryClick = (categoryTitle: string) => {
    if (categoryTitle === "Grammar Bot") {
      navigate('/grammar-bot');
    } else {
      navigate(`/questions/${categoryTitle.toLowerCase().replace(/\s+/g, '-')}`);
    }
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
