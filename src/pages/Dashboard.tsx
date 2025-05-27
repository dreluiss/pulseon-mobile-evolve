import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { Play, Clock, Target, Award, Calendar, Settings, User } from "lucide-react";

const Dashboard = () => {
  const [currentWorkout] = useState({
    name: "Treino Personalizado - Dia 1",
    type: "Força + Cardio",
    duration: "45 min",
    difficulty: "Intermediário",
    exercises: [
      { name: "Agachamento", sets: "3x12", weight: "40kg" },
      { name: "Supino", sets: "3x10", weight: "60kg" },
      { name: "Remada", sets: "3x12", weight: "35kg" },
      { name: "Desenvolvimento", sets: "3x10", weight: "25kg" },
      { name: "Prancha", sets: "3x30s", weight: "Peso corporal" }
    ]
  });

  const userStats = {
    workoutsCompleted: 12,
    currentStreak: 5,
    totalHours: 18,
    nextGoal: "20 treinos"
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pt-4">
          <Logo size="md" />
          <div className="flex gap-3">
            <ThemeToggle />
            <Button variant="outline" size="sm" className="text-foreground border-border hover:bg-accent">
              <Settings size={16} className="mr-2" />
              Configurações
            </Button>
            <Button variant="outline" size="sm" className="text-foreground border-border hover:bg-accent">
              <User size={16} className="mr-2" />
              Perfil
            </Button>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-poppins font-bold text-primary mb-2">
            Bem-vindo de volta!
          </h1>
          <p className="text-muted-foreground">
            Seu treino personalizado está pronto. Vamos continuar sua jornada!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <Target className="text-primary mx-auto mb-2" size={24} />
              <p className="text-2xl font-bold text-primary">{userStats.workoutsCompleted}</p>
              <p className="text-sm text-muted-foreground">Treinos</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <Award className="text-secondary mx-auto mb-2" size={24} />
              <p className="text-2xl font-bold text-primary">{userStats.currentStreak}</p>
              <p className="text-sm text-muted-foreground">Sequência</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <Clock className="text-primary mx-auto mb-2" size={24} />
              <p className="text-2xl font-bold text-primary">{userStats.totalHours}h</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <Calendar className="text-secondary mx-auto mb-2" size={24} />
              <p className="text-xs font-medium text-primary">{userStats.nextGoal}</p>
              <p className="text-sm text-muted-foreground">Próxima meta</p>
            </CardContent>
          </Card>
        </div>

        {/* Current Workout */}
        <Card className="shadow-xl border-0 bg-card mb-8">
          <CardHeader className="bg-primary text-white rounded-t-lg">
            <CardTitle className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-poppins">{currentWorkout.name}</h2>
                <p className="text-white/90 text-sm">{currentWorkout.type}</p>
              </div>
              <Play size={24} className="text-white" />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-primary" />
                  <span className="text-foreground">{currentWorkout.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target size={16} className="text-primary" />
                  <span className="text-foreground">{currentWorkout.difficulty}</span>
                </div>
              </div>
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Play size={16} className="mr-2" />
                Iniciar Treino
              </Button>
            </div>

            <div className="space-y-4">
              <h3 className="font-poppins font-bold text-lg text-primary mb-4">
                Exercícios de hoje:
              </h3>
              
              {currentWorkout.exercises.map((exercise, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-accent rounded-xl">
                  <div>
                    <p className="font-medium text-primary">{exercise.name}</p>
                    <p className="text-sm text-muted-foreground">{exercise.sets}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-primary">{exercise.weight}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-primary/10 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-primary">Progresso Semanal</span>
                <span className="text-sm text-primary">3/5 treinos</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-card border-border">
            <CardContent className="p-6 text-center">
              <Calendar className="text-primary mx-auto mb-3" size={32} />
              <h3 className="font-poppins font-bold text-lg mb-2 text-foreground">Histórico</h3>
              <p className="text-muted-foreground text-sm">Veja seus treinos anteriores</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-card border-border">
            <CardContent className="p-6 text-center">
              <Settings className="text-primary mx-auto mb-3" size={32} />
              <h3 className="font-poppins font-bold text-lg mb-2 text-foreground">Configurar</h3>
              <p className="text-muted-foreground text-sm">Ajuste seus objetivos</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
