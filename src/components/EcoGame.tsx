import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Recycle, Leaf, TreePine, Droplets, Trophy } from "lucide-react";
import { toast } from "sonner";

interface GameItem {
  id: number;
  type: 'recyclable' | 'organic' | 'hazardous';
  name: string;
  icon: string;
  x: number;
  y: number;
}

interface Bin {
  type: 'recyclable' | 'organic' | 'hazardous';
  name: string;
  color: string;
  icon: any;
}

const EcoGame = () => {
  const [gameItems, setGameItems] = useState<GameItem[]>([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [streakCount, setStreakCount] = useState(0);

  const bins: Bin[] = [
    { type: 'recyclable', name: 'Recycling', color: 'bg-blue-500', icon: Recycle },
    { type: 'organic', name: 'Organic', color: 'bg-green-500', icon: Leaf },
    { type: 'hazardous', name: 'Hazardous', color: 'bg-red-500', icon: Droplets }
  ];

  const itemTypes = [
    { type: 'recyclable', items: ['🥫', '📰', '🍶', '📦', '🥤'] },
    { type: 'organic', items: ['🍌', '🍎', '🥕', '🍃', '🌿'] },
    { type: 'hazardous', items: ['🔋', '💡', '🧴', '🏭', '⚗️'] }
  ];

  const generateItem = useCallback(() => {
    const typeIndex = Math.floor(Math.random() * itemTypes.length);
    const selectedType = itemTypes[typeIndex];
    const itemIcon = selectedType.items[Math.floor(Math.random() * selectedType.items.length)];
    
    return {
      id: Date.now() + Math.random(),
      type: selectedType.type as 'recyclable' | 'organic' | 'hazardous',
      name: itemIcon,
      icon: itemIcon,
      x: Math.random() * 300 + 50,
      y: Math.random() * 200 + 50
    };
  }, []);

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setLevel(1);
    setTimeLeft(60);
    setGameCompleted(false);
    setStreakCount(0);
    setGameItems([generateItem()]);
  };

  const handleItemClick = (item: GameItem, binType: 'recyclable' | 'organic' | 'hazardous') => {
    if (item.type === binType) {
      // Correct sorting
      const points = 10 + (streakCount * 2);
      setScore(prev => prev + points);
      setStreakCount(prev => prev + 1);
      toast.success(`Correct! +${points} points`, {
        description: `Streak: ${streakCount + 1}`
      });
      
      // Remove the item and add a new one
      setGameItems(prev => {
        const newItems = prev.filter(i => i.id !== item.id);
        if (newItems.length < level + 1) {
          newItems.push(generateItem());
        }
        return newItems;
      });
    } else {
      // Wrong sorting
      setStreakCount(0);
      toast.error("Wrong bin! Streak reset");
      setScore(prev => Math.max(0, prev - 5));
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameActive && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameActive(false);
      setGameCompleted(true);
      
      // Update user's points
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{"name": "You", "points": 0}');
      currentUser.points = (currentUser.points || 0) + score;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      
      toast.success(`Game Over! You earned ${score} eco-points!`);
    }
    
    return () => clearTimeout(timer);
  }, [gameActive, timeLeft, score]);

  useEffect(() => {
    // Level up every 100 points
    const newLevel = Math.floor(score / 100) + 1;
    if (newLevel > level && gameActive) {
      setLevel(newLevel);
      toast.success(`Level Up! Level ${newLevel}`);
      
      // Add more items for higher levels
      setGameItems(prev => {
        const newItems = [...prev];
        while (newItems.length < newLevel + 1) {
          newItems.push(generateItem());
        }
        return newItems;
      });
    }
  }, [score, level, gameActive, generateItem]);

  if (!gameActive && !gameCompleted) {
    return (
      <Card className="gaming-card">
        <div className="p-8 text-center">
          <TreePine className="w-16 h-16 text-gaming-xp mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Eco Sorting Game</h2>
          <p className="text-muted-foreground mb-6">
            Sort items into the correct bins to save the environment! 
            Earn points and build your streak for bonus rewards.
          </p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {bins.map((bin) => {
              const IconComponent = bin.icon;
              return (
                <div key={bin.type} className={`p-4 rounded-lg ${bin.color}/20 border ${bin.color.replace('bg-', 'border-')}/30`}>
                  <IconComponent className={`w-8 h-8 mx-auto mb-2 ${bin.color.replace('bg-', 'text-')}`} />
                  <p className="text-sm font-medium">{bin.name}</p>
                </div>
              );
            })}
          </div>
          <Button onClick={startGame} className="gaming-button text-lg px-8">
            Start Eco Challenge
          </Button>
        </div>
      </Card>
    );
  }

  if (gameCompleted) {
    return (
      <Card className="gaming-card">
        <div className="p-8 text-center">
          <Trophy className="w-16 h-16 text-gaming-gold mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Eco Challenge Complete!</h2>
          <div className="space-y-4">
            <div>
              <p className="text-2xl font-bold text-gaming-xp">Final Score: {score}</p>
              <p className="text-lg">Level Reached: {level}</p>
              <p className="text-sm text-muted-foreground">
                You've earned {score} eco-points for helping the environment!
              </p>
            </div>
            <Button onClick={startGame} className="gaming-button">
              Play Again
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="gaming-card">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center">
            <TreePine className="w-6 h-6 text-gaming-xp mr-2" />
            Eco Sorting Challenge
          </h2>
          <div className="flex space-x-4">
            <Badge variant="secondary">Level {level}</Badge>
            <Badge variant="outline">Time: {timeLeft}s</Badge>
            <Badge className="bg-gaming-xp/20 text-gaming-xp">Score: {score}</Badge>
          </div>
        </div>

        {/* Game Area */}
        <div className="relative bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-lg p-4 mb-4 h-64 overflow-hidden">
          {gameItems.map((item) => (
            <div
              key={item.id}
              className="absolute cursor-pointer text-3xl hover:scale-110 transition-transform"
              style={{ left: `${item.x}px`, top: `${item.y}px` }}
            >
              {item.icon}
            </div>
          ))}
        </div>

        {/* Bins */}
        <div className="grid grid-cols-3 gap-4">
          {bins.map((bin) => {
            const IconComponent = bin.icon;
            return (
              <div
                key={bin.type}
                className={`p-4 rounded-lg ${bin.color}/20 border ${bin.color.replace('bg-', 'border-')}/30 text-center cursor-pointer hover:scale-105 transition-transform`}
                onClick={() => {
                  gameItems.forEach(item => {
                    handleItemClick(item, bin.type);
                  });
                }}
              >
                <IconComponent className={`w-8 h-8 mx-auto mb-2 ${bin.color.replace('bg-', 'text-')}`} />
                <p className="text-sm font-medium">{bin.name}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Click items and then click the correct bin! Streak: {streakCount}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default EcoGame;