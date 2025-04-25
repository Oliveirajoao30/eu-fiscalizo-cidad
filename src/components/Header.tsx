
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";
import Logo3d from "./Logo3d";
import { useAuth } from "@/hooks/useAuth";

interface HeaderProps {
  isLightMode?: boolean;
}

const Header = ({ isLightMode = false }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const textColorClass = isLightMode ? "text-white" : "text-black";
  const borderColorClass = isLightMode ? "border-white" : "border-black";
  const hoverBgClass = isLightMode ? "hover:bg-white/20" : "hover:bg-black";
  const hoverTextClass = isLightMode ? "hover:text-white" : "hover:text-white";

  return (
    <header className="absolute top-0 left-0 right-0 z-10">
      <div className="container py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <Logo3d size={34} />
            <div className={`font-bold text-2xl ${textColorClass}`}>
              Eu <span className={textColorClass}>Fiscalizo</span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className={`font-medium hover:text-eu-red transition-colors ${textColorClass}`}>
            Início
          </Link>
          <Link to="/enviar-demanda" className={`font-medium hover:text-eu-red transition-colors ${textColorClass}`}>
            Enviar Demanda
          </Link>
          <Link to="/acompanhar" className={`font-medium hover:text-eu-red transition-colors ${textColorClass}`}>
            Acompanhar Solicitações
          </Link>
          
          {user && (
            <Link to="/admin" className={`font-medium hover:text-eu-red transition-colors ${textColorClass}`}>
              Admin
            </Link>
          )}
          
          {!user ? (
            <Link 
              to="/login" 
              className={`border ${borderColorClass} ${textColorClass} px-5 py-2.5 rounded-md ${hoverBgClass} ${hoverTextClass} transition-colors ml-4`}
            >
              Login
            </Link>
          ) : (
            <button
              className={`border ${borderColorClass} ${textColorClass} px-5 py-2.5 rounded-md ${hoverBgClass} ${hoverTextClass} transition-colors ml-4`}
              onClick={logout}
            >
              Logout
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ${textColorClass}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white/95 backdrop-blur-sm border-t border-eu-gray-light">
          <div className="container py-3 flex flex-col">
            <Link
              to="/"
              className="py-2 text-black font-medium hover:text-eu-red transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              to="/enviar-demanda"
              className="py-2 text-black font-medium hover:text-eu-red transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Enviar Demanda
            </Link>
            <Link
              to="/acompanhar"
              className="py-2 text-black font-medium hover:text-eu-red transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Acompanhar Solicitações
            </Link>
            
            {/* Show Admin link for authenticated users in mobile menu */}
            {user && (
              <Link
                to="/admin"
                className="py-2 text-black font-medium hover:text-eu-red transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            
            {!user ? (
              <Link
                to="/login"
                className="py-2 text-black font-medium hover:text-eu-red transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            ) : (
              <button
                className="py-2 text-left text-black font-medium hover:text-eu-red transition-colors"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
              >
                Logout
              </button>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
