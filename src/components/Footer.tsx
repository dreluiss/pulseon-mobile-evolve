
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="mb-4">
              <Logo size="lg" className="justify-start [&_span]:text-white" />
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Revolucionando o fitness com inteligência artificial. 
              Treinos personalizados para todos os níveis e objetivos.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>contato@pulseon.com.br</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>(11) 9999-9999</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>São Paulo, Brasil</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-poppins font-bold text-lg mb-4">Produto</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/" className="hover:text-secondary transition-colors">Como funciona</Link></li>
              <li><Link to="/pricing" className="hover:text-secondary transition-colors">Preços</Link></li>
              <li><Link to="/features" className="hover:text-secondary transition-colors">Funcionalidades</Link></li>
              <li><Link to="/demo" className="hover:text-secondary transition-colors">Demo</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-poppins font-bold text-lg mb-4">Empresa</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/about" className="hover:text-secondary transition-colors">Sobre nós</Link></li>
              <li><Link to="/blog" className="hover:text-secondary transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-secondary transition-colors">Contato</Link></li>
              <li><Link to="/careers" className="hover:text-secondary transition-colors">Carreiras</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-300 text-sm mb-4 md:mb-0">
            © 2024 PulseOn. Todos os direitos reservados.
          </div>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-gray-300 hover:text-secondary transition-colors">
              Política de Privacidade
            </Link>
            <Link to="/terms" className="text-gray-300 hover:text-secondary transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
