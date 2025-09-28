import GameHeader from "@/components/GameHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { subjectQuestions } from "@/data/questions";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  difficulty: string;
}

const SubjectQuiz = () => {
  const { subject } = useParams<{ subject: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    if (subject && subjectQuestions[subject as keyof typeof subjectQuestions]) {
      const subjectQs = subjectQuestions[subject as keyof typeof subjectQuestions];
      setQuestions(subjectQs);
      setStartTime(Date.now());
    } else {
      navigate('/quizzes');
    }
  }, [subject, navigate]);

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleQuizComplete();
    }
  }, [timeLeft, showResult]);

  const handleAnswer = (answerIndex: number) => {
    if (answered) return;
    
    setSelectedAnswer(answerIndex);
    setAnswered(true);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setAnswered(false);
      } else {
        handleQuizComplete();
      }
    }, 1500);
  };

  const handleQuizComplete = () => {
    setShowResult(true);
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    
    // Update user progress
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    
    const newProgress = {
      totalCorrect: (userProgress.totalCorrect || 0) + score,
      perfectScores: (userProgress.perfectScores || 0) + (score === questions.length ? 1 : 0),
      subjectProgress: {
        ...userProgress.subjectProgress,
        [subject]: (userProgress.subjectProgress?.[subject] || 0) + score
      },
      streak: Math.max(userProgress.streak || 0, score),
      subjectsCompleted: [...(userProgress.subjectsCompleted || []), subject].filter((v, i, a) => a.indexOf(v) === i)
    };
    
    localStorage.setItem('userProgress', JSON.stringify(newProgress));
    
    // Update user points
    const pointsEarned = score * 10;
    const newPoints = (currentUser.points || 0) + pointsEarned;
    const updatedUser = { ...currentUser, points: newPoints };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    toast({
      title: "Quiz Completed!",
      description: `You scored ${score}/${questions.length} and earned ${pointsEarned} points!`,
    });
  };

  const getSubjectName = (subjectKey: string) => {
    const names: { [key: string]: string } = {
      mathematics: "Mathematics",
      science: "Science", 
      literature: "Literature",
      history: "History",
      art: "Art",
      programming: "Programming"
    };
    return names[subjectKey] || subjectKey;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!questions.length) {
    return <div>Loading...</div>;
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-background">
        <GameHeader />
        <div className="container mx-auto px-4 py-8">
          <Card className="gaming-card max-w-2xl mx-auto p-8 text-center">
            <h1 className="text-3xl font-bold mb-6">Quiz Complete!</h1>
            <div className="text-6xl font-bold text-eco-forest mb-4">{score}/{questions.length}</div>
            <p className="text-xl mb-6">
              You scored {Math.round((score / questions.length) * 100)}% in {getSubjectName(subject!)}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <div className="text-2xl font-bold text-gaming-gold">{score * 10}</div>
                <div className="text-sm text-muted-foreground">Points Earned</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-eco-ocean">{questions.length - score}</div>
                <div className="text-sm text-muted-foreground">Incorrect</div>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => window.location.reload()}>Try Again</Button>
              <Button variant="outline" onClick={() => navigate('/quizzes')}>Back to Quizzes</Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <GameHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-eco-forest to-eco-leaf bg-clip-text text-transparent">
              {getSubjectName(subject!)} Quiz
            </h1>
            <div className="text-right">
              <div className="text-2xl font-bold text-gaming-gold">{formatTime(timeLeft)}</div>
              <div className="text-sm text-muted-foreground">Time Left</div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm text-muted-foreground">
                Score: {score}/{currentQuestion + (answered ? 1 : 0)}
              </span>
            </div>
            <Progress value={((currentQuestion + (answered ? 1 : 0)) / questions.length) * 100} className="h-2" />
          </div>

          <Card className="gaming-card p-8">
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <span className="px-3 py-1 bg-eco-forest/20 text-eco-forest rounded-full text-sm font-medium">
                  {questions[currentQuestion].difficulty.toUpperCase()}
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-6">{questions[currentQuestion].question}</h2>
            </div>

            <div className="grid gap-4">
              {questions[currentQuestion].options.map((option, index) => {
                let buttonClass = "p-4 text-left border-2 transition-all duration-200 ";
                
                if (answered) {
                  if (index === questions[currentQuestion].correct) {
                    buttonClass += "border-eco-forest bg-eco-forest/20 text-eco-forest";
                  } else if (index === selectedAnswer) {
                    buttonClass += "border-red-500 bg-red-500/20 text-red-400";
                  } else {
                    buttonClass += "border-border opacity-50";
                  }
                } else {
                  buttonClass += "border-border hover:border-eco-forest hover:bg-eco-forest/10";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={answered}
                    className={buttonClass + " rounded-lg"}
                  >
                    <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </button>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SubjectQuiz;