
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

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

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Verificar se o email foi confirmado
  if (!user.email_confirmed_at) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
        <div className="max-w-md w-full mx-auto p-6">
          <div className="text-center">
            <div className="mb-4">
              <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto">
                <svg className="h-6 w-6 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Verifique seu email
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Enviamos um link de verificação para <strong>{user.email}</strong>. 
              Por favor, verifique seu email antes de continuar.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Não recebeu o email? Verifique sua caixa de spam ou tente fazer login novamente.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
