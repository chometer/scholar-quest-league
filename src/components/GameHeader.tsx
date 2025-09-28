import { Leaf, Trophy, GamepadIcon, BookOpen, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const GameHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Leaf },
    { path: '/games', label: 'Games', icon: GamepadIcon },
    { path: '/quizzes', label: 'Quizzes', icon: BookOpen },
    { path: '/leaderboards', label: 'Leaderboards', icon: Trophy },
    { path: '/badges', label: 'Badges', icon: Award },
  ];

  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-eco-forest to-eco-leaf rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-eco-forest to-eco-leaf bg-clip-text text-transparent">
                EcoQuest Academy
              </h1>
              <p className="text-sm text-muted-foreground">Learn, Play, Save the Planet</p>
            </div>
          </div>
          
          <nav className="flex items-center space-x-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => navigate(item.path)}
                  className={`flex items-center space-x-2 ${
                    isActive 
                      ? "bg-gradient-to-r from-eco-forest to-eco-leaf text-white" 
                      : "hover:bg-eco-forest/10"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;