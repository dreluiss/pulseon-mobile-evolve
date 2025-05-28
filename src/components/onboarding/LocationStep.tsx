
import { Button } from "@/components/ui/button";
import { MapPin, Home, Building, Trees } from "lucide-react";
import { OnboardingData } from "@/pages/Onboarding";
import { useEffect } from "react";

interface LocationStepProps {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const LocationStep = ({ data, updateData, onNext, onPrev }: LocationStepProps) => {
  const locations = [
    {
      id: "gym",
      title: "Academia Completa",
      description: "Acesso a todos os equipamentos e máquinas",
      icon: Building,
      color: "bg-primary/10 text-primary"
    },
    {
      id: "home",
      title: "Em Casa",
      description: "Treinos adaptados para o ambiente doméstico",
      icon: Home,
      color: "bg-primary/10 text-primary"
    },
    {
      id: "park",
      title: "Parque/Rua",
      description: "Exercícios funcionais ao ar livre",
      icon: Trees,
      color: "bg-primary/10 text-primary"
    },
    {
      id: "condo",
      title: "Academia do Condomínio",
      description: "Equipamentos básicos e limitados",
      icon: Building,
      color: "bg-primary/10 text-primary"
    }
  ];

  const handleLocationSelect = (locationId: string) => {
    updateData("location", locationId);
  };

  useEffect(() => {
    if (data.location) {
      const timer = setTimeout(() => {
        onNext();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [data.location, onNext]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="text-primary" size={32} />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Onde você pretende treinar?
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Vamos adaptar os exercícios ao seu local de treino
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {locations.map((location) => {
          const Icon = location.icon;
          const isSelected = data.location === location.id;
          
          return (
            <button
              key={location.id}
              onClick={() => handleLocationSelect(location.id)}
              className={`p-6 rounded-2xl border-2 transition-all text-left hover:shadow-lg ${
                isSelected 
                  ? 'border-primary bg-primary/5 shadow-lg' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-primary/50 bg-white dark:bg-gray-800'
              }`}
            >
              <div className={`w-12 h-12 ${location.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon size={24} />
              </div>
              <h4 className="font-inter font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                {location.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {location.description}
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

export default LocationStep;
