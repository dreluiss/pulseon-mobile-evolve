
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { User, Calendar as CalendarIcon, UserCheck } from "lucide-react";
import { OnboardingData } from "@/pages/Onboarding";

interface PersonalInfoStepProps {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: any) => void;
  onNext: () => void;
}

const PersonalInfoStep = ({ data, updateData, onNext }: PersonalInfoStepProps) => {
  const [errors, setErrors] = useState<{ 
    name?: string; 
    age?: string; 
    gender?: string; 
    birthDate?: string; 
  }>({});
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleNext = () => {
    const newErrors: { 
      name?: string; 
      age?: string; 
      gender?: string; 
      birthDate?: string; 
    } = {};
    
    if (!data.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }
    
    if (!data.age) {
      newErrors.age = "Idade é obrigatória";
    } else if (parseInt(data.age) < 16 || parseInt(data.age) > 100) {
      newErrors.age = "Idade deve estar entre 16 e 100 anos";
    }

    if (!data.gender) {
      newErrors.gender = "Sexo é obrigatório";
    }

    if (!data.birthDate) {
      newErrors.birthDate = "Data de nascimento é obrigatória";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      updateData("birthDate", date);
      setIsCalendarOpen(false);
      
      // Calcular idade automaticamente
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      const monthDiff = today.getMonth() - date.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
        updateData("age", (age - 1).toString());
      } else {
        updateData("age", age.toString());
      }
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
          <User className="text-primary" size={32} />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Vamos nos conhecer melhor
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Precisamos de algumas informações básicas para personalizar seu treino
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-900 dark:text-white font-medium">Nome completo</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              id="name"
              placeholder="Como podemos te chamar?"
              value={data.name}
              onChange={(e) => updateData("name", e.target.value)}
              className={`pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-primary focus:ring-primary/20 ${errors.name ? 'border-red-400' : ''}`}
            />
          </div>
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender" className="text-gray-900 dark:text-white font-medium">Sexo</Label>
          <div className="relative">
            <UserCheck className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <select
              id="gender"
              value={data.gender || ""}
              onChange={(e) => updateData("gender", e.target.value)}
              className={`w-full pl-10 pr-3 py-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-primary focus:ring-primary/20 ${errors.gender ? 'border-red-400' : ''}`}
            >
              <option value="">Selecione seu sexo</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
            </select>
          </div>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthDate" className="text-gray-900 dark:text-white font-medium">Data de nascimento</Label>
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 ${errors.birthDate ? 'border-red-400' : ''}`}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                {data.birthDate ? (
                  format(data.birthDate, "dd/MM/yyyy", { locale: ptBR })
                ) : (
                  <span className="text-gray-500 dark:text-gray-400">Selecione sua data de nascimento</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={data.birthDate}
                onSelect={handleDateSelect}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
                locale={ptBR}
              />
            </PopoverContent>
          </Popover>
          {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="age" className="text-gray-900 dark:text-white font-medium">Idade</Label>
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              id="age"
              type="number"
              placeholder="Quantos anos você tem?"
              value={data.age}
              onChange={(e) => updateData("age", e.target.value)}
              className={`pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-primary focus:ring-primary/20 ${errors.age ? 'border-red-400' : ''}`}
              min="16"
              max="100"
            />
          </div>
          {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
        </div>
      </div>

      <div className="pt-6">
        <Button 
          onClick={handleNext}
          className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3"
          size="lg"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
