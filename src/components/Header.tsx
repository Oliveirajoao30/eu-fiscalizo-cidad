import { Link } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import { useState } from "react";
import Logo3d from "./Logo3d";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-10">
      <div className="container py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center">
            <Logo3d size={34} />
            <div className="font-bold text-2xl text-black">
              Eu <span className="text-black">Fiscalizo</span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-black font-medium hover:text-eu-red transition-colors">
            Início
          </Link>
          <Link to="/enviar-demanda" className="text-black font-medium hover:text-eu-red transition-colors">
            Enviar Demanda
          </Link>
          <Link to="/acompanhar" className="text-black font-medium hover:text-eu-red transition-colors">
            Acompanhar Solicitações
          </Link>
          <Link to="/login" className="border border-black text-black px-5 py-2.5 rounded-md hover:bg-black hover:text-white transition-colors ml-3">
            Login
          </Link>
          <button
            className="bg-black text-white px-5 py-2.5 rounded-md font-medium hover:bg-gray-800 transition-colors ml-2"
            onClick={() => {
              // Função de logout será declarada nos próximos passos
              window.dispatchEvent(new CustomEvent("logout-intent"));
            }}
          >
            Logout
          </button>
        </nav>

        {/* Mobile */}
        <button
          className="md:hidden text-black"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Logo3d size={28} />
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
            <Link
              to="/login"
              className="py-2 text-black font-medium hover:text-eu-red transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
