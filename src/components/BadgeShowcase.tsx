import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Zap, Target, BookOpen, Calculator, Beaker, Globe } from "lucide-react";

const BadgeShowcase = () => {
  const badges = [
    { 
      id: 1, 
      name: "First Steps", 
      description: "Complete your first quiz", 
      icon: Star,
      earned: true,
      rarity: "common"
    },
    { 
      id: 2, 
      name: "Speed Demon", 
      description: "Answer 10 questions in under 2 minutes", 
      icon: Zap,
      earned: true,
      rarity: "rare"
    },
    { 
      id: 3, 
      name: "Perfect Score", 
      description: "Get 100% on any assessment", 
      icon: Trophy,
      earned: true,
      rarity: "epic"
    },
    { 
      id: 4, 
      name: "Math Wizard", 
      description: "Master 5 math topics", 
      icon: Calculator,
      earned: true,
      rarity: "legendary"
    },
    { 
      id: 5, 
      name: "Science Explorer", 
      description: "Complete 3 science experiments", 
      icon: Beaker,
      earned: false,
      rarity: "rare"
    },
    { 
      id: 6, 
      name: "World Scholar", 
      description: "Study 10 different countries", 
      icon: Globe,
      earned: false,
      rarity: "epic"
    },
  ];

  const getRarityColor = (rarity: string, earned: boolean) => {
    if (!earned) return "from-gray-600/20 to-gray-700/20 border-gray-600/30";
    
    switch (rarity) {
      case "common":
        return "from-blue-500/20 to-blue-600/20 border-blue-500/50";
      case "rare":
        return "from-purple-500/20 to-purple-600/20 border-purple-500/50";
      case "epic":
        return "from-pink-500/20 to-pink-600/20 border-pink-500/50";
      case "legendary":
        return "from-gaming-gold/20 to-yellow-500/20 border-gaming-gold/50";
      default:
        return "from-gray-500/20 to-gray-600/20 border-gray-500/30";
    }
  };

  const getRarityBadgeColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "rare":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "epic":
        return "bg-pink-500/20 text-pink-400 border-pink-500/30";
      case "legendary":
        return "bg-gaming-gold/20 text-gaming-gold border-gaming-gold/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <Card className="gaming-card">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Trophy className="w-6 h-6 text-gaming-gold mr-2" />
          Achievement Showcase
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map((badge) => {
            const IconComponent = badge.icon;
            return (
              <div
                key={badge.id}
                className={`relative p-4 rounded-lg bg-gradient-to-br border ${getRarityColor(badge.rarity, badge.earned)} ${
                  badge.earned ? "opacity-100" : "opacity-50"
                }`}
              >
                <div className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                    badge.earned ? "bg-primary/20" : "bg-gray-600/20"
                  }`}>
                    <IconComponent className={`w-6 h-6 ${
                      badge.earned ? "text-primary" : "text-gray-500"
                    }`} />
                  </div>
                  
                  <h3 className="font-bold text-sm mb-1">{badge.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
                  
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getRarityBadgeColor(badge.rarity)}`}
                  >
                    {badge.rarity.toUpperCase()}
                  </Badge>
                </div>
                
                {!badge.earned && (
                  <div className="absolute inset-0 bg-background/60 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold text-muted-foreground">LOCKED</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default BadgeShowcase;