import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Medal, Award } from "lucide-react";
import { useEffect, useState } from "react";

interface LeaderboardPlayer {
  rank: number;
  name: string;
  points: number;
  badge: string;
  school: string;
}

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardPlayer[]>([]);

  useEffect(() => {
    // Get current user data
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{"name": "You", "points": 0, "school": "Your College"}');
    
    // Create sample leaderboard based on points (you can replace this with real data later)
    const baseData = [
      { name: "EcoChampion", points: 1250, badge: "Environmental Hero", school: "Green University" },
      { name: "QuizMaster", points: 980, badge: "Knowledge Seeker", school: "Smart College" },
      { name: "NatureLover", points: 850, badge: "Earth Guardian", school: "Eco Institute" },
      { name: "StudyBee", points: 720, badge: "Dedicated Learner", school: "Academic Hall" },
    ];

    // Add current user to the list
    const allPlayers = [...baseData, {
      name: currentUser.name,
      points: currentUser.points || 0,
      badge: currentUser.points > 500 ? "Rising Star" : "Beginner",
      school: currentUser.school || "Your College"
    }];

    // Sort by points and assign ranks
    const sortedPlayers = allPlayers
      .sort((a, b) => b.points - a.points)
      .map((player, index) => ({
        ...player,
        rank: index + 1
      }))
      .slice(0, 5); // Show top 5

    setLeaderboardData(sortedPlayers);
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-gaming-gold" />;
      case 2:
        return <Medal className="w-6 h-6 text-gaming-silver" />;
      case 3:
        return <Award className="w-6 h-6 text-gaming-bronze" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number, isCurrentUser: boolean) => {
    if (isCurrentUser) {
      return "from-primary/20 to-secondary/20 border-primary/30 ring-2 ring-primary";
    }
    
    switch (rank) {
      case 1:
        return "from-yellow-500/20 to-gaming-gold/20 border-gaming-gold/30";
      case 2:
        return "from-gray-400/20 to-gaming-silver/20 border-gaming-silver/30";
      case 3:
        return "from-orange-600/20 to-gaming-bronze/20 border-gaming-bronze/30";
      default:
        return "";
    }
  };

  return (
    <Card className="gaming-card">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Crown className="w-6 h-6 text-gaming-gold mr-2" />
          Points Leaderboard
        </h2>
        
        <div className="space-y-4">
          {leaderboardData.map((player) => {
            const isCurrentUser = player.name === "You" || player.name === JSON.parse(localStorage.getItem('currentUser') || '{"name": "You"}').name;
            
            return (
              <div
                key={`${player.name}-${player.rank}`}
                className={`flex items-center p-4 rounded-lg bg-gradient-to-r border ${getRankColor(player.rank, isCurrentUser)}`}
              >
                <div className="flex items-center mr-4">
                  {getRankIcon(player.rank)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg flex items-center">
                        {player.name}
                        {isCurrentUser && <Badge variant="secondary" className="ml-2 text-xs">You</Badge>}
                      </h3>
                      <p className="text-sm text-muted-foreground">{player.school}</p>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {player.badge}
                        </Badge>
                      </div>
                      <p className="text-lg font-bold text-gaming-xp">{player.points} pts</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {leaderboardData.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Complete quizzes and games to appear on the leaderboard!</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Leaderboard;