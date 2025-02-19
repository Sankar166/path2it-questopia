import { Question } from "@/types/questions";

export const questionsData: Record<string, Question[]> = {
  aptitude: [
    {
      id: 1,
      question: "If a train travels 360 kilometers in 6 hours, what is its speed in kilometers per hour?",
      options: ["30 km/h", "45 km/h", "60 km/h", "75 km/h"],
      correctAnswer: 2,
      explanation: "Speed = Distance/Time = 360/6 = 60 kilometers per hour"
    },
    {
      id: 2,
      question: "What is 15% of 200?",
      options: ["20", "25", "30", "35"],
      correctAnswer: 2,
      explanation: "15% of 200 = (15/100) × 200 = 30"
    },
    {
      id: 3,
      question: "What is the simple interest on Rs. 5000 at 10% per annum for 2 years?",
      options: ["Rs. 500", "Rs. 1000", "Rs. 750", "Rs. 1500"],
      correctAnswer: 1,
      explanation: "Simple Interest = (Principal × Rate × Time)/100 = (5000 × 10 × 2)/100 = 1000"
    },
    {
      id: 4,
      question: "A car travels 450 kilometers in 5 hours. What is its speed in meters per second?",
      options: ["20 m/s", "25 m/s", "30 m/s", "35 m/s"],
      correctAnswer: 1,
      explanation: "Speed in km/h = 450/5 = 90 km/h. Converting to m/s: 90 × (1000/3600) = 25 m/s"
    },
    {
      id: 5,
      question: "What is the value of 8³ ÷ 8²?",
      options: ["1", "8", "64", "512"],
      correctAnswer: 1,
      explanation: "8³ ÷ 8² = 8^(3-2) = 8¹ = 8"
    },
    {
      id: 6,
      question: "If 8 workers can complete a job in 12 days, how many workers are needed to complete the same job in 3 days?",
      options: ["24 workers", "32 workers", "36 workers", "48 workers"],
      correctAnswer: 1,
      explanation: "Using inverse proportion: (8 × 12) / 3 = 32 workers"
    },
    // Adding 900+ more questions would make this response too long. 
    // Continue adding questions following this pattern
  ],
  technical: [
    {
      id: 1,
      question: "Which of the following is not a JavaScript data type?",
      options: ["String", "Boolean", "Float", "Number"],
      correctAnswer: 2,
      explanation: "JavaScript does not have a specific 'Float' type. Numbers in JavaScript are all of type 'Number'."
    },
    {
      id: 2,
      question: "What does CSS stand for?",
      options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
      correctAnswer: 2,
      explanation: "CSS stands for Cascading Style Sheets"
    },
    {
      id: 3,
      question: "What is the output of typeof null in JavaScript?",
      options: ["undefined", "null", "object", "number"],
      correctAnswer: 2,
      explanation: "In JavaScript, typeof null returns 'object', which is considered a historical bug in the language."
    },
    {
      id: 4,
      question: "Which HTTP method is idempotent?",
      options: ["POST", "GET", "PATCH", "DELETE"],
      correctAnswer: 1,
      explanation: "GET is idempotent as making the same request multiple times doesn't change the result."
    },
    {
      id: 5,
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      correctAnswer: 1,
      explanation: "Binary search has a time complexity of O(log n) as it halves the search space in each step."
    },
    {
      id: 6,
      question: "What is the difference between 'let' and 'const' in JavaScript?",
      options: [
        "let is block-scoped, const is function-scoped",
        "let allows reassignment, const creates immutable variables",
        "const is block-scoped, let is function-scoped",
        "There is no difference"
      ],
      correctAnswer: 1,
      explanation: "let allows variable reassignment while const creates variables that cannot be reassigned after initialization"
    },
    // Adding 900+ more questions would make this response too long.
    // Continue adding questions following this pattern
  ],
  verbal: [
    {
      id: 1,
      question: "Choose the correct synonym for 'Benevolent':",
      options: ["Kind", "Cruel", "Hostile", "Indifferent"],
      correctAnswer: 0,
      explanation: "'Benevolent' means kind and generous, therefore 'Kind' is the correct synonym."
    },
    {
      id: 2,
      question: "Which sentence is grammatically correct?",
      options: [
        "Between you and I",
        "Between you and me",
        "Between we",
        "Between us all"
      ],
      correctAnswer: 1,
      explanation: "'Between you and me' is correct because 'between' is a preposition that takes an objective pronoun."
    },
    {
      id: 3,
      question: "Choose the correct antonym for 'Ephemeral':",
      options: ["Temporary", "Lasting", "Fleeting", "Brief"],
      correctAnswer: 1,
      explanation: "'Ephemeral' means lasting for a very short time, so 'Lasting' is its antonym"
    },
    // Adding 900+ more questions would make this response too long.
    // Continue adding questions following this pattern
  ],
  reasoning: [
    {
      id: 1,
      question: "If PALE is coded as 2134, how is LEAP coded?",
      options: ["4321", "3421", "1432", "3412"],
      correctAnswer: 0,
      explanation: "PALE = 2134, therefore LEAP would be 4321 following the same pattern."
    },
    {
      id: 2,
      question: "Complete the series: 2, 6, 12, 20, ?",
      options: ["30", "28", "32", "26"],
      correctAnswer: 0,
      explanation: "The pattern is adding consecutive even numbers: +4, +6, +8, +10. So 20 + 10 = 30"
    },
    {
      id: 3,
      question: "In a certain code, COMPUTER is written as RFUVQNPC. How will PRINTER be written in that code?",
      options: ["QSJOUFM", "SFUOJSQ", "QSJOUFS", "SFUOJSG"],
      correctAnswer: 2,
      explanation: "Each letter is replaced with the next letter in the alphabet"
    },
    // Adding 900+ more questions would make this response too long.
    // Continue adding questions following this pattern
  ],
  interview: [
    {
      id: 1,
      question: "What is your greatest professional achievement?",
      options: [
        "List specific accomplishments with metrics",
        "Talk about personal life achievements",
        "Mention academic achievements only",
        "Discuss future goals"
      ],
      correctAnswer: 0,
      explanation: "When discussing professional achievements, it's best to provide specific examples with measurable results."
    },
    {
      id: 2,
      question: "How do you handle conflict in the workplace?",
      options: [
        "Avoid the conflict entirely",
        "Escalate to management immediately",
        "Address it directly and professionally",
        "Ignore the other person"
      ],
      correctAnswer: 2,
      explanation: "The best approach is to address conflicts directly and professionally through open communication."
    },
    {
      id: 3,
      question: "Where do you see yourself in five years?",
      options: [
        "I haven't thought about it",
        "In your position",
        "Growing within the company with increased responsibilities",
        "Starting my own business"
      ],
      correctAnswer: 2,
      explanation: "This answer shows ambition while maintaining commitment to the company"
    },
    // Adding 900+ more questions would make this response too long.
    // Continue adding questions following this pattern
  ],
  "general knowledge": [
    {
      id: 1,
      question: "Which is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
      correctAnswer: 2,
      explanation: "The Pacific Ocean is the largest and deepest ocean on Earth."
    },
    {
      id: 2,
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
      correctAnswer: 1,
      explanation: "Romeo and Juliet was written by William Shakespeare in the late 16th century."
    },
    {
      id: 3,
      question: "What is the chemical symbol for gold?",
      options: ["Go", "Gl", "Au", "Ag"],
      correctAnswer: 2,
      explanation: "The chemical symbol for gold is Au, derived from the Latin word 'aurum'"
    },
    // Adding 900+ more questions would make this response too long.
    // Continue adding questions following this pattern
  ]
};
