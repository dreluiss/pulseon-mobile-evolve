
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { OnboardingData } from "@/pages/Onboarding";

interface FrequencyStepProps {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const FrequencyStep = ({ data, updateData, onNext, onPrev }: FrequencyStepProps) => {
  const frequencies = [
    {
      id: "2-3",
      title: "2-3 vezes por semana",
      description: "Ideal para iniciantes ou quem tem pouco tempo",
      duration: "45-60 min por treino"
    },
    {
      id: "4-5",
      title: "4-5 vezes por semana",
      description: "Frequência equilibrada para bons resultados",
      duration: "45-75 min por treino"
    },
    {
      id: "6-7",
      title: "6-7 vezes por semana",
      description: "Para quem quer resultados acelerados",
      duration: "60-90 min por treino"
    }
  ];

  const handleFrequencySelect = (frequencyId: string) => {
    updateData("frequency", frequencyId);
  };

  // Avança automaticamente após seleção
  useEffect(() => {
    if (data.frequency) {
      const timer = setTimeout(() => {
        onNext();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [data.frequency, onNext]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="text-primary" size={32} />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">
          Quantas vezes por semana você quer treinar?
        </h3>
        <p className="text-muted-foreground">
          Escolha uma frequência que se encaixe na sua rotina
        </p>
      </div>

      <div className="space-y-4">
        {frequencies.map((frequency) => {
          const isSelected = data.frequency === frequency.id;
          
          return (
            <button
              key={frequency.id}
              onClick={() => handleFrequencySelect(frequency.id)}
              className={`w-full p-6 rounded-2xl border-2 transition-all text-left hover:shadow-lg ${
                isSelected 
                  ? 'border-primary bg-slate-50 dark:bg-slate-800 shadow-lg scale-105' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-poppins font-bold text-lg text-foreground">
                  {frequency.title}
                </h4>
                <div className="flex items-center text-muted-foreground text-sm">
                  <Clock size={16} className="mr-1" />
                  {frequency.duration}
                </div>
              </div>
              <p className="text-muted-foreground text-sm">
                {frequency.description}
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
      </div>
    </div>
  );
};

export default FrequencyStep;
