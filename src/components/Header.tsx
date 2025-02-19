
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              PATH2it
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/">
              <Button variant="ghost" className="text-sm font-medium">
                Categories
              </Button>
            </Link>
            <Button variant="ghost" className="text-sm font-medium">
              Practice Tests
            </Button>
            <Button variant="ghost" className="text-sm font-medium">
              About
            </Button>
            <Button variant="ghost" className="text-sm font-medium">
              Contact
            </Button>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="hidden md:inline-flex">
              Sign In
            </Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </div>
    </header>
  );
};
