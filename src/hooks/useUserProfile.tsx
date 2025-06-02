
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  email: string;
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

export const useUserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({
    email: "",
    nome_completo: "",
    sexo: "",
    data_nascimento: null,
    objetivo: "",
    nivel_experiencia: "",
    frequencia_treino: "",
    restricoes: "",
    tempo_disponivel: "",
    preferencias_treino: "",
    local_treino: "",
    data_onboarding: ""
  });
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    console.log('Fetching profile for user:', user.id);

    try {
      // Buscar dados do perfil do usuário
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      console.log('Profile data from database:', data);
      console.log('Profile fetch error:', error);

      // Sempre incluir o email do usuário autenticado
      const profileData = {
        email: user.email || "",
        nome_completo: data?.nome_completo || "",
        sexo: data?.sexo || "",
        data_nascimento: data?.data_nascimento ? new Date(data.data_nascimento) : null,
        objetivo: data?.objetivo || "",
        nivel_experiencia: data?.nivel_experiencia || "",
        frequencia_treino: data?.frequencia_treino || "",
        restricoes: data?.restricoes || "",
        tempo_disponivel: data?.tempo_disponivel || "",
        preferencias_treino: data?.preferencias_treino || "",
        local_treino: data?.local_treino || "",
        data_onboarding: data?.data_onboarding || ""
      };

      console.log('Processed profile data:', profileData);
      setProfile(profileData);

      // Se não existe perfil, criar um básico
      if (error && error.code === 'PGRST116') {
        console.log('Creating basic profile for user');
        const basicProfile = {
          user_id: user.id,
          nome_completo: "",
          sexo: "",
          data_nascimento: null,
          objetivo: "",
          nivel_experiencia: "",
          frequencia_treino: "",
          restricoes: "",
          tempo_disponivel: "",
          preferencias_treino: "",
          local_treino: "",
          data_onboarding: new Date().toISOString()
        };

        const { error: insertError } = await supabase
          .from('user_profiles')
          .insert(basicProfile);

        if (insertError) {
          console.error('Error creating basic profile:', insertError);
        }
      }
    } catch (error: any) {
      console.error('Erro ao buscar perfil:', error);
      // Em caso de erro, pelo menos definir o email
      setProfile(prev => ({
        ...prev,
        email: user.email || ""
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  return { profile, setProfile, loading, refetchProfile: fetchProfile };
};
