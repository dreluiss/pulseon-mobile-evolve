
import { Button } from "@/components/ui/button";
import { CheckCircle, User, Target, Award, Calendar, MapPin, Dumbbell, AlertTriangle, Clock } from "lucide-react";
import { OnboardingData } from "@/pages/Onboarding";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface SummaryStepProps {
  data: OnboardingData;
  onPrev: () => void;
}

const SummaryStep = ({ data, onPrev }: SummaryStepProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

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

  const getFrequencyLabel = (frequency: string) => {
    const frequencies = {
      "2-3": "2-3 vezes por semana",
      "4-5": "4-5 vezes por semana",
      "6-7": "6-7 vezes por semana"
    };
    return frequencies[frequency as keyof typeof frequencies] || frequency;
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

  const getTimeFromFrequency = (frequency: string) => {
    // Mapear frequência para tempo médio baseado nas opções do onboarding
    const timeMap = {
      "2-3": "60", // 60 minutos para frequência baixa
      "4-5": "45", // 45 minutos para frequência média
      "6-7": "45"  // 45 minutos para frequência alta
    };
    return timeMap[frequency as keyof typeof timeMap] || "45";
  };

  const handleStartTraining = async () => {
    if (!user) {
      toast({
        title: "Erro de autenticação",
        description: "Usuário não encontrado. Faça login novamente.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Usar upsert para atualizar ou inserir dados do onboarding no perfil do usuário
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          objetivo: data.goal,
          nivel_experiencia: data.experience,
          frequencia_treino: data.frequency,
          restricoes: data.restrictions,
          tempo_disponivel: getTimeFromFrequency(data.frequency), // Tempo baseado na frequência
          preferencias_treino: getEquipmentLabels(data.equipment).join(', '), // Apenas equipamentos
          local_treino: data.location, // Campo separado para local
          data_onboarding: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Onboarding concluído!",
        description: "Seu perfil foi configurado com sucesso. Bem-vindo ao PulseOn!"
      });
      
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Erro ao salvar dados do onboarding:", error);
      toast({
        title: "Erro ao salvar dados",
        description: "Não foi possível salvar suas informações. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="text-primary" size={32} />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Perfeito! Vamos revisar suas informações
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Confirme se está tudo correto antes de criarmos seu treino personalizado
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <User className="text-primary" size={20} />
            <h4 className="font-poppins font-bold text-gray-900 dark:text-white">Informações Pessoais</h4>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <p><strong>Nome:</strong> {data.name}</p>
            <p><strong>Idade:</strong> {data.age} anos</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <Target className="text-primary" size={20} />
            <h4 className="font-poppins font-bold text-gray-900 dark:text-white">Objetivo</h4>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{getGoalLabel(data.goal)}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <Award className="text-primary" size={20} />
            <h4 className="font-poppins font-bold text-gray-900 dark:text-white">Experiência</h4>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{getExperienceLabel(data.experience)}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="text-primary" size={20} />
            <h4 className="font-poppins font-bold text-gray-900 dark:text-white">Frequência</h4>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{getFrequencyLabel(data.frequency)}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="text-primary" size={20} />
            <h4 className="font-poppins font-bold text-gray-900 dark:text-white">Tempo por Treino</h4>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{getTimeFromFrequency(data.frequency)} minutos</p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="text-primary" size={20} />
            <h4 className="font-poppins font-bold text-gray-900 dark:text-white">Local de Treino</h4>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{getLocationLabel(data.location)}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <Dumbbell className="text-primary" size={20} />
            <h4 className="font-poppins font-bold text-gray-900 dark:text-white">Equipamentos</h4>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {getEquipmentLabels(data.equipment).join(", ")}
          </div>
        </div>

        {data.restrictions && (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="text-primary" size={20} />
              <h4 className="font-poppins font-bold text-gray-900 dark:text-white">Restrições</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{data.restrictions}</p>
          </div>
        )}
      </div>

      <div className="bg-primary p-6 rounded-2xl text-white text-center">
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
          className="flex-1 border-gray-300 dark:border-gray-600"
          size="lg"
        >
          Voltar
        </Button>
        <Button 
          onClick={handleStartTraining}
          className="flex-1 bg-primary hover:opacity-90"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? "Configurando..." : "Iniciar meu treino!"}
        </Button>
      </div>
    </div>
  );
};

export default SummaryStep;
