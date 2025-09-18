import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Flame, Star, TrendingUp, Award, Zap } from "lucide-react";

const UserStats = () => {
  const userLevel = 12;
  const currentXP = 2850;
  const nextLevelXP = 3200;
  const xpProgress = (currentXP / nextLevelXP) * 100;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Level Card */}
      <Card className="gaming-card text-center">
        <div className="p-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-gaming-level to-primary flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{userLevel}</span>
          </div>
          <h3 className="text-lg font-bold mb-2">Level</h3>
          <p className="text-sm text-muted-foreground">Scholar Rank</p>
        </div>
      </Card>

      {/* XP Card */}
      <Card className="gaming-card">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <Zap className="w-6 h-6 text-gaming-xp mr-2" />
            <h3 className="text-lg font-bold">Experience</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{currentXP} XP</span>
              <span>{nextLevelXP} XP</span>
            </div>
            <Progress value={xpProgress} className="h-3" />
            <p className="text-xs text-muted-foreground">
              {nextLevelXP - currentXP} XP to next level
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
          <p className="text-2xl font-bold text-orange-500">7 Days</p>
        </div>
      </Card>

      {/* Rank Card */}
      <Card className="gaming-card text-center">
        <div className="p-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-gaming-gold to-yellow-500 flex items-center justify-center">
            <Award className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-bold mb-2">Global Rank</h3>
          <p className="text-2xl font-bold text-gaming-gold">#23</p>
        </div>
      </Card>
    </div>
  );
};

export default UserStats;