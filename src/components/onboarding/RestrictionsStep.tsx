
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle } from "lucide-react";
import { OnboardingData } from "@/pages/Onboarding";

interface RestrictionsStepProps {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const RestrictionsStep = ({ data, updateData, onNext, onPrev }: RestrictionsStepProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="text-primary" size={32} />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Você tem alguma restrição ou lesão?
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Nos conte sobre qualquer limitação física para adaptarmos seus treinos
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-primary/10 border border-primary p-4 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-primary mt-0.5" size={20} />
            <div>
              <h4 className="font-medium text-primary mb-1">Importante</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Se você tem problemas de saúde ou lesões sérias, consulte um médico 
                antes de iniciar qualquer programa de exercícios.
              </p>
            </div>
          </div>
        </div>

        <Textarea
          placeholder="Descreva qualquer lesão, dor ou limitação física que você tenha. Por exemplo: dor no joelho direito, problema nas costas, cirurgia recente, etc. Se não tiver nenhuma restrição, pode deixar em branco."
          value={data.restrictions}
          onChange={(e) => updateData("restrictions", e.target.value)}
          className="min-h-[120px] resize-none bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
        />

        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p>
            <strong>Exemplos comuns:</strong> Dor no joelho, lombalgia, tendinite no ombro, 
            problemas no punho, limitações de mobilidade, etc.
          </p>
        </div>
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
        <Button 
          onClick={onNext}
          className="flex-1 bg-primary hover:bg-primary/90"
          size="lg"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default RestrictionsStep;
