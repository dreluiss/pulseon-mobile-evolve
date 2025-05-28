
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Signup = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Redireciona para /auth se não estiver autenticado
    // ou para /dashboard se já estiver autenticado
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  }, [user, navigate]);

  return null;
};

export default Signup;
