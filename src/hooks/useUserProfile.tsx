
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

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

export const useUserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({
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

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile({
          nome_completo: data.nome_completo || "",
          sexo: data.sexo || "",
          data_nascimento: data.data_nascimento ? new Date(data.data_nascimento) : null,
          objetivo: data.objetivo || "",
          nivel_experiencia: data.nivel_experiencia || "",
          frequencia_treino: data.frequencia_treino || "",
          restricoes: data.restricoes || "",
          tempo_disponivel: data.tempo_disponivel || "",
          preferencias_treino: data.preferencias_treino || "",
          local_treino: data.local_treino || "",
          data_onboarding: data.data_onboarding || ""
        });
      }
    } catch (error: any) {
      console.error('Erro ao buscar perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return { profile, setProfile, loading, refetchProfile: fetchProfile };
};
