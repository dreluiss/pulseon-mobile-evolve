
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Save, LogOut, Shield, Edit3 } from "lucide-react";
import Header from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  objetivo: string;
  nivel_experiencia: string;
  frequencia_treino: string;
  restricoes: string;
  tempo_disponivel: string;
  preferencias_treino: string;
  data_onboarding: string;
}

const Profile = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState<UserProfile>({
    objetivo: "",
    nivel_experiencia: "",
    frequencia_treino: "",
    restricoes: "",
    tempo_disponivel: "",
    preferencias_treino: "",
    data_onboarding: ""
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile({
          objetivo: data.objetivo || "",
          nivel_experiencia: data.nivel_experiencia || "",
          frequencia_treino: data.frequencia_treino || "",
          restricoes: data.restricoes || "",
          tempo_disponivel: data.tempo_disponivel || "",
          preferencias_treino: data.preferencias_treino || "",
          data_onboarding: data.data_onboarding || ""
        });
      }
    } catch (error: any) {
      console.error('Erro ao buscar perfil:', error);
      toast({
        title: "Erro ao carregar perfil",
        description: "Não foi possível carregar as informações do perfil",
        variant: "destructive"
      });
    }
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    
    try {
      // Usar upsert para garantir que não haja conflito de chave única
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user?.id,
          objetivo: profile.objetivo,
          nivel_experiencia: profile.nivel_experiencia,
          frequencia_treino: profile.frequencia_treino,
          restricoes: profile.restricoes,
          tempo_disponivel: profile.tempo_disponivel,
          preferencias_treino: profile.preferencias_treino,
          data_onboarding: profile.data_onboarding || new Date().toISOString(),
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      toast({
        title: "Perfil atualizado!",
        description: "Suas informações foram salvas com sucesso"
      });
      setIsEditing(false);
    } catch (error: any) {
      console.error('Erro ao salvar perfil:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso"
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Erro no logout",
        description: "Ocorreu um erro ao fazer logout",
        variant: "destructive"
      });
    }
  };

  const getGoalLabel = (goal: string) => {
    const goals: { [key: string]: string } = {
      mass: "Ganho de Massa",
      weight_loss: "Emagrecimento",
      conditioning: "Condicionamento",
      health: "Saúde Geral"
    };
    return goals[goal] || goal;
  };

  const getExperienceLabel = (experience: string) => {
    const levels: { [key: string]: string } = {
      beginner: "Iniciante",
      intermediate: "Intermediário",
      advanced: "Avançado"
    };
    return levels[experience] || experience;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <Header />
      
      <div className="max-w-4xl mx-auto p-4 pt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-inter font-semibold text-gray-900 dark:text-white mb-2">
            Meu Perfil
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie suas informações pessoais e preferências de treino
          </p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Perfil e Treino</TabsTrigger>
            <TabsTrigger value="security">Segurança</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="text-primary" size={24} />
                  <div>
                    <CardTitle className="text-gray-900 dark:text-white">Informações Pessoais</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Dados básicos da sua conta
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-900 dark:text-white">Email</Label>
                    <Input 
                      value={user?.email || ""} 
                      disabled 
                      className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-900 dark:text-white">Data de cadastro</Label>
                    <Input 
                      value={user?.created_at ? new Date(user.created_at).toLocaleDateString('pt-BR') : ""} 
                      disabled 
                      className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-gray-900 dark:text-white">Preferências de Treino</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Suas configurações personalizadas
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="border-gray-300 dark:border-gray-600"
                >
                  <Edit3 size={16} className="mr-2" />
                  {isEditing ? "Cancelar" : "Editar"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-gray-900 dark:text-white">Objetivo Principal</Label>
                    {isEditing ? (
                      <select
                        value={profile.objetivo}
                        onChange={(e) => setProfile({...profile, objetivo: e.target.value})}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option value="">Selecione um objetivo</option>
                        <option value="mass">Ganho de Massa</option>
                        <option value="weight_loss">Emagrecimento</option>
                        <option value="conditioning">Condicionamento</option>
                        <option value="health">Saúde Geral</option>
                      </select>
                    ) : (
                      <p className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md text-gray-900 dark:text-white">
                        {getGoalLabel(profile.objetivo) || "Não informado"}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-900 dark:text-white">Nível de Experiência</Label>
                    {isEditing ? (
                      <select
                        value={profile.nivel_experiencia}
                        onChange={(e) => setProfile({...profile, nivel_experiencia: e.target.value})}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option value="">Selecione o nível</option>
                        <option value="beginner">Iniciante</option>
                        <option value="intermediate">Intermediário</option>
                        <option value="advanced">Avançado</option>
                      </select>
                    ) : (
                      <p className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md text-gray-900 dark:text-white">
                        {getExperienceLabel(profile.nivel_experiencia) || "Não informado"}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-900 dark:text-white">Frequência de Treino</Label>
                    {isEditing ? (
                      <Input
                        value={profile.frequencia_treino}
                        onChange={(e) => setProfile({...profile, frequencia_treino: e.target.value})}
                        placeholder="Ex: 3 vezes por semana"
                        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <p className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md text-gray-900 dark:text-white">
                        {profile.frequencia_treino || "Não informado"}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-900 dark:text-white">Tempo Disponível</Label>
                    {isEditing ? (
                      <Input
                        value={profile.tempo_disponivel}
                        onChange={(e) => setProfile({...profile, tempo_disponivel: e.target.value})}
                        placeholder="Ex: 45 minutos"
                        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <p className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md text-gray-900 dark:text-white">
                        {profile.tempo_disponivel || "Não informado"}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-900 dark:text-white">Restrições ou Lesões</Label>
                  {isEditing ? (
                    <Textarea
                      value={profile.restricoes}
                      onChange={(e) => setProfile({...profile, restricoes: e.target.value})}
                      placeholder="Descreva qualquer restrição física ou lesão"
                      className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md text-gray-900 dark:text-white min-h-[60px]">
                      {profile.restricoes || "Nenhuma restrição informada"}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-900 dark:text-white">Preferências de Treino</Label>
                  {isEditing ? (
                    <Textarea
                      value={profile.preferencias_treino}
                      onChange={(e) => setProfile({...profile, preferencias_treino: e.target.value})}
                      placeholder="Descreva suas preferências, exercícios favoritos, etc."
                      className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md text-gray-900 dark:text-white min-h-[60px]">
                      {profile.preferencias_treino || "Nenhuma preferência específica"}
                    </p>
                  )}
                </div>

                {isEditing && (
                  <div className="flex gap-4 pt-4">
                    <Button 
                      onClick={handleSaveProfile}
                      disabled={isLoading}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Save size={16} className="mr-2" />
                      {isLoading ? "Salvando..." : "Salvar Alterações"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="text-primary" size={24} />
                  <div>
                    <CardTitle className="text-gray-900 dark:text-white">Configurações de Segurança</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Gerencie a segurança da sua conta
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Alterar Senha</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Para alterar sua senha, você receberá um link por email
                    </p>
                    <Button 
                      variant="outline"
                      className="border-gray-300 dark:border-gray-600"
                      onClick={() => {
                        // Implementar reset de senha
                        toast({
                          title: "Em desenvolvimento",
                          description: "Esta funcionalidade será implementada em breve"
                        });
                      }}
                    >
                      Enviar link para alterar senha
                    </Button>
                  </div>

                  <Separator />

                  <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/20">
                    <h3 className="font-medium text-red-900 dark:text-red-300 mb-2">Sair da conta</h3>
                    <p className="text-sm text-red-700 dark:text-red-400 mb-4">
                      Você será desconectado e redirecionado para a página inicial
                    </p>
                    <Button 
                      variant="destructive"
                      onClick={handleLogout}
                    >
                      <LogOut size={16} className="mr-2" />
                      Sair da conta
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
