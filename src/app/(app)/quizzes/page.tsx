'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle, ListChecks, HelpCircle } from "lucide-react";

type Question = {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  difficulty: 'easy' | 'medium' | 'hard';
};

type Quiz = {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  passCriteria: number; // Percentage
};

const sampleQuiz: Quiz = {
  id: "quiz-1",
  title: "JavaScript Fundamentals Quiz",
  description: "Test your knowledge of basic JavaScript concepts.",
  passCriteria: 70,
  questions: [
    {
      id: "q1",
      text: "What keyword is used to declare a variable in JavaScript?",
      options: ["var", "let", "const", "all of the above"],
      correctAnswer: "all of the above",
      difficulty: "easy",
    },
    {
      id: "q2",
      text: "Which of the following is NOT a JavaScript data type?",
      options: ["string", "boolean", "number", "character"],
      correctAnswer: "character",
      difficulty: "medium",
    },
    {
      id: "q3",
      text: "What does `===` operator check for?",
      options: ["Value equality", "Type equality", "Value and type equality", "Assignment"],
      correctAnswer: "Value and type equality",
      difficulty: "medium",
    },
  ],
};

export default function QuizzesPage() {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(sampleQuiz); // For MVP, directly show the sample quiz
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [results, setResults] = useState<{ score: number; passed: boolean; feedback: string } | null>(null);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    if (!selectedQuiz) return;
    let correctCount = 0;
    selectedQuiz.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    const score = (correctCount / selectedQuiz.questions.length) * 100;
    const passed = score >= selectedQuiz.passCriteria;
    setResults({
      score,
      passed,
      feedback: passed ? "Congratulations! You passed the quiz." : "You did not pass. Review the material and try again.",
    });
  };

  if (!selectedQuiz) {
    // Placeholder for quiz selection if we had multiple quizzes
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground font-headline">Interactive Quizzes</h1>
        <p>No quiz selected.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground font-headline flex items-center gap-2">
        <ListChecks className="h-8 w-8 text-primary" />
        Interactive Quizzes
      </h1>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">{selectedQuiz.title}</CardTitle>
          <CardDescription>{selectedQuiz.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!results ? (
            selectedQuiz.questions.map((q, index) => (
              <div key={q.id} className="p-4 border rounded-lg shadow-sm bg-muted/20">
                <p className="font-medium mb-3 text-lg flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary"/> Question {index + 1}: {q.text}
                </p>
                <RadioGroup onValueChange={(value) => handleAnswerChange(q.id, value)} value={answers[q.id]}>
                  {q.options.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`${q.id}-${option}`} />
                      <Label htmlFor={`${q.id}-${option}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))
          ) : (
            <Alert variant={results.passed ? "default" : "destructive"} className={results.passed ? "bg-green-100 border-green-500" : "bg-red-100 border-red-500"}>
              {results.passed ? <CheckCircle className="h-5 w-5 text-green-700" /> : <XCircle className="h-5 w-5 text-red-700" />}
              <AlertTitle className={results.passed ? "text-green-800" : "text-red-800"}>
                {results.passed ? "Quiz Passed!" : "Quiz Failed"}
              </AlertTitle>
              <AlertDescription className={results.passed ? "text-green-700" : "text-red-700"}>
                Your score: {results.score.toFixed(0)}%. {results.feedback}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          {!results && (
            <Button onClick={handleSubmit} size="lg" className="w-full sm:w-auto">
              Submit Answers
            </Button>
          )}
          {results && (
             <Button onClick={() => { setResults(null); setAnswers({}); }} variant="outline" size="lg" className="w-full sm:w-auto">
              Retake Quiz
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
