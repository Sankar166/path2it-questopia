
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Code2 } from "lucide-react";
import { useState } from "react";
import { AuthDialog } from "./AuthDialog";
import { useAuth } from "./AuthProvider";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export const Header = () => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out",
        description: "Successfully signed out",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-gray-900" />
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
            {user ? (
              <Button onClick={handleSignOut} variant="outline">
                Sign Out
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={() => setShowAuthDialog(true)} className="hidden md:inline-flex">
                  Sign In
                </Button>
                <Button onClick={() => setShowAuthDialog(true)}>Get Started</Button>
              </>
            )}
          </div>
        </div>
      </div>
      <AuthDialog isOpen={showAuthDialog} onClose={() => setShowAuthDialog(false)} />
    </header>
  );
};
