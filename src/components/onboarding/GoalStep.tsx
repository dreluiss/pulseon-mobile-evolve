
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
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: "weight_loss",
      title: "Emagrecimento",
      description: "Perder gordura e definir o corpo",
      icon: Target,
      color: "bg-red-100 text-red-600"
    },
    {
      id: "conditioning",
      title: "Condicionamento",
      description: "Melhorar resistência e disposição",
      icon: Zap,
      color: "bg-green-100 text-green-600"
    },
    {
      id: "health",
      title: "Saúde Geral",
      description: "Manter-se ativo e saudável",
      icon: Heart,
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const handleGoalSelect = (goalId: string) => {
    updateData("goal", goalId);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Target className="text-primary" size={32} />
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          Qual é o seu objetivo principal?
        </h3>
        <p className="text-gray-600">
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
              className={`p-6 rounded-2xl border-2 transition-all text-left hover:shadow-lg ${
                isSelected 
                  ? 'border-primary bg-primary/5 shadow-lg' 
                  : 'border-gray-200 hover:border-primary/50'
              }`}
            >
              <div className={`w-12 h-12 ${goal.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon size={24} />
              </div>
              <h4 className="font-poppins font-bold text-lg mb-2 text-gray-800">
                {goal.title}
              </h4>
              <p className="text-gray-600 text-sm">
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
          className="flex-1"
          size="lg"
        >
          Voltar
        </Button>
        <Button 
          onClick={onNext}
          className="flex-1 bg-primary hover:bg-primary/90"
          size="lg"
          disabled={!data.goal}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default GoalStep;
