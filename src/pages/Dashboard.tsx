
import { useAuth } from "@/hooks/useAuth";
import { useUserName } from "@/hooks/useUserName";
import { useUserWorkouts } from "@/hooks/useUserWorkouts";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Target, Calendar, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const { firstName, loading: nameLoading } = useUserName();
  const { nextWorkout, stats, loading: workoutsLoading, workouts } = useUserWorkouts();

  console.log('Dashboard - workouts:', workouts);
  console.log('Dashboard - nextWorkout:', nextWorkout);
  console.log('Dashboard - loading:', workoutsLoading);

  const handleStartWorkout = () => {
    console.log('Iniciando treino:', nextWorkout?.name);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <Header />
      
      <div className="max-w-7xl mx-auto p-4 pt-8">
        <div className="mb-8">
          <h1 className="text-3xl font-inter font-bold text-gray-900 dark:text-white mb-2">
            {nameLoading ? "Bem-vindo de volta!" : `Bem-vindo de volta, ${firstName}!`}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Aqui está um resumo do seu progresso e próximos treinos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Treinos Concluídos
              </CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {workoutsLoading ? "..." : stats.completedWorkouts}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                +2 desde a semana passada
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Metas Atingidas
              </CardTitle>
              <Target className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {workoutsLoading ? "..." : stats.goalsAchieved}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                67% das metas semanais
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Sequência Atual
              </CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {workoutsLoading ? "..." : `${stats.currentStreak} dias`}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Continue assim!
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Progresso Semanal
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {workoutsLoading ? "..." : `${stats.weeklyProgress}%`}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                +12% desde a semana passada
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Próximo Treino</CardTitle>
            </CardHeader>
            <CardContent>
              {workoutsLoading ? (
                <div className="text-center text-gray-500 dark:text-gray-400">
                  Carregando treinos...
                </div>
              ) : nextWorkout ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {nextWorkout.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {nextWorkout.scheduled_date 
                          ? new Date(nextWorkout.scheduled_date).toLocaleDateString('pt-BR')
                          : 'Hoje'
                        }
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-primary hover:bg-primary/90"
                      onClick={handleStartWorkout}
                    >
                      Iniciar
                    </Button>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p>Duração estimada: {nextWorkout.estimated_duration || 45} minutos</p>
                    <p>
                      {nextWorkout.exercises?.length || 4} exercícios • 
                      Nível {nextWorkout.difficulty_level === 'intermediate' ? 'intermediário' : 
                             nextWorkout.difficulty_level === 'beginner' ? 'iniciante' : 
                             nextWorkout.difficulty_level || 'intermediário'}
                    </p>
                    {nextWorkout.description && (
                      <p className="mt-2 text-xs">{nextWorkout.description}</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400">
                  {workouts.length === 0 ? "Criando treinos..." : "Nenhum treino agendado"}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Estatísticas Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Tempo médio de treino</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {nextWorkout?.estimated_duration || 45} min
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Treinos disponíveis</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {workoutsLoading ? "..." : workouts.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Treinos esta semana</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {stats.completedWorkouts} de {workouts.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Próximo treino</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {nextWorkout?.workout_type || "Força"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
