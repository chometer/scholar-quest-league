import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Flame, Star, TrendingUp, Award, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const UserStats = () => {
  const [userStats, setUserStats] = useState({
    level: 12,
    currentXP: 0,
    nextLevelXP: 3200,
    streak: 7,
    rank: 1
  });

  useEffect(() => {
    // Get current user points and calculate stats
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{"name": "You", "points": 0}');
    const points = currentUser.points || 0;
    
    // Calculate level based on points (every 250 points = 1 level)
    const level = Math.floor(points / 250) + 1;
    const currentXP = points % 250;
    const nextLevelXP = 250;
    
    // Simple rank calculation (you can make this more sophisticated)
    const rank = Math.max(1, 50 - Math.floor(points / 50));
    
    setUserStats({
      level,
      currentXP,
      nextLevelXP,
      streak: 7, // You can track this based on daily activity
      rank
    });
  }, []);

  const xpProgress = (userStats.currentXP / userStats.nextLevelXP) * 100;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Level Card */}
      <Card className="gaming-card text-center">
        <div className="p-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-gaming-level to-primary flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{userStats.level}</span>
          </div>
          <h3 className="text-lg font-bold mb-2">Level</h3>
          <p className="text-sm text-muted-foreground">
            {userStats.level < 5 ? "Beginner" : userStats.level < 10 ? "Scholar" : "Expert"} Rank
          </p>
        </div>
      </Card>

      {/* Points Card */}
      <Card className="gaming-card">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <Zap className="w-6 h-6 text-gaming-xp mr-2" />
            <h3 className="text-lg font-bold">Points</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{userStats.currentXP} pts</span>
              <span>{userStats.nextLevelXP} pts</span>
            </div>
            <Progress value={xpProgress} className="h-3" />
            <p className="text-xs text-muted-foreground">
              {userStats.nextLevelXP - userStats.currentXP} pts to next level
            </p>
          </div>
        </div>
      </Card>

      {/* Streak Card */}
      <Card className="gaming-card text-center">
        <div className="p-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
            <Flame className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-bold mb-2">Streak</h3>
          <p className="text-2xl font-bold text-orange-500">{userStats.streak} Days</p>
        </div>
      </Card>

      {/* Rank Card */}
      <Card className="gaming-card text-center">
        <div className="p-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-gaming-gold to-yellow-500 flex items-center justify-center">
            <Award className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-bold mb-2">Global Rank</h3>
          <p className="text-2xl font-bold text-gaming-gold">#{userStats.rank}</p>
        </div>
      </Card>
    </div>
  );
};

export default UserStats;