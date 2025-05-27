import { Button } from "@/components/ui/button";
import { Dumbbell, Circle } from "lucide-react";
import { OnboardingData } from "@/pages/Onboarding";

interface EquipmentStepProps {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const EquipmentStep = ({ data, updateData, onNext, onPrev }: EquipmentStepProps) => {
  const equipmentOptions = [
    { id: "none", label: "Nenhum equipamento" },
    { id: "dumbbells", label: "Halteres" },
    { id: "resistance_bands", label: "Faixas elásticas" },
    { id: "kettlebells", label: "Kettlebells" },
    { id: "barbell", label: "Barras e anilhas" },
    { id: "pull_up_bar", label: "Barra fixa" },
    { id: "yoga_mat", label: "Tapete de yoga" },
    { id: "bench", label: "Banco" },
    { id: "machines", label: "Máquinas de musculação" },
    { id: "cardio", label: "Equipamentos de cardio" }
  ];

  const handleEquipmentToggle = (equipmentId: string) => {
    const currentEquipment = data.equipment || [];
    
    if (equipmentId === "none") {
      // Se selecionar "nenhum", limpar tudo
      updateData("equipment", ["none"]);
    } else {
      // Remover "nenhum" se existir e adicionar/remover o item
      let newEquipment = currentEquipment.filter(item => item !== "none");
      
      if (newEquipment.includes(equipmentId)) {
        newEquipment = newEquipment.filter(item => item !== equipmentId);
      } else {
        newEquipment = [...newEquipment, equipmentId];
      }
      
      updateData("equipment", newEquipment);
    }
  };

  const isSelected = (equipmentId: string) => {
    return data.equipment?.includes(equipmentId) || false;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Dumbbell className="text-primary" size={32} />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">
          Quais equipamentos você tem disponível?
        </h3>
        <p className="text-muted-foreground">
          Selecione todos que se aplicam (pode escolher mais de um)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {equipmentOptions.map((equipment) => {
          const selected = isSelected(equipment.id);
          
          return (
            <button
              key={equipment.id}
              onClick={() => handleEquipmentToggle(equipment.id)}
              className={`p-4 rounded-xl border-2 transition-all text-left hover:shadow-md flex items-center gap-3 ${
                selected 
                  ? 'border-primary bg-slate-50 dark:bg-slate-800 shadow-md' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selected ? 'border-primary bg-primary' : 'border-muted-foreground'
              }`}>
                {selected && <Circle className="text-white" size={12} fill="currentColor" />}
              </div>
              <span className="font-medium text-foreground">
                {equipment.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="bg-primary/10 p-4 rounded-xl">
        <p className="text-sm text-foreground">
          <strong>Dica:</strong> Não se preocupe se você não tem muitos equipamentos. 
          Criamos treinos eficazes com qualquer material disponível!
        </p>
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
          disabled={!data.equipment || data.equipment.length === 0}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default EquipmentStep;
