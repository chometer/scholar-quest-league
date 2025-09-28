import GameHeader from "@/components/GameHeader";
import UserStats from "@/components/UserStats";
import Leaderboard from "@/components/Leaderboard";
import EnvironmentalQuiz from "@/components/EnvironmentalQuiz";
import EcoGame from "@/components/EcoGame";

const Games = () => {
  return (
    <div className="min-h-screen bg-background">
      <GameHeader />
      
      <main className="container mx-auto px-4 py-8">
        <UserStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <EnvironmentalQuiz />
          <EcoGame />
        </div>
        
        <Leaderboard />
      </main>
    </div>
  );
};

export default Games;