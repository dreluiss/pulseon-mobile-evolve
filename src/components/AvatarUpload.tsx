
import { useState, useRef } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AvatarUploadProps {
  currentAvatarUrl?: string;
  onAvatarUpdate: (avatarUrl: string | null) => void;
  isEditing: boolean;
  userName: string;
}

const AvatarUpload = ({ currentAvatarUrl, onAvatarUpdate, isEditing, userName }: AvatarUploadProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(currentAvatarUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadAvatar = async (file: File) => {
    if (!user) return;

    try {
      setUploading(true);

      // Criar nome único para o arquivo
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      // Upload do arquivo
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Obter URL pública
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      const publicUrl = data.publicUrl;

      // Salvar na tabela user_avatars
      const { error: dbError } = await supabase
        .from('user_avatars')
        .upsert({
          user_id: user.id,
          avatar_url: publicUrl,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (dbError) throw dbError;

      setAvatarUrl(publicUrl);
      onAvatarUpdate(publicUrl);

      toast({
        title: "Foto atualizada!",
        description: "Sua foto de perfil foi atualizada com sucesso"
      });

    } catch (error: any) {
      console.error('Erro no upload:', error);
      toast({
        title: "Erro no upload",
        description: "Não foi possível fazer upload da foto",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const removeAvatar = async () => {
    if (!user) return;

    try {
      // Remover da tabela
      const { error } = await supabase
        .from('user_avatars')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setAvatarUrl(null);
      onAvatarUpdate(null);

      toast({
        title: "Foto removida",
        description: "Sua foto de perfil foi removida"
      });

    } catch (error: any) {
      console.error('Erro ao remover avatar:', error);
      toast({
        title: "Erro",
        description: "Não foi possível remover a foto",
        variant: "destructive"
      });
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Arquivo inválido",
        description: "Por favor, selecione uma imagem",
        variant: "destructive"
      });
      return;
    }

    // Validar tamanho (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "A imagem deve ter no máximo 5MB",
        variant: "destructive"
      });
      return;
    }

    uploadAvatar(file);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <Avatar className="h-24 w-24">
          <AvatarImage src={avatarUrl || undefined} />
          <AvatarFallback className="text-lg">
            {getInitials(userName || user?.email?.split('@')[0] || 'U')}
          </AvatarFallback>
        </Avatar>

        {isEditing && (
          <div className="absolute -bottom-2 -right-2 flex space-x-1">
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0 bg-white dark:bg-gray-800"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              ) : (
                <Camera className="h-4 w-4" />
              )}
            </Button>

            {avatarUrl && (
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0 bg-white dark:bg-gray-800"
                onClick={removeAvatar}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>

      {isEditing && (
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Clique no ícone da câmera para alterar sua foto
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Máximo 5MB - JPG, PNG, GIF
          </p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default AvatarUpload;
