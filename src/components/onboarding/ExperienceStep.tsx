
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star, Award, Trophy } from "lucide-react";
import { OnboardingData } from "@/pages/Onboarding";

interface ExperienceStepProps {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const ExperienceStep = ({ data, updateData, onNext, onPrev }: ExperienceStepProps) => {
  const levels = [
    {
      id: "beginner",
      title: "Iniciante",
      description: "Pouca ou nenhuma experiência com exercícios",
      icon: Star,
      color: "bg-primary/10 text-primary"
    },
    {
      id: "intermediate",
      title: "Intermediário",
      description: "Já pratico exercícios regularmente há alguns meses",
      icon: Award,
      color: "bg-primary/10 text-primary"
    },
    {
      id: "advanced",
      title: "Avançado",
      description: "Tenho bastante experiência e conhecimento técnico",
      icon: Trophy,
      color: "bg-primary/10 text-primary"
    }
  ];

  const handleLevelSelect = (levelId: string) => {
    updateData("experience", levelId);
  };

  useEffect(() => {
    if (data.experience) {
      const timer = setTimeout(() => {
        onNext();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [data.experience, onNext]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Award className="text-primary" size={32} />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Qual seu nível de experiência?
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Isso nos ajuda a criar treinos adequados ao seu nível
        </p>
      </div>

      <div className="space-y-4">
        {levels.map((level) => {
          const Icon = level.icon;
          const isSelected = data.experience === level.id;
          
          return (
            <button
              key={level.id}
              onClick={() => handleLevelSelect(level.id)}
              className={`w-full p-6 rounded-2xl border-2 transition-all text-left hover:shadow-lg flex items-center gap-4 ${
                isSelected 
                  ? 'border-primary bg-primary/5 shadow-lg scale-105' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-primary/50 bg-white dark:bg-gray-800'
              }`}
            >
              <div className={`w-12 h-12 ${level.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <Icon size={24} />
              </div>
              <div>
                <h4 className="font-inter font-semibold text-lg mb-1 text-gray-900 dark:text-white">
                  {level.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {level.description}
                </p>
              </div>
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

export default ExperienceStep;
