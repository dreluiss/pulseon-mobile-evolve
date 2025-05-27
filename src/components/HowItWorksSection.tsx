
import { UserPlus, ClipboardList, Dumbbell } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "1. Cadastro",
      description: "Crie sua conta em segundos e acesse nossa plataforma",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: ClipboardList,
      title: "2. Triagem",
      description: "Responda algumas perguntas sobre seus objetivos e preferências",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Dumbbell,
      title: "3. Treino",
      description: "Receba seu treino personalizado e comece a evoluir",
      color: "bg-green-100 text-green-600"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-primary mb-4">
            Como Funciona
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Em apenas 3 passos simples você terá acesso aos melhores treinos personalizados
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection lines for desktop */}
            <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary to-secondary"></div>
            
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center relative">
                  <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10 bg-white border-4 border-current`}>
                    <Icon size={32} />
                  </div>
                  
                  <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                    <h3 className="font-poppins font-bold text-xl mb-3 text-gray-800">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-2xl text-white max-w-md mx-auto">
            <h3 className="font-poppins font-bold text-xl mb-2">
              Pronto para começar?
            </h3>
            <p className="text-white/90">
              Seu primeiro treino personalizado está a apenas alguns cliques de distância
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
