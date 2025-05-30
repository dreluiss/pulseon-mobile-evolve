
import { useAuth } from "@/hooks/useAuth";
import { useUserName } from "@/hooks/useUserName";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Target, Calendar, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const { firstName, loading } = useUserName();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <Header />
      
      <div className="max-w-7xl mx-auto p-4 pt-8">
        <div className="mb-8">
          <h1 className="text-3xl font-inter font-bold text-gray-900 dark:text-white mb-2">
            {loading ? "Bem-vindo de volta!" : `Bem-vindo de volta, ${firstName}!`}
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
              <div className="text-2xl font-bold text-gray-900 dark:text-white">12</div>
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
              <div className="text-2xl font-bold text-gray-900 dark:text-white">8</div>
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
              <div className="text-2xl font-bold text-gray-900 dark:text-white">5 dias</div>
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
              <div className="text-2xl font-bold text-gray-900 dark:text-white">85%</div>
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
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Treino de Peito e Tríceps</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Hoje, 18:00</p>
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Iniciar
                  </Button>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p>Duração estimada: 45 minutos</p>
                  <p>8 exercícios • Nível intermediário</p>
                </div>
              </div>
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
                  <span className="font-medium text-gray-900 dark:text-white">42 min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Treinos esta semana</span>
                  <span className="font-medium text-gray-900 dark:text-white">4 de 5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Calorias queimadas</span>
                  <span className="font-medium text-gray-900 dark:text-white">1,240 kcal</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Exercícios favoritos</span>
                  <span className="font-medium text-gray-900 dark:text-white">Supino, Agachamento</span>
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
