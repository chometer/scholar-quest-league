import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Leaf, CheckCircle, XCircle, Trophy } from "lucide-react";
import { toast } from "sonner";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  points: number;
}

const EnvironmentalQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "Which gas is primarily responsible for global warming?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      correct: 1,
      explanation: "Carbon dioxide (CO2) is the primary greenhouse gas contributing to global warming.",
      points: 10
    },
    {
      id: 2,
      question: "What percentage of Earth's water is freshwater?",
      options: ["50%", "25%", "10%", "3%"],
      correct: 3,
      explanation: "Only about 3% of Earth's water is freshwater, making it a precious resource.",
      points: 15
    },
    {
      id: 3,
      question: "Which renewable energy source is most widely used globally?",
      options: ["Solar", "Wind", "Hydroelectric", "Geothermal"],
      correct: 2,
      explanation: "Hydroelectric power is currently the most widely used renewable energy source worldwide.",
      points: 10
    },
    {
      id: 4,
      question: "How long does it take for a plastic bottle to decompose?",
      options: ["10 years", "50 years", "100 years", "450+ years"],
      correct: 3,
      explanation: "Plastic bottles can take 450+ years to decompose, highlighting the importance of recycling.",
      points: 20
    },
    {
      id: 5,
      question: "Which ecosystem produces the most oxygen?",
      options: ["Rainforests", "Oceans", "Grasslands", "Deserts"],
      correct: 1,
      explanation: "Oceans produce about 70% of Earth's oxygen through phytoplankton photosynthesis.",
      points: 15
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const currentQ = questions[currentQuestion];
    const isCorrect = selectedAnswer === currentQ.correct;
    
    if (isCorrect) {
      setScore(score + 1);
      setTotalPoints(totalPoints + currentQ.points);
      toast.success(`Correct! +${currentQ.points} points`, {
        description: currentQ.explanation
      });
    } else {
      toast.error("Incorrect!", {
        description: currentQ.explanation
      });
    }

    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
        // Update user's score in localStorage for leaderboard
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{"name": "You", "points": 0}');
        currentUser.points = (currentUser.points || 0) + totalPoints;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        toast.success(`Quiz Complete! Total: ${totalPoints + (isCorrect ? currentQ.points : 0)} points`);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTotalPoints(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const finalScore = totalPoints + (selectedAnswer === questions[currentQuestion]?.correct ? questions[currentQuestion].points : 0);
    return (
      <Card className="gaming-card">
        <div className="p-8 text-center">
          <Trophy className="w-16 h-16 text-gaming-gold mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
          <div className="space-y-4">
            <div>
              <p className="text-lg">Your Score: {score}/{questions.length}</p>
              <p className="text-2xl font-bold text-gaming-xp">Total Points: {finalScore}</p>
            </div>
            <div className="flex justify-center space-x-4">
              <Button onClick={resetQuiz} className="gaming-button">
                Retake Quiz
              </Button>
              <Button variant="outline">
                View Leaderboard
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="gaming-card">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <Leaf className="w-6 h-6 text-gaming-xp mr-2" />
            Environmental Quiz
          </h2>
          <Badge variant="secondary">
            Question {currentQuestion + 1}/{questions.length}
          </Badge>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">{currentQ.question}</h3>
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full p-4 text-left rounded-lg border transition-all ${
                  selectedAnswer === index
                    ? showResult
                      ? index === currentQ.correct
                        ? "bg-green-500/20 border-green-500 text-green-400"
                        : "bg-red-500/20 border-red-500 text-red-400"
                      : "bg-primary/20 border-primary"
                    : showResult && index === currentQ.correct
                    ? "bg-green-500/20 border-green-500 text-green-400"
                    : "bg-muted/20 border-border hover:bg-muted/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showResult && index === currentQ.correct && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                  {showResult && selectedAnswer === index && index !== currentQ.correct && (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Points: {currentQ.points} | Total: {totalPoints}
          </div>
          <Button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null || showResult}
            className="gaming-button"
          >
            {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EnvironmentalQuiz;