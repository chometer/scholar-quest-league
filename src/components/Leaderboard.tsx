import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Medal, Award } from "lucide-react";

const Leaderboard = () => {
  const leaderboardData = [
    { rank: 1, name: "Alex Chen", level: 15, xp: 4250, badge: "Genius", school: "MIT" },
    { rank: 2, name: "Sarah Johnson", level: 14, xp: 3890, badge: "Scholar", school: "Harvard" },
    { rank: 3, name: "Mike Rodriguez", level: 13, xp: 3654, badge: "Prodigy", school: "Stanford" },
    { rank: 4, name: "Emily Davis", level: 12, xp: 3201, badge: "Expert", school: "Yale" },
    { rank: 5, name: "You", level: 12, xp: 2850, badge: "Rising Star", school: "Your College" },
  ];

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

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "from-yellow-500/20 to-gaming-gold/20 border-gaming-gold/30";
      case 2:
        return "from-gray-400/20 to-gaming-silver/20 border-gaming-silver/30";
      case 3:
        return "from-orange-600/20 to-gaming-bronze/20 border-gaming-bronze/30";
      default:
        return rank === 5 ? "from-primary/20 to-secondary/20 border-primary/30" : "";
    }
  };

  return (
    <Card className="gaming-card">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Crown className="w-6 h-6 text-gaming-gold mr-2" />
          Global Leaderboard
        </h2>
        
        <div className="space-y-4">
          {leaderboardData.map((player) => (
            <div
              key={player.rank}
              className={`flex items-center p-4 rounded-lg bg-gradient-to-r ${getRankColor(player.rank)} ${
                player.name === "You" ? "ring-2 ring-primary" : ""
              }`}
            >
              <div className="flex items-center mr-4">
                {getRankIcon(player.rank)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{player.name}</h3>
                    <p className="text-sm text-muted-foreground">{player.school}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge variant="secondary" className="text-xs">
                        Level {player.level}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {player.badge}
                      </Badge>
                    </div>
                    <p className="text-sm font-bold text-gaming-xp">{player.xp} XP</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default Leaderboard;