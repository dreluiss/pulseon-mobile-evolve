
import { Brain, Smartphone, TrendingUp } from "lucide-react";

const SolutionSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-primary mb-4">
            Nossa Solução Inteligente
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transformamos anos de conhecimento em treinos personalizados com inteligência artificial
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Brain className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-poppins font-bold text-xl mb-2 text-gray-800">
                  IA Personalizada
                </h3>
                <p className="text-gray-600">
                  Nossa inteligência artificial analisa seu perfil, objetivos e disponibilidade 
                  para criar treinos únicos e eficazes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Smartphone className="text-secondary" size={24} />
              </div>
              <div>
                <h3 className="font-poppins font-bold text-xl mb-2 text-gray-800">
                  Acesso Ilimitado
                </h3>
                <p className="text-gray-600">
                  Seus treinos sempre disponíveis no celular. Treine em casa, academia, 
                  parque ou onde quiser.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-poppins font-bold text-xl mb-2 text-gray-800">
                  Evolução Contínua
                </h3>
                <p className="text-gray-600">
                  A IA adapta seus treinos conforme sua evolução, garantindo 
                  progressão constante e resultados duradouros.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-secondary/10 p-8 rounded-2xl">
            <div className="text-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Brain className="text-primary animate-pulse-gentle" size={48} />
              </div>
              <h3 className="font-poppins font-bold text-2xl mb-4 text-primary">
                Treinos Inteligentes
              </h3>
              <p className="text-gray-600 mb-6">
                Cada treino é único e criado especialmente para você, 
                considerando seus objetivos, nível e equipamentos disponíveis.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-3 rounded-lg shadow">
                  <div className="font-bold text-primary">100%</div>
                  <div className="text-gray-600">Personalizado</div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow">
                  <div className="font-bold text-secondary">24/7</div>
                  <div className="text-gray-600">Disponível</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
