
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import PersonalInfoStep from "@/components/onboarding/PersonalInfoStep";
import GoalStep from "@/components/onboarding/GoalStep";
import ExperienceStep from "@/components/onboarding/ExperienceStep";
import FrequencyStep from "@/components/onboarding/FrequencyStep";
import LocationStep from "@/components/onboarding/LocationStep";
import EquipmentStep from "@/components/onboarding/EquipmentStep";
import RestrictionsStep from "@/components/onboarding/RestrictionsStep";
import SummaryStep from "@/components/onboarding/SummaryStep";

export interface OnboardingData {
  name: string;
  age: string;
  goal: string;
  experience: string;
  frequency: string;
  location: string;
  equipment: string[];
  restrictions: string;
}

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    name: "",
    age: "",
    goal: "",
    experience: "",
    frequency: "",
    location: "",
    equipment: [],
    restrictions: ""
  });

  const totalSteps = 8;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const stepTitles = [
    "Informações Pessoais",
    "Objetivo do Treino",
    "Nível de Experiência",
    "Frequência Semanal",
    "Local de Treino",
    "Equipamentos",
    "Restrições",
    "Resumo"
  ];

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep data={data} updateData={updateData} onNext={nextStep} />;
      case 1:
        return <GoalStep data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} />;
      case 2:
        return <ExperienceStep data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} />;
      case 3:
        return <FrequencyStep data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} />;
      case 4:
        return <LocationStep data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} />;
      case 5:
        return <EquipmentStep data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} />;
      case 6:
        return <RestrictionsStep data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} />;
      case 7:
        return <SummaryStep data={data} onPrev={prevStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 pt-8">
          <Logo size="lg" className="justify-center mb-4" />
          <h1 className="text-2xl font-poppins font-bold text-primary mb-2">
            Vamos personalizar seu treino!
          </h1>
          <p className="text-muted-foreground">
            Responda algumas perguntas para criarmos o treino perfeito para você
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">
              Passo {currentStep + 1} de {totalSteps}
            </span>
            <span className="text-sm font-medium text-foreground">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="shadow-xl border-0 bg-card min-h-[500px]">
          <CardHeader>
            <CardTitle className="text-xl font-poppins text-center text-primary">
              {stepTitles[currentStep]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderStep()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
