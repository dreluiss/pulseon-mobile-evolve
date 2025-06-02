import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') as 'signup' | 'login' | 'reset' || 'signup';
  const [mode, setMode] = useState<'signup' | 'login' | 'reset'>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { signUp, signIn, resetPassword } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const urlMode = searchParams.get('mode') as 'signup' | 'login' | 'reset';
    if (urlMode && ['signup', 'login', 'reset'].includes(urlMode)) {
      setMode(urlMode);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (password !== confirmPassword) {
          toast({
            title: "Erro",
            description: "As senhas não coincidem",
            variant: "destructive"
          });
          return;
        }

        if (password.length < 6) {
          toast({
            title: "Erro",
            description: "A senha deve ter pelo menos 6 caracteres",
            variant: "destructive"
          });
          return;
        }

        const { error } = await signUp(email, password);
        
        if (error) {
          if (error.message.includes('User already registered')) {
            toast({
              title: "Usuário já cadastrado",
              description: "Este email já está cadastrado. Faça login ou use outro email.",
              variant: "destructive"
            });
          } else {
            toast({
              title: "Erro no cadastro",
              description: error.message,
              variant: "destructive"
            });
          }
        } else {
          toast({
            title: "Cadastro realizado!",
            description: "Você pode fazer login agora mesmo. O email de verificação é opcional."
          });
          setMode('login');
        }
      } else if (mode === 'login') {
        const { error } = await signIn(email, password);
        
        if (error) {
          toast({
            title: "Erro no login",
            description: "Email ou senha incorretos",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Login realizado!",
            description: "Bem-vindo de volta!"
          });
          navigate("/dashboard");
        }
      } else if (mode === 'reset') {
        const { error } = await resetPassword(email);
        
        if (error) {
          toast({
            title: "Erro",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Email enviado!",
            description: "Verifique seu email para redefinir a senha."
          });
          setMode('login');
        }
      }
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleGoBack}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft size={16} className="mr-2" />
            Voltar
          </Button>
        </div>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-inter font-bold text-gray-900 dark:text-white">
              {mode === 'signup' && 'Criar Conta'}
              {mode === 'login' && 'Entrar'}
              {mode === 'reset' && 'Recuperar Senha'}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              {mode === 'signup' && 'Comece sua jornada fitness conosco'}
              {mode === 'login' && 'Acesse sua conta'}
              {mode === 'reset' && 'Digite seu email para recuperar a senha'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-900 dark:text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                />
              </div>

              {mode !== 'reset' && (
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-900 dark:text-white">
                    Senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Sua senha"
                      required
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {mode === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-900 dark:text-white">
                    Confirmar Senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirme sua senha"
                      required
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white"
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {mode === 'signup' && 'Criar Conta'}
                {mode === 'login' && 'Entrar'}
                {mode === 'reset' && 'Enviar Email'}
              </Button>
            </form>

            {mode === 'login' && (
              <div className="text-center">
                <Button
                  variant="link"
                  onClick={() => setMode('reset')}
                  className="text-sm text-primary hover:text-primary/80"
                >
                  Esqueceu a senha?
                </Button>
              </div>
            )}

            <Separator />

            <div className="text-center space-y-2">
              {mode === 'signup' && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Já tem uma conta?{' '}
                  <Button
                    variant="link"
                    onClick={() => setMode('login')}
                    className="text-primary hover:text-primary/80 p-0"
                  >
                    Fazer login
                  </Button>
                </p>
              )}

              {mode === 'login' && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Não tem uma conta?{' '}
                  <Button
                    variant="link"
                    onClick={() => setMode('signup')}
                    className="text-primary hover:text-primary/80 p-0"
                  >
                    Criar conta
                  </Button>
                </p>
              )}

              {mode === 'reset' && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Lembrou a senha?{' '}
                  <Button
                    variant="link"
                    onClick={() => setMode('login')}
                    className="text-primary hover:text-primary/80 p-0"
                  >
                    Fazer login
                  </Button>
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
