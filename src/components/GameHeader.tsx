import { Trophy, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const GameHeader = () => {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-background to-background/80 py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_70%)]" />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="flex items-center justify-center mb-6">
          <div className="p-4 rounded-full bg-primary/20 mr-4">
            <Trophy className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-6xl font-bold gradient-text">
            AcademyQuest
          </h1>
        </div>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Transform your learning journey into an epic adventure. Compete, achieve, and level up your academic skills!
        </p>
        
        <div className="flex items-center justify-center space-x-8 mb-8">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-gaming-xp" />
            <span className="text-sm font-medium">Earn XP</span>
          </div>
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-gaming-gold" />
            <span className="text-sm font-medium">Unlock Badges</span>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Climb Leaderboards</span>
          </div>
        </div>
        
        <Button size="lg" className="gaming-button text-lg px-8 py-3">
          Start Your Quest
        </Button>
      </div>
    </header>
  );
};

export default GameHeader;