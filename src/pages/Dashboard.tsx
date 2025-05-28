import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Clock, Target, Award, Calendar, Settings, User } from "lucide-react";
import Header from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const iconButtonClass = "bg-transparent p-2 rounded-full transition text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-gray-600";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
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
    <div className="min-h-screen bg-gray-50 dark:bg-black p-4">
      <Header
        actions={
          <>
            <Button className={iconButtonClass} size="icon" variant="ghost" aria-label="Ajustes">
              <Settings size={20} />
              <span className="sr-only">Ajustes</span>
            </Button>
            <Button 
              className={iconButtonClass} 
              size="icon" 
              variant="ghost" 
              aria-label="Perfil"
              onClick={() => navigate("/profile")}
            >
              <User size={20} />
              <span className="sr-only">Perfil</span>
            </Button>
          </>
        }
      />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-inter font-semibold text-gray-900 dark:text-white mb-2">
            Bem-vindo de volta{user?.email ? `, ${user.email.split('@')[0]}` : ''}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Seu treino personalizado está pronto. Vamos continuar sua jornada!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-6 text-center">
              <Target className="text-primary mx-auto mb-3" size={24} />
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{userStats.workoutsCompleted}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Treinos</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-6 text-center">
              <Award className="text-primary mx-auto mb-3" size={24} />
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{userStats.currentStreak}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sequência</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-6 text-center">
              <Clock className="text-primary mx-auto mb-3" size={24} />
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{userStats.totalHours}h</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-6 text-center">
              <Calendar className="text-primary mx-auto mb-3" size={24} />
              <p className="text-xs font-medium text-gray-900 dark:text-white">{userStats.nextGoal}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Próxima meta</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 mb-8">
          <CardHeader className="bg-primary text-white rounded-t-lg">
            <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-inter font-semibold">{currentWorkout.name}</h2>
                <p className="text-white/90 text-sm">{currentWorkout.type}</p>
              </div>
              <Play size={24} className="text-white" />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <div className="flex gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-primary" />
                  <span className="text-gray-900 dark:text-white">{currentWorkout.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target size={16} className="text-primary" />
                  <span className="text-gray-900 dark:text-white">{currentWorkout.difficulty}</span>
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-white font-medium w-full sm:w-auto">
                <Play size={16} className="mr-2" />
                Iniciar Treino
              </Button>
            </div>

            <div className="space-y-4">
              <h3 className="font-inter font-semibold text-lg text-gray-900 dark:text-white mb-4">
                Exercícios de hoje
              </h3>
              {currentWorkout.exercises.map((exercise, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{exercise.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{exercise.sets}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{exercise.weight}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Progresso Semanal</span>
                <span className="text-sm text-gray-900 dark:text-white">3/5 treinos</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="hover:shadow-md transition-shadow cursor-pointer bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
            <CardContent className="p-6 text-center">
              <Calendar className="text-primary mx-auto mb-3" size={32} />
              <h3 className="font-inter font-semibold text-lg mb-2 text-gray-900 dark:text-white">Histórico</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Veja seus treinos anteriores</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow cursor-pointer bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
            <CardContent className="p-6 text-center">
              <Settings className="text-primary mx-auto mb-3" size={32} />
              <h3 className="font-inter font-semibold text-lg mb-2 text-gray-900 dark:text-white">Configurar</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Ajuste seus objetivos</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
