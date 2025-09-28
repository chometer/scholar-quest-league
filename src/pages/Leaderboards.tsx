import GameHeader from "@/components/GameHeader";
import Leaderboard from "@/components/Leaderboard";

const Leaderboards = () => {
  return (
    <div className="min-h-screen bg-background">
      <GameHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gaming-gold to-eco-leaf bg-clip-text text-transparent">
            Global Leaderboards
          </h1>
          <p className="text-muted-foreground text-lg">
            See how you rank against other eco-warriors
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Leaderboard />
        </div>
      </main>
    </div>
  );
};

export default Leaderboards;