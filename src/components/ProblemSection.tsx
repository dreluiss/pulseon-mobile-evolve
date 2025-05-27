import { AlertTriangle, Clock, DollarSign } from "lucide-react";

const ProblemSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-[#00292D]">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-primary mb-4 dark:text-[#EAE6DA]">
            Você já passou por isso?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sabemos como é difícil manter a consistência nos treinos sem orientação adequada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-[#07343A] p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow dark:text-[#EAE6DA]">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <AlertTriangle className="text-red-500" size={32} />
            </div>
            <h3 className="font-poppins font-bold text-xl mb-4 text-gray-800 dark:text-[#EAE6DA]">
              Falta de Orientação
            </h3>
            <p className="text-gray-600 dark:text-[#EAE6DA]">
              Não sabe quais exercícios fazer, quantas séries ou como progredir nos treinos
            </p>
          </div>

          <div className="bg-white dark:bg-[#07343A] p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow dark:text-[#EAE6DA]">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Clock className="text-orange-500" size={32} />
            </div>
            <h3 className="font-poppins font-bold text-xl mb-4 text-gray-800 dark:text-[#EAE6DA]">
              Perda de Tempo
            </h3>
            <p className="text-gray-600 dark:text-[#EAE6DA]">
              Horas pesquisando treinos na internet sem saber se são adequados para você
            </p>
          </div>

          <div className="bg-white dark:bg-[#07343A] p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow dark:text-[#EAE6DA]">
            <div className="w-16 h-16 bg-secondary/40 rounded-full flex items-center justify-center mb-6 mx-auto">
              <DollarSign className="text-secondary" size={32} />
            </div>
            <h3 className="font-poppins font-bold text-xl mb-4 text-gray-800 dark:text-[#EAE6DA]">
              Investimento Alto
            </h3>
            <p className="text-gray-600 dark:text-[#EAE6DA]">
              Gastos com academias, equipamentos ou personal trainers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
