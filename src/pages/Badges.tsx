import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Zap, Target, BookOpen, Calculator, Beaker, Globe, Palette, Code, Brain, Award } from "lucide-react";
import { useEffect, useState } from "react";
import { badgeRequirements } from "@/data/questions";

interface UserProgress {
  totalCorrect: number;
  perfectScores: number;
  subjectProgress: {
    math: number;
    science: number;
    literature: number;
    history: number;
    art: number;
    programming: number;
  };
  streak: number;
  subjectsCompleted: string[];
}

const BadgesPage = () => {
  const [userProgress, setUserProgress] = useState<UserProgress>({
    totalCorrect: 0,
    perfectScores: 0,
    subjectProgress: {
      math: 0,
      science: 0,
      literature: 0,
      history: 0,
      art: 0,
      programming: 0
    },
    streak: 0,
    subjectsCompleted: []
  });

  const [earnedBadges, setEarnedBadges] = useState<number[]>([]);

  useEffect(() => {
    // Load user progress from localStorage
    const savedProgress = localStorage.getItem('userProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setUserProgress(progress);
      
      // Check which badges should be earned
      const earned: number[] = [];
      badgeRequirements.forEach(badge => {
        if (checkBadgeEarned(badge, progress)) {
          earned.push(badge.id);
        }
      });
      setEarnedBadges(earned);
    }
  }, []);

  const checkBadgeEarned = (badge: any, progress: UserProgress): boolean => {
    switch (badge.type) {
      case "total_correct":
        return progress.totalCorrect >= badge.requirement;
      case "perfect_score":
        return progress.perfectScores >= badge.requirement;
      case "subject_math":
        return progress.subjectProgress.math >= badge.requirement;
      case "subject_science":
        return progress.subjectProgress.science >= badge.requirement;
      case "subject_literature":
        return progress.subjectProgress.literature >= badge.requirement;
      case "subject_history":
        return progress.subjectProgress.history >= badge.requirement;
      case "subject_art":
        return progress.subjectProgress.art >= badge.requirement;
      case "subject_programming":
        return progress.subjectProgress.programming >= badge.requirement;
      case "streak":
        return progress.streak >= badge.requirement;
      case "subject_variety":
        return progress.subjectsCompleted.length >= badge.requirement;
      default:
        return false;
    }
  };

  const getBadgeIcon = (badgeId: number) => {
    const iconMap: { [key: number]: any } = {
      1: Star,
      2: BookOpen,
      3: Trophy,
      4: Award,
      5: Brain,
      6: Target,
      7: Zap,
      8: Calculator,
      9: Beaker,
      10: BookOpen,
      11: Globe,
      12: Palette,
      13: Code,
      14: Star,
      15: Trophy
    };
    return iconMap[badgeId] || Star;
  };

  const getRarityColor = (badgeId: number, earned: boolean) => {
    if (!earned) return "from-gray-600/20 to-gray-700/20 border-gray-600/30";
    
    if (badgeId <= 3) return "from-eco-forest/20 to-eco-leaf/20 border-eco-forest/50";
    if (badgeId <= 6) return "from-eco-ocean/20 to-eco-leaf/20 border-eco-ocean/50";
    if (badgeId <= 10) return "from-purple-500/20 to-purple-600/20 border-purple-500/50";
    return "from-gaming-gold/20 to-yellow-500/20 border-gaming-gold/50";
  };

  const getRarityBadgeColor = (badgeId: number) => {
    if (badgeId <= 3) return "bg-eco-forest/20 text-eco-forest border-eco-forest/30";
    if (badgeId <= 6) return "bg-eco-ocean/20 text-eco-ocean border-eco-ocean/30";
    if (badgeId <= 10) return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    return "bg-gaming-gold/20 text-gaming-gold border-gaming-gold/30";
  };

  const getRarityName = (badgeId: number) => {
    if (badgeId <= 3) return "COMMON";
    if (badgeId <= 6) return "RARE";
    if (badgeId <= 10) return "EPIC";
    return "LEGENDARY";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gaming-gold to-eco-leaf bg-clip-text text-transparent">
          Achievement Badges
        </h1>
        <p className="text-muted-foreground text-lg">
          Earn badges by completing quizzes and demonstrating your knowledge
        </p>
      </div>

      <div className="mb-8">
        <Card className="gaming-card p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Trophy className="w-6 h-6 text-gaming-gold mr-2" />
            Your Progress
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-eco-forest">{userProgress.totalCorrect}</div>
              <div className="text-sm text-muted-foreground">Total Correct</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-eco-ocean">{userProgress.perfectScores}</div>
              <div className="text-sm text-muted-foreground">Perfect Scores</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gaming-gold">{userProgress.streak}</div>
              <div className="text-sm text-muted-foreground">Best Streak</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">{earnedBadges.length}</div>
              <div className="text-sm text-muted-foreground">Badges Earned</div>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {badgeRequirements.map((badge) => {
          const IconComponent = getBadgeIcon(badge.id);
          const isEarned = earnedBadges.includes(badge.id);
          
          return (
            <Card
              key={badge.id}
              className={`gaming-card relative overflow-hidden p-6 ${
                isEarned ? "ring-2 ring-eco-forest/50" : ""
              }`}
            >
              <div
                className={`relative p-4 rounded-lg bg-gradient-to-br border ${getRarityColor(badge.id, isEarned)} ${
                  isEarned ? "opacity-100" : "opacity-50"
                }`}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    isEarned ? "bg-eco-forest/20" : "bg-gray-600/20"
                  }`}>
                    <IconComponent className={`w-8 h-8 ${
                      isEarned ? "text-eco-forest" : "text-gray-500"
                    }`} />
                  </div>
                  
                  <h3 className="font-bold text-lg mb-2">{badge.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{badge.description}</p>
                  
                  <Badge 
                    variant="outline" 
                    className={`text-xs mb-3 ${getRarityBadgeColor(badge.id)}`}
                  >
                    {getRarityName(badge.id)}
                  </Badge>

                  <div className="text-xs text-muted-foreground">
                    Requirement: {badge.requirement} {badge.type.replace('_', ' ')}
                  </div>
                </div>
                
                {!isEarned && (
                  <div className="absolute inset-0 bg-background/60 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-muted-foreground">LOCKED</span>
                  </div>
                )}
                
                {isEarned && (
                  <div className="absolute top-2 right-2">
                    <div className="w-6 h-6 bg-eco-forest rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-white fill-white" />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BadgesPage;