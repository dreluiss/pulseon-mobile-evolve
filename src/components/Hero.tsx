
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, Zap, Target } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-secondary/30 py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <div className="p-4 bg-white rounded-full shadow-sm border border-gray-100">
            <Activity size={48} className="text-primary" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-inter font-bold text-primary mb-4 animate-fade-in">
          <span>Pulse</span><span className="text-accent">On</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-neutral-dark mb-8 animate-fade-in font-medium">
          Ative seu treino. Evolua com inteligência.
        </p>
        
        <p className="text-lg text-neutral-secondary mb-12 max-w-2xl mx-auto animate-fade-in">
          Treinos personalizados gerados por IA, adaptados ao seu perfil e objetivos. 
          Sem precisar de personal trainer, sem criar treinos manualmente.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in">
          <Link to="/signup">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-medium">
              <Zap className="mr-2" size={20} />
              Começar Agora
            </Button>
          </Link>
          
          <Link to="/login">
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 text-lg font-medium">
              <Target className="mr-2" size={20} />
              Já tenho conta
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Activity className="text-primary" size={24} />
            </div>
            <h3 className="font-inter font-semibold text-lg mb-3 text-neutral-dark">IA Personalizada</h3>
            <p className="text-neutral-secondary">Treinos únicos baseados no seu perfil e objetivos</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Zap className="text-primary" size={24} />
            </div>
            <h3 className="font-inter font-semibold text-lg mb-3 text-neutral-dark">Acesso Total</h3>
            <p className="text-neutral-secondary">Treine em casa, academia ou onde quiser</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Target className="text-primary" size={24} />
            </div>
            <h3 className="font-inter font-semibold text-lg mb-3 text-neutral-dark">Sem Complicação</h3>
            <p className="text-neutral-secondary">Não precisa criar treinos ou contratar personal</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
