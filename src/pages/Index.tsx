
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Dumbbell, Target, Users, Zap, Clock, Shield, Star, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-gray-900">
      <Header />
      
      {/* Hero Section */}
      <Hero />

      {/* Problem Section */}
      <ProblemSection />

      {/* Solution Section */}
      <SolutionSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Benefits Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-inter font-bold text-gray-900 dark:text-white mb-4">
              Por que escolher o PulseOn?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Transforme sua forma de treinar com tecnologia de ponta
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-8 w-8 text-primary" />,
                title: "Treinos Personalizados",
                description: "IA que adapta exercícios ao seu perfil, objetivos e limitações"
              },
              {
                icon: <Clock className="h-8 w-8 text-primary" />,
                title: "Economia de Tempo",
                description: "Sem necessidade de personal trainer ou planejamento manual"
              },
              {
                icon: <Target className="h-8 w-8 text-primary" />,
                title: "Resultados Garantidos",
                description: "Progressão científica baseada em dados e feedback contínuo"
              },
              {
                icon: <Shield className="h-8 w-8 text-primary" />,
                title: "Segurança Total",
                description: "Exercícios validados por profissionais de educação física"
              },
              {
                icon: <Users className="h-8 w-8 text-primary" />,
                title: "Para Todos os Níveis",
                description: "Do iniciante ao avançado, temos o treino ideal para você"
              },
              {
                icon: <Star className="h-8 w-8 text-primary" />,
                title: "Experiência Premium",
                description: "Interface intuitiva e suporte completo em português"
              }
            ].map((benefit, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <CardHeader>
                  <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-xl font-inter font-semibold text-gray-900 dark:text-white">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-inter font-bold text-gray-900 dark:text-white mb-4">
              Planos e Preços
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Escolha o plano ideal para sua jornada fitness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="relative border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-inter font-bold text-gray-900 dark:text-white">
                  Gratuito
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">R$ 0</span>
                  <span className="text-gray-600 dark:text-gray-400">/mês</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    "3 treinos por mês",
                    "Exercícios básicos",
                    "Suporte por email"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full border-gray-300 dark:border-gray-600"
                  onClick={handleGetStarted}
                >
                  Começar Grátis
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="relative border-primary shadow-lg scale-105 bg-white dark:bg-gray-800">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white">
                Mais Popular
              </Badge>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-inter font-bold text-gray-900 dark:text-white">
                  Pro
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">R$ 29</span>
                  <span className="text-gray-600 dark:text-gray-400">/mês</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    "Treinos ilimitados",
                    "IA avançada",
                    "Análises detalhadas",
                    "Suporte prioritário",
                    "Sem anúncios"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  onClick={handleGetStarted}
                >
                  Começar Agora
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="relative border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-inter font-bold text-gray-900 dark:text-white">
                  Premium
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">R$ 49</span>
                  <span className="text-gray-600 dark:text-gray-400">/mês</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    "Tudo do Pro",
                    "Coach virtual 24/7",
                    "Planos nutricionais",
                    "Consultoria mensal",
                    "Acesso antecipado"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full border-gray-300 dark:border-gray-600"
                  onClick={handleGetStarted}
                >
                  Escolher Premium
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-inter font-bold text-white mb-6">
            Pronto para transformar seus treinos?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já descobriram o poder da IA nos treinos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-primary hover:bg-gray-100"
              onClick={handleGetStarted}
            >
              Começar Agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={() => navigate("/auth")}
            >
              <Dumbbell className="mr-2 h-5 w-5" />
              Já tenho conta
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
