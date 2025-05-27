
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
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="text-primary" size={32} />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">
          Você tem alguma restrição ou lesão?
        </h3>
        <p className="text-muted-foreground">
          Nos conte sobre qualquer limitação física para adaptarmos seus treinos
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 p-4 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-amber-600 dark:text-amber-400 mt-0.5" size={20} />
            <div>
              <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-1">Importante</h4>
              <p className="text-sm text-amber-700 dark:text-amber-300">
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
          className="min-h-[120px] resize-none"
        />

        <div className="text-sm text-muted-foreground">
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
          className="flex-1"
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
