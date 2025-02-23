
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">About PATH2it</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                PATH2it is your trusted companion in preparing for IT career success. We provide comprehensive practice tests and learning resources across various domains including technical skills, aptitude, and behavioral aspects.
              </p>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                Our mission is to empower aspiring IT professionals with the tools and knowledge they need to succeed in their career journey. We believe in making quality preparation materials accessible to everyone.
              </p>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">What We Offer</h2>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Comprehensive practice tests</li>
                <li>Real-world scenario questions</li>
                <li>Detailed explanations and solutions</li>
                <li>Progress tracking</li>
                <li>Personalized learning paths</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
