import GameHeader from "@/components/GameHeader";
import UserStats from "@/components/UserStats";
import BadgeShowcase from "@/components/BadgeShowcase";
import SubjectCards from "@/components/SubjectCards";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <GameHeader />
      
      <main className="container mx-auto px-4 py-8">
        <UserStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <BadgeShowcase />
          <div className="gaming-card p-6 flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Play?</h2>
            <p className="text-muted-foreground mb-6">Test your knowledge and compete with others!</p>
            <Button onClick={() => navigate('/games')} className="gaming-button">
              Start Gaming
            </Button>
          </div>
        </div>
        
        <SubjectCards />
      </main>
    </div>
  );
};

export default Index;
