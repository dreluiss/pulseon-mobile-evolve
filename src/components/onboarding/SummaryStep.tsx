
import { Button } from "@/components/ui/button";
import { CheckCircle, User, Target, Award, Calendar, MapPin, Dumbbell, AlertTriangle } from "lucide-react";
import { OnboardingData } from "@/pages/Onboarding";

interface SummaryStepProps {
  data: OnboardingData;
  onPrev: () => void;
}

const SummaryStep = ({ data, onPrev }: SummaryStepProps) => {
  const getGoalLabel = (goal: string) => {
    const goals = {
      mass: "Ganho de Massa",
      weight_loss: "Emagrecimento",
      conditioning: "Condicionamento",
      health: "Saúde Geral"
    };
    return goals[goal as keyof typeof goals] || goal;
  };

  const getExperienceLabel = (experience: string) => {
    const levels = {
      beginner: "Iniciante",
      intermediate: "Intermediário",
      advanced: "Avançado"
    };
    return levels[experience as keyof typeof levels] || experience;
  };

  const getLocationLabel = (location: string) => {
    const locations = {
      gym: "Academia Completa",
      home: "Em Casa",
      park: "Parque/Rua",
      condo: "Academia do Condomínio"
    };
    return locations[location as keyof typeof locations] || location;
  };

  const getEquipmentLabels = (equipment: string[]) => {
    const equipmentMap = {
      none: "Nenhum equipamento",
      dumbbells: "Halteres",
      resistance_bands: "Faixas elásticas",
      kettlebells: "Kettlebells",
      barbell: "Barras e anilhas",
      pull_up_bar: "Barra fixa",
      yoga_mat: "Tapete de yoga",
      bench: "Banco",
      machines: "Máquinas de musculação",
      cardio: "Equipamentos de cardio"
    };
    
    return equipment.map(eq => equipmentMap[eq as keyof typeof equipmentMap] || eq);
  };

  const handleStartTraining = () => {
    // Aqui você implementaria a lógica para gerar o primeiro treino
    console.log("Dados completos do onboarding:", data);
    alert("Parabéns! Seu perfil foi criado com sucesso. Em breve você será redirecionado para seu primeiro treino personalizado!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="text-green-600" size={32} />
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          Perfeito! Vamos revisar suas informações
        </h3>
        <p className="text-gray-600">
          Confirme se está tudo correto antes de criarmos seu treino personalizado
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <User className="text-primary" size={20} />
            <h4 className="font-poppins font-bold text-gray-800">Informações Pessoais</h4>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Nome:</strong> {data.name}</p>
            <p><strong>Idade:</strong> {data.age} anos</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <Target className="text-primary" size={20} />
            <h4 className="font-poppins font-bold text-gray-800">Objetivo</h4>
          </div>
          <p className="text-sm text-gray-600">{getGoalLabel(data.goal)}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <Award className="text-primary" size={20} />
            <h4 className="font-poppins font-bold text-gray-800">Experiência</h4>
          </div>
          <p className="text-sm text-gray-600">{getExperienceLabel(data.experience)}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="text-primary" size={20} />
            <h4 className="font-poppins font-bold text-gray-800">Frequência</h4>
          </div>
          <p className="text-sm text-gray-600">{data.frequency} vezes por semana</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="text-primary" size={20} />
            <h4 className="font-poppins font-bold text-gray-800">Local de Treino</h4>
          </div>
          <p className="text-sm text-gray-600">{getLocationLabel(data.location)}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <Dumbbell className="text-primary" size={20} />
            <h4 className="font-poppins font-bold text-gray-800">Equipamentos</h4>
          </div>
          <div className="text-sm text-gray-600">
            {getEquipmentLabels(data.equipment).join(", ")}
          </div>
        </div>

        {data.restrictions && (
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="text-primary" size={20} />
              <h4 className="font-poppins font-bold text-gray-800">Restrições</h4>
            </div>
            <p className="text-sm text-gray-600">{data.restrictions}</p>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-2xl text-white text-center">
        <h3 className="font-poppins font-bold text-xl mb-2">
          Tudo pronto para começar!
        </h3>
        <p className="text-white/90 mb-4">
          Com base nas suas informações, criaremos treinos únicos e personalizados para você.
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
          onClick={handleStartTraining}
          className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          size="lg"
        >
          Iniciar meu treino!
        </Button>
      </div>
    </div>
  );
};

export default SummaryStep;
