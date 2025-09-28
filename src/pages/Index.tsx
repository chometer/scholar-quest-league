import GameHeader from "@/components/GameHeader";
import UserStats from "@/components/UserStats";
import BadgeShowcase from "@/components/BadgeShowcase";
import SubjectCards from "@/components/SubjectCards";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { GamepadIcon, BookOpen, Trophy } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <GameHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-eco-forest to-eco-leaf bg-clip-text text-transparent">
            Welcome to EcoQuest Academy
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Learn, compete, and make a difference for our planet
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="gaming-card p-6 text-center hover:scale-105 transition-transform">
              <GamepadIcon className="w-12 h-12 text-eco-forest mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Eco Games</h3>
              <p className="text-muted-foreground mb-4">Play fun environmental games</p>
              <Button onClick={() => navigate('/games')} className="w-full bg-gradient-to-r from-eco-forest to-eco-leaf">
                Play Games
              </Button>
            </div>
            
            <div className="gaming-card p-6 text-center hover:scale-105 transition-transform">
              <BookOpen className="w-12 h-12 text-eco-ocean mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Quizzes</h3>
              <p className="text-muted-foreground mb-4">Test your environmental knowledge</p>
              <Button onClick={() => navigate('/quizzes')} className="w-full bg-gradient-to-r from-eco-ocean to-eco-leaf">
                Take Quiz
              </Button>
            </div>
            
            <div className="gaming-card p-6 text-center hover:scale-105 transition-transform">
              <Trophy className="w-12 h-12 text-gaming-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Leaderboards</h3>
              <p className="text-muted-foreground mb-4">Compete with eco-warriors</p>
              <Button onClick={() => navigate('/leaderboards')} className="w-full bg-gradient-to-r from-gaming-gold to-eco-leaf">
                View Rankings
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <BadgeShowcase />
          <div className="gaming-card p-6 flex flex-col items-center justify-center text-center bg-gradient-to-br from-eco-forest/10 to-eco-leaf/10">
            <h2 className="text-2xl font-bold mb-4">Your Eco Journey</h2>
            <p className="text-muted-foreground mb-6">Track your progress and earn rewards as you learn about sustainability!</p>
          </div>
        </div>
        
        <SubjectCards />
      </main>
    </div>
  );
};

export default Index;
