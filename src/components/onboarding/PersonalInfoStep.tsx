
import { Calendar, CalendarIcon, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PersonalInfoStepProps {
  data: {
    name: string;
    gender: string;
    birthDate: Date | undefined;
  };
  updateData: (field: string, value: any) => void;
  onNext: () => void;
}

const PersonalInfoStep = ({ data, updateData, onNext }: PersonalInfoStepProps) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = [
    { value: 0, label: "Janeiro" },
    { value: 1, label: "Fevereiro" },
    { value: 2, label: "Março" },
    { value: 3, label: "Abril" },
    { value: 4, label: "Maio" },
    { value: 5, label: "Junho" },
    { value: 6, label: "Julho" },
    { value: 7, label: "Agosto" },
    { value: 8, label: "Setembro" },
    { value: 9, label: "Outubro" },
    { value: 10, label: "Novembro" },
    { value: 11, label: "Dezembro" }
  ];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const selectedYear = data.birthDate?.getFullYear() || currentYear - 25;
  const selectedMonth = data.birthDate?.getMonth() || 0;
  const selectedDay = data.birthDate?.getDate() || 1;
  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleDateChange = (type: 'year' | 'month' | 'day', value: string) => {
    const year = type === 'year' ? parseInt(value) : selectedYear;
    const month = type === 'month' ? parseInt(value) : selectedMonth;
    const day = type === 'day' ? parseInt(value) : selectedDay;
    
    // Ajustar o dia se for inválido para o mês selecionado
    const maxDays = getDaysInMonth(year, month);
    const validDay = day > maxDays ? maxDays : day;
    
    const newDate = new Date(year, month, validDay);
    updateData('birthDate', newDate);
  };

  const canProceed = data.name.trim() && data.gender && data.birthDate;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <User className="mx-auto h-12 w-12 text-primary mb-4" />
        <p className="text-gray-600 dark:text-gray-400">
          Vamos começar com suas informações básicas
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-base font-medium text-gray-900 dark:text-white">
            Nome completo *
          </Label>
          <Input
            id="name"
            type="text"
            value={data.name}
            onChange={(e) => updateData('name', e.target.value)}
            placeholder="Seu nome completo"
            className="mt-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
          />
        </div>

        <div>
          <Label className="text-base font-medium text-gray-900 dark:text-white">
            Sexo *
          </Label>
          <Select value={data.gender} onValueChange={(value) => updateData('gender', value)}>
            <SelectTrigger className="mt-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
              <SelectValue placeholder="Selecione seu sexo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="masculino">Masculino</SelectItem>
              <SelectItem value="feminino">Feminino</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-base font-medium text-gray-900 dark:text-white">
            Data de nascimento *
          </Label>
          <div className="mt-2 grid grid-cols-3 gap-3">
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-400">Dia</Label>
              <Select value={selectedDay.toString()} onValueChange={(value) => handleDateChange('day', value)}>
                <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {days.map((day) => (
                    <SelectItem key={day} value={day.toString()}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-400">Mês</Label>
              <Select value={selectedMonth.toString()} onValueChange={(value) => handleDateChange('month', value)}>
                <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value.toString()}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-400">Ano</Label>
              <Select value={selectedYear.toString()} onValueChange={(value) => handleDateChange('year', value)}>
                <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-48">
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {data.birthDate && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Data selecionada: {data.birthDate.toLocaleDateString('pt-BR')}
            </p>
          )}
        </div>
      </div>

      <Button
        onClick={onNext}
        disabled={!canProceed}
        className="w-full bg-primary hover:bg-primary/90 text-white"
      >
        Continuar
      </Button>
    </div>
  );
};

export default PersonalInfoStep;
