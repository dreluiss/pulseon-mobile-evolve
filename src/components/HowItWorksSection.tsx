import { UserPlus, ClipboardList, Dumbbell } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "1. Cadastro",
      description: "Crie sua conta em segundos e acesse nossa plataforma",
      color: "bg-primary/10 text-primary"
    },
    {
      icon: ClipboardList,
      title: "2. Triagem",
      description: "Responda algumas perguntas sobre seus objetivos e preferências",
      color: "bg-secondary/20 text-secondary"
    },
    {
      icon: Dumbbell,
      title: "3. Treino",
      description: "Receba seu treino personalizado e comece a evoluir",
      color: "bg-primary/10 text-primary"
    }
  ];

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-primary mb-4">
            Como Funciona
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Em apenas 3 passos simples você terá acesso aos melhores treinos personalizados
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection lines for desktop */}
            <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-primary"></div>
            
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center relative">
                  <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10 border-4 border-current`}>
                    <Icon size={32} />
                  </div>
                  
                  <div className="bg-card p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                    <h3 className="font-poppins font-bold text-xl mb-3 text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="bg-primary p-6 rounded-2xl text-primary-foreground max-w-md mx-auto">
            <h3 className="font-poppins font-bold text-xl mb-2">
              Pronto para começar?
            </h3>
            <p className="text-primary-foreground/90">
              Seu primeiro treino personalizado está a apenas alguns cliques de distância
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
