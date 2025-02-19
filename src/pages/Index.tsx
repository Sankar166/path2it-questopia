
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { CategoryCard } from "@/components/CategoryCard";

const categories = [
  {
    id: 1,
    title: "Aptitude",
    description: "Quantitative aptitude, logical reasoning, and verbal ability questions",
    questionsCount: 1500,
    progress: 0,
  },
  {
    id: 2,
    title: "Technical",
    description: "Programming, database, networking, and other technical concepts",
    questionsCount: 2000,
    progress: 0,
  },
  {
    id: 3,
    title: "Verbal",
    description: "English grammar, vocabulary, and comprehension questions",
    questionsCount: 1000,
    progress: 0,
  },
  {
    id: 4,
    title: "Reasoning",
    description: "Logical reasoning and analytical ability questions",
    questionsCount: 1200,
    progress: 0,
  },
  {
    id: 5,
    title: "Interview",
    description: "Common interview questions and best practices",
    questionsCount: 500,
    progress: 0,
  },
  {
    id: 6,
    title: "General Knowledge",
    description: "Current affairs, history, science, and general awareness",
    questionsCount: 800,
    progress: 0,
  },
];

const Index = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryTitle: string) => {
    navigate(`/questions/${categoryTitle.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <section className="space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Master Your Skills</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Practice with thousands of questions across various categories to improve your knowledge
              and prepare for interviews.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                title={category.title}
                description={category.description}
                questionsCount={category.questionsCount}
                progress={category.progress}
                onClick={() => handleCategoryClick(category.title)}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
