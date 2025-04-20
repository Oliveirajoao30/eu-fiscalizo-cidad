
import { Link } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-10">
      <div className="container py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center">
            <Search className="w-8 h-8 text-eu-red" />
            <div className="font-bold text-2xl">
              <span className="text-eu-red">Eu</span>
              <span className="text-eu-text">Fiscalizo</span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-eu-text hover:text-eu-red transition-colors">
            Início
          </Link>
          <Link to="/enviar-demanda" className="text-eu-text hover:text-eu-red transition-colors">
            Enviar Demanda
          </Link>
          <Link to="/acompanhar" className="text-eu-text hover:text-eu-red transition-colors">
            Acompanhar Solicitações
          </Link>
          <Link to="/enviar-demanda" className="bg-eu-red text-white font-medium py-2.5 px-5 rounded-md hover:bg-opacity-90 transition-colors">
            Nova Solicitação
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-eu-text"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white/95 backdrop-blur-sm border-t border-eu-gray-light">
          <div className="container py-3 flex flex-col">
            <Link
              to="/"
              className="py-2 text-eu-text hover:text-eu-red transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              to="/enviar-demanda"
              className="py-2 text-eu-text hover:text-eu-red transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Enviar Demanda
            </Link>
            <Link
              to="/acompanhar"
              className="py-2 text-eu-text hover:text-eu-red transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Acompanhar Solicitações
            </Link>
            <Link
              to="/enviar-demanda"
              className="btn-primary mt-2 text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Nova Solicitação
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
