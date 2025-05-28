
import { Button } from "@/components/ui/button";
import { Activity, Zap, Target } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero-section py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-primary/10 dark:bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Activity className="text-primary dark:text-accent" size={40} />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            <span className="text-primary dark:text-white">Pulse</span>
            <span className="text-primary dark:text-accent">On</span>
          </h1>
          <p className="text-xl md:text-2xl font-medium mb-4 text-foreground">
            Ative seu treino. Evolua com inteligência.
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Treinos personalizados gerados por IA, adaptados ao seu perfil e objetivos.
            <br />
            Sem precisar de personal trainer, sem criar treinos manualmente.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button asChild size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-white">
            <Link to="/signup">
              <Zap className="mr-2" size={20} />
              Começar Agora
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary/5 dark:border-accent dark:text-accent dark:hover:bg-accent/10">
            <Link to="/login">
              <Target className="mr-2" size={20} />
              Já tenho conta
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
            <div className="w-12 h-12 bg-primary/10 dark:bg-accent/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Activity className="text-primary dark:text-accent" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-card-foreground">IA Personalizada</h3>
            <p className="text-muted-foreground">
              Treinos únicos baseados no seu perfil e objetivos
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
            <div className="w-12 h-12 bg-primary/10 dark:bg-accent/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Zap className="text-primary dark:text-accent" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-card-foreground">Acesso Total</h3>
            <p className="text-muted-foreground">
              Treine em casa, academia ou onde quiser
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
            <div className="w-12 h-12 bg-primary/10 dark:bg-accent/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Target className="text-primary dark:text-accent" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-card-foreground">Sem Complicação</h3>
            <p className="text-muted-foreground">
              Não precisa criar treinos ou contratar personal
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
