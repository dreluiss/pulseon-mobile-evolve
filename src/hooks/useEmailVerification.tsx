
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useEmailVerification = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isResending, setIsResending] = useState(false);

  const resendVerificationEmail = async () => {
    if (!user?.email || isResending) return;

    try {
      setIsResending(true);
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email
      });

      if (error) throw error;

      toast({
        title: "Email reenviado!",
        description: "Verifique sua caixa de entrada e spam.",
      });
    } catch (error: any) {
      console.error('Erro ao reenviar email:', error);
      toast({
        title: "Erro ao reenviar email",
        description: "Tente novamente em alguns minutos.",
        variant: "destructive"
      });
    } finally {
      setIsResending(false);
    }
  };

  return {
    isEmailVerified: user?.email_confirmed_at != null,
    resendVerificationEmail,
    isResending
  };
};
