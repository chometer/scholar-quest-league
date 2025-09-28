import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calculator, Beaker, BookOpen, Globe, Palette, Music, Code, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SubjectCards = () => {
  const navigate = useNavigate();
  const subjects = [
    {
      id: 1,
      name: "Mathematics",
      key: "mathematics",
      icon: Calculator,
      progress: 75,
      level: 8,
      nextReward: "Calculus Master Badge",
      color: "from-eco-forest/20 to-eco-leaf/20 border-eco-forest/30",
      iconColor: "text-eco-forest"
    },
    {
      id: 2,
      name: "Science",
      key: "science",
      icon: Beaker,
      progress: 60,
      level: 6,
      nextReward: "Chemistry Expert Badge",
      color: "from-eco-ocean/20 to-eco-leaf/20 border-eco-ocean/30",
      iconColor: "text-eco-ocean"
    },
    {
      id: 3,
      name: "Literature",
      key: "literature",
      icon: BookOpen,
      progress: 45,
      level: 5,
      nextReward: "Shakespeare Scholar Badge",
      color: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
      iconColor: "text-purple-400"
    },
    {
      id: 4,
      name: "History",
      key: "history",
      icon: Globe,
      progress: 80,
      level: 9,
      nextReward: "World History Master Badge",
      color: "from-orange-500/20 to-orange-600/20 border-orange-500/30",
      iconColor: "text-orange-400"
    },
    {
      id: 5,
      name: "Art",
      key: "art",
      icon: Palette,
      progress: 30,
      level: 3,
      nextReward: "Creative Genius Badge",
      color: "from-pink-500/20 to-pink-600/20 border-pink-500/30",
      iconColor: "text-pink-400"
    },
    {
      id: 6,
      name: "Programming",
      key: "programming",
      icon: Code,
      progress: 90,
      level: 12,
      nextReward: "Code Warrior Badge",
      color: "from-cyan-500/20 to-cyan-600/20 border-cyan-500/30",
      iconColor: "text-cyan-400"
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Brain className="w-6 h-6 text-primary mr-2" />
        Subject Mastery
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => {
          const IconComponent = subject.icon;
          return (
            <Card key={subject.id} className="gaming-card">
              <div className="p-6">
                <div className={`flex items-center mb-4 p-3 rounded-lg bg-gradient-to-br border ${subject.color}`}>
                  <div className="w-12 h-12 rounded-full bg-background/20 flex items-center justify-center mr-4">
                    <IconComponent className={`w-6 h-6 ${subject.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{subject.name}</h3>
                    <p className="text-sm text-muted-foreground">Level {subject.level}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                  
                  <div className="bg-muted/20 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Next Reward:</p>
                    <p className="text-sm font-medium">{subject.nextReward}</p>
                  </div>
                  
                  <Button 
                    className="w-full gaming-button"
                    onClick={() => navigate(`/quiz/${subject.key}`)}
                  >
                    Start Quiz (20 Questions)
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SubjectCards;