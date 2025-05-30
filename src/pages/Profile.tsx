import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, differenceInYears } from "date-fns";
import { ptBR } from "date-fns/locale";
import { User, Save, LogOut, Shield, Edit3, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import AvatarUpload from "@/components/AvatarUpload";
import { useAuth } from "@/hooks/useAuth";
import { useUserProfile } from "@/hooks/useUserProfile";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  nome_completo: string;
  sexo: string;
  data_nascimento: Date | null;
  objetivo: string;
  nivel_experiencia: string;
  frequencia_treino: string;
  restricoes: string;
  tempo_disponivel: string;
  preferencias_treino: string;
  local_treino: string;
  data_onboarding: string;
}

const Profile = () => {
  const { user, signOut } = useAuth();
  const { profile, setProfile, loading } = useUserProfile();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  // Buscar avatar do usuário
  useEffect(() => {
    const fetchAvatar = async () => {
      if (!user) return;

      try {
        const { data } = await supabase
          .from('user_avatars')
          .select('avatar_url')
          .eq('user_id', user.id)
          .single();

        if (data?.avatar_url) {
          setAvatarUrl(data.avatar_url);
        }
      } catch (error) {
        console.log('Nenhum avatar encontrado');
      }
    };

    fetchAvatar();
  }, [user]);

  const handleSaveProfile = async () => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user?.id,
          nome_completo: profile.nome_completo,
          sexo: profile.sexo,
          data_nascimento: profile.data_nascimento?.toISOString().split('T')[0],
          objetivo: profile.objetivo,
          nivel_experiencia: profile.nivel_experiencia,
          frequencia_treino: profile.frequencia_treino,
          restricoes: profile.restricoes,
          tempo_disponivel: profile.tempo_disponivel,
          preferencias_treino: profile.preferencias_treino,
          local_treino: profile.local_treino,
          data_onboarding: profile.data_onboarding || new Date().toISOString(),
          updated_at: new Date().toISOString()
        } as any, {
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

  const handleGoBack = () => {
    window.history.length > 1 ? navigate(-1) : navigate("/dashboard");
  };

  const calculateAge = (birthDate: Date | null) => {
    if (!birthDate) return "Não informado";
    return `${differenceInYears(new Date(), birthDate)} anos`;
  };

  const handleDateChange = (type: 'year' | 'month' | 'day', value: string) => {
    const currentDate = profile.data_nascimento || new Date();
    const year = type === 'year' ? parseInt(value) : currentDate.getFullYear();
    const month = type === 'month' ? parseInt(value) : currentDate.getMonth();
    const day = type === 'day' ? parseInt(value) : currentDate.getDate();
    
    const newDate = new Date(year, month, day);
    setProfile({...profile, data_nascimento: newDate});
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

  const getFrequencyLabel = (frequency: string) => {
    const frequencies: { [key: string]: string } = {
      "2-3": "2-3 vezes por semana",
      "4-5": "4-5 vezes por semana", 
      "6-7": "6-7 vezes por semana"
    };
    return frequencies[frequency] || frequency;
  };

  const getTimeLabel = (time: string) => {
    const times: { [key: string]: string } = {
      "30": "30 minutos",
      "45": "45 minutos",
      "60": "60 minutos",
      "75": "75 minutos",
      "90": "90 minutos"
    };
    return times[time] || `${time} minutos`;
  };

  const getLocationLabel = (location: string) => {
    const locations: { [key: string]: string } = {
      gym: "Academia Completa",
      home: "Em Casa",
      park: "Parque/Rua",
      condo: "Academia do Condomínio"
    };
    return locations[location] || location;
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = [
    { value: 0, label: "Janeiro" }, { value: 1, label: "Fevereiro" }, { value: 2, label: "Março" },
    { value: 3, label: "Abril" }, { value: 4, label: "Maio" }, { value: 5, label: "Junho" },
    { value: 6, label: "Julho" }, { value: 7, label: "Agosto" }, { value: 8, label: "Setembro" },
    { value: 9, label: "Outubro" }, { value: 10, label: "Novembro" }, { value: 11, label: "Dezembro" }
  ];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const selectedYear = profile.data_nascimento?.getFullYear() || currentYear - 25;
  const selectedMonth = profile.data_nascimento?.getMonth() || 0;
  const selectedDay = profile.data_nascimento?.getDate() || 1;
  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <Header actions={
        <Button
          variant="ghost"
          size="sm"
          onClick={handleGoBack}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <ArrowLeft size={16} className="mr-2" />
          Voltar
        </Button>
      } />
      
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
                <div className="flex justify-center">
                  <AvatarUpload
                    currentAvatarUrl={avatarUrl}
                    onAvatarUpdate={setAvatarUrl}
                    isEditing={isEditing}
                    userName={profile.nome_completo}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-900 dark:text-white">Nome completo</Label>
                    {isEditing ? (
                      <Input
                        value={profile.nome_completo}
                        onChange={(e) => setProfile({...profile, nome_completo: e.target.value})}
                        placeholder="Seu nome completo"
                        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <Input 
                        value={profile.nome_completo || "Não informado"} 
                        disabled 
                        className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    )}
                  </div>
                  <div>
                    <Label className="text-gray-900 dark:text-white">Email</Label>
                    <Input 
                      value={user?.email || ""} 
                      disabled 
                      className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-900 dark:text-white">Sexo</Label>
                    {isEditing ? (
                      <Select value={profile.sexo} onValueChange={(value) => setProfile({...profile, sexo: value})}>
                        <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="masculino">Masculino</SelectItem>
                          <SelectItem value="feminino">Feminino</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input 
                        value={profile.sexo ? (profile.sexo === 'masculino' ? 'Masculino' : 'Feminino') : "Não informado"} 
                        disabled 
                        className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    )}
                  </div>
                  <div>
                    <Label className="text-gray-900 dark:text-white">Data de nascimento</Label>
                    {isEditing ? (
                      <div className="grid grid-cols-3 gap-2">
                        <Select value={selectedDay.toString()} onValueChange={(value) => handleDateChange('day', value)}>
                          <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {days.map((day) => (
                              <SelectItem key={day} value={day.toString()}>{day}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select value={selectedMonth.toString()} onValueChange={(value) => handleDateChange('month', value)}>
                          <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {months.map((month) => (
                              <SelectItem key={month.value} value={month.value.toString()}>{month.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select value={selectedYear.toString()} onValueChange={(value) => handleDateChange('year', value)}>
                          <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="max-h-48">
                            {years.map((year) => (
                              <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ) : (
                      <Input 
                        value={profile.data_nascimento ? format(profile.data_nascimento, "dd/MM/yyyy", { locale: ptBR }) : "Não informado"} 
                        disabled 
                        className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    )}
                  </div>
                  <div>
                    <Label className="text-gray-900 dark:text-white">Idade</Label>
                    <Input 
                      value={calculateAge(profile.data_nascimento)} 
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
                      <select
                        value={profile.frequencia_treino}
                        onChange={(e) => setProfile({...profile, frequencia_treino: e.target.value})}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option value="">Selecione a frequência</option>
                        <option value="2-3">2-3 vezes por semana</option>
                        <option value="4-5">4-5 vezes por semana</option>
                        <option value="6-7">6-7 vezes por semana</option>
                      </select>
                    ) : (
                      <p className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md text-gray-900 dark:text-white">
                        {getFrequencyLabel(profile.frequencia_treino) || "Não informado"}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-900 dark:text-white">Tempo Disponível</Label>
                    {isEditing ? (
                      <select
                        value={profile.tempo_disponivel}
                        onChange={(e) => setProfile({...profile, tempo_disponivel: e.target.value})}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option value="">Selecione o tempo</option>
                        <option value="30">30 minutos</option>
                        <option value="45">45 minutos</option>
                        <option value="60">60 minutos</option>
                        <option value="75">75 minutos</option>
                        <option value="90">90 minutos</option>
                      </select>
                    ) : (
                      <p className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md text-gray-900 dark:text-white">
                        {getTimeLabel(profile.tempo_disponivel) || "Não informado"}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-900 dark:text-white">Local de Treino</Label>
                    {isEditing ? (
                      <select
                        value={profile.local_treino}
                        onChange={(e) => setProfile({...profile, local_treino: e.target.value})}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option value="">Selecione o local</option>
                        <option value="gym">Academia Completa</option>
                        <option value="home">Em Casa</option>
                        <option value="park">Parque/Rua</option>
                        <option value="condo">Academia do Condomínio</option>
                      </select>
                    ) : (
                      <p className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md text-gray-900 dark:text-white">
                        {getLocationLabel(profile.local_treino) || "Não informado"}
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
                  <Label className="text-gray-900 dark:text-white">Equipamentos Disponíveis</Label>
                  {isEditing ? (
                    <Textarea
                      value={profile.preferencias_treino}
                      onChange={(e) => setProfile({...profile, preferencias_treino: e.target.value})}
                      placeholder="Descreva seus equipamentos disponíveis"
                      className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md text-gray-900 dark:text-white min-h-[60px]">
                      {profile.preferencias_treino || "Nenhum equipamento informado"}
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
