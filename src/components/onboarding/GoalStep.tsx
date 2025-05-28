
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Target, TrendingUp, Zap, Heart } from "lucide-react";
import { OnboardingData } from "@/pages/Onboarding";

interface GoalStepProps {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const GoalStep = ({ data, updateData, onNext, onPrev }: GoalStepProps) => {
  const goals = [
    {
      id: "mass",
      title: "Ganho de Massa",
      description: "Aumentar músculos e força",
      icon: TrendingUp,
      color: "bg-primary/10 text-primary"
    },
    {
      id: "weight_loss",
      title: "Emagrecimento",
      description: "Perder gordura e definir o corpo",
      icon: Target,
      color: "bg-primary/10 text-primary"
    },
    {
      id: "conditioning",
      title: "Condicionamento",
      description: "Melhorar resistência e disposição",
      icon: Zap,
      color: "bg-primary/10 text-primary"
    },
    {
      id: "health",
      title: "Saúde Geral",
      description: "Manter-se ativo e saudável",
      icon: Heart,
      color: "bg-primary/10 text-primary"
    }
  ];

  const handleGoalSelect = (goalId: string) => {
    updateData("goal", goalId);
  };

  useEffect(() => {
    if (data.goal) {
      const timer = setTimeout(() => {
        onNext();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [data.goal, onNext]);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
          <Target className="text-primary" size={32} />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Qual é o seu objetivo principal?
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Escolha o que mais te motiva a treinar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((goal) => {
          const Icon = goal.icon;
          const isSelected = data.goal === goal.id;
          
          return (
            <button
              key={goal.id}
              onClick={() => handleGoalSelect(goal.id)}
              className={`p-6 rounded-lg border-2 transition-all text-left hover:shadow-sm ${
                isSelected 
                  ? 'border-primary bg-primary/5 shadow-sm' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-primary/50 bg-white dark:bg-gray-800'
              }`}
            >
              <div className={`w-12 h-12 ${goal.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon size={24} />
              </div>
              <h4 className="font-inter font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                {goal.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {goal.description}
              </p>
            </button>
          );
        })}
      </div>

      <div className="flex gap-4 pt-6">
        <Button 
          onClick={onPrev}
          variant="outline"
          className="flex-1 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
          size="lg"
        >
          Voltar
        </Button>
      </div>
    </div>
  );
};

export default GoalStep;
