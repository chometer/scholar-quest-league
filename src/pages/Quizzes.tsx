import GameHeader from "@/components/GameHeader";
import EnvironmentalQuiz from "@/components/EnvironmentalQuiz";

const Quizzes = () => {
  return (
    <div className="min-h-screen bg-background">
      <GameHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-eco-forest to-eco-leaf bg-clip-text text-transparent">
            Environmental Quizzes
          </h1>
          <p className="text-muted-foreground text-lg">
            Test your knowledge about environmental sustainability and conservation
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <EnvironmentalQuiz />
        </div>
      </main>
    </div>
  );
};

export default Quizzes;