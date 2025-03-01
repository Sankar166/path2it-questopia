
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/AuthProvider";
import { createUserProfile } from "@/lib/db";
import { ArrowLeft } from "lucide-react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [adminCode, setAdminCode] = useState("");
  const [isAdminSignUp, setIsAdminSignUp] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  const ADMIN_SECRET_CODE = "PATH2it-admin-2023";

  useEffect(() => {
    if (user) {
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [user, isAdmin, navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        // Check if admin signup is selected and validate admin code
        const isAdmin = isAdminSignUp && adminCode === ADMIN_SECRET_CODE;
        
        if (isAdminSignUp && adminCode !== ADMIN_SECRET_CODE) {
          throw new Error("Invalid admin code");
        }

        // Sign up the user with email and password
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;
        
        if (data.user) {
          // Create user profile with admin status if applicable
          console.log("Creating user profile with admin status:", isAdmin);
          await createUserProfile(data.user.id, displayName, isAdmin);
          
          toast({
            title: "Success!",
            description: isAdmin 
              ? "Admin account created. Please check your email to verify your account."
              : "Please check your email to verify your account.",
          });
        }
      } else {
        // Sign in existing user
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        
        toast({
          title: "Signed in successfully",
          description: "Welcome back!",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-md mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <Button variant="outline" size="sm" asChild className="mb-4">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold">{isSignUp ? "Sign Up" : "Sign In"}</h1>
            <p className="mt-2 text-gray-600">
              {isSignUp
                ? "Create an account to start practicing"
                : "Welcome back! Please sign in to continue"}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {isSignUp && (
              <div>
                <Input
                  type="text"
                  placeholder="Display Name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
              </div>
            )}
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {isSignUp && (
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="admin-signup"
                  checked={isAdminSignUp}
                  onCheckedChange={(checked) => setIsAdminSignUp(checked as boolean)}
                />
                <label 
                  htmlFor="admin-signup" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Sign up as Admin
                </label>
              </div>
            )}
            {isSignUp && isAdminSignUp && (
              <div>
                <Input
                  type="password"
                  placeholder="Admin Code"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  required={isAdminSignUp}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Admin code: PATH2it-admin-2023
                </p>
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </form>

          <div className="text-center">
            <Button
              variant="link"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm"
            >
              {isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
