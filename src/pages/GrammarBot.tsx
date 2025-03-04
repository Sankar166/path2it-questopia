
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GrammarBot = () => {
  const [inputText, setInputText] = useState("");
  const [correctedText, setCorrectedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleTextCorrection = () => {
    if (!inputText.trim()) {
      toast({
        title: "Empty Text",
        description: "Please enter some text to correct.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate processing delay
    setTimeout(() => {
      // Simple mock corrections - in a real app, you would connect to an API
      const corrections = {
        "recieve": "receive",
        "definately": "definitely",
        "seperate": "separate",
        "occured": "occurred",
        "untill": "until",
        "begining": "beginning",
        "beleive": "believe",
        "accomodate": "accommodate",
        "accross": "across",
        "apparant": "apparent",
        "embarassing": "embarrassing",
        "existance": "existence",
        "grammer": "grammar",
        "gaurd": "guard",
        "maintainance": "maintenance",
        "occassion": "occasion",
        "posession": "possession",
        "refered": "referred",
        "suprise": "surprise",
        "tommorow": "tomorrow",
        "i ": "I ",
        "its ": "it's ",
        "your welcome": "you're welcome",
        "your the best": "you're the best",
        "their going": "they're going",
        "alot": "a lot",
        "cant": "can't",
        "dont": "don't",
        "wont": "won't",
        "isnt": "isn't",
        "didnt": "didn't",
        "thats": "that's",
        "whats": "what's",
        "lets": "let's",
        "shouldnt": "shouldn't",
        "couldnt": "couldn't",
        "wouldnt": "wouldn't",
        "im": "I'm",
        "ive": "I've",
        "id": "I'd",
        "ill": "I'll",
        "youve": "you've",
        "theyre": "they're",
        "who's": "whose",
        "your right": "you're right",
        "there car": "their car",
        "they're house": "their house"
      };

      let corrected = inputText;
      
      // Simple find and replace
      Object.entries(corrections).forEach(([incorrect, correct]) => {
        const regex = new RegExp(`\\b${incorrect}\\b`, 'gi');
        corrected = corrected.replace(regex, correct);
      });

      // Fix capitalization at the beginning of sentences
      corrected = corrected.replace(/(?<=^|[.!?]\s+)[a-z]/g, match => match.toUpperCase());
      
      setCorrectedText(corrected);
      setIsProcessing(false);
      
      toast({
        title: "Text Processed",
        description: "Your text has been checked for grammatical errors.",
      });
    }, 1500);
  };

  const handleClear = () => {
    setInputText("");
    setCorrectedText("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(correctedText);
    toast({
      title: "Copied to Clipboard",
      description: "The corrected text has been copied to your clipboard.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50/80 to-gray-100/80">
      <Header />
      <main className="container mx-auto px-4 pt-20 pb-16 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Grammar Bot
            </h1>
            <p className="text-gray-600 mt-2">
              Correct spelling and grammatical errors in your text
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 shadow-md">
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <span className="mr-2">Input Text</span>
              </h2>
              <Textarea
                className="min-h-[250px] mb-4"
                placeholder="Enter your text here to check for spelling and grammar errors..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <div className="flex space-x-2">
                <Button 
                  onClick={handleTextCorrection} 
                  disabled={isProcessing || !inputText}
                  className="flex-1"
                >
                  {isProcessing ? "Processing..." : "Correct Text"}
                  {!isProcessing && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleClear}
                  disabled={isProcessing || (!inputText && !correctedText)}
                >
                  <X className="mr-2 h-4 w-4" />
                  Clear All
                </Button>
              </div>
            </Card>

            <Card className={`p-6 shadow-md ${correctedText ? 'bg-green-50' : ''}`}>
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <span className="mr-2">Corrected Text</span>
                {correctedText && <CheckCircle className="h-5 w-5 text-green-500" />}
              </h2>
              <div className={`min-h-[250px] mb-4 border rounded-md p-3 ${correctedText ? 'bg-white' : 'bg-gray-50'}`}>
                {correctedText ? (
                  <p className="whitespace-pre-wrap">{correctedText}</p>
                ) : (
                  <p className="text-gray-400 italic">
                    Processed text will appear here...
                  </p>
                )}
              </div>
              {correctedText && (
                <Button onClick={handleCopy} variant="secondary" className="w-full">
                  Copy to Clipboard
                </Button>
              )}
            </Card>
          </div>

          <Card className="mt-8 p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Tips for Better Writing</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Use short, clear sentences for better readability</li>
              <li>Avoid passive voice when possible</li>
              <li>Be consistent with tense throughout your writing</li>
              <li>Use appropriate punctuation to clarify meaning</li>
              <li>Proofread your work carefully before finalizing</li>
            </ul>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GrammarBot;
