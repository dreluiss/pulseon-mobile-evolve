
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

export const useUserName = () => {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserName = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching user name for:', user.id);
        
        const { data, error } = await supabase
          .from('user_profiles')
          .select('nome_completo')
          .eq('user_id', user.id)
          .single();

        console.log('User name data:', data);
        console.log('User name error:', error);

        if (data?.nome_completo && data.nome_completo.trim() !== '') {
          // Extrair o primeiro nome
          const name = data.nome_completo.trim().split(' ')[0];
          setFirstName(name);
          console.log('Using name from profile:', name);
        } else {
          // Fallback para o email se não tiver nome
          const emailPrefix = user.email?.split('@')[0] || 'usuário';
          setFirstName(emailPrefix);
          console.log('Using email prefix as fallback:', emailPrefix);
        }
      } catch (error) {
        console.error('Erro ao buscar nome do usuário:', error);
        // Fallback para o email
        const emailPrefix = user.email?.split('@')[0] || 'usuário';
        setFirstName(emailPrefix);
      } finally {
        setLoading(false);
      }
    };

    fetchUserName();
  }, [user]);

  return { firstName, loading };
};
