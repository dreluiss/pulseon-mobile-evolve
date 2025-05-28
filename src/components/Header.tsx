
import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { LogIn, UserPlus, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface HeaderProps {
  actions?: ReactNode;
}

const iconButtonClass = "bg-transparent p-2 rounded-full transition text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10";

const Header = ({ actions }: HeaderProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-row justify-between items-center gap-2">
        <Link to="/">
          <Logo size="md" />
        </Link>
        <div className="flex flex-row gap-2 items-center justify-end">
          <ThemeToggle />
          {actions ? actions : (
            <>
              {user ? (
                <button 
                  onClick={() => navigate("/profile")}
                  className={iconButtonClass} 
                  aria-label="Perfil"
                >
                  <User size={20} />
                </button>
              ) : (
                <>
                  <Link to="/auth">
                    <button className={iconButtonClass} aria-label="Login">
                      <LogIn size={20} />
                    </button>
                  </Link>
                  <Link to="/auth">
                    <button className={iconButtonClass} aria-label="Cadastrar">
                      <UserPlus size={20} />
                    </button>
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
