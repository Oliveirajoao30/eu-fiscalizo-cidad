
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-eu-gray-light sticky top-0 z-10">
      <div className="container py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="text-eu-red font-bold text-2xl">
            <span className="text-eu-blue">Eu</span> Fiscalizo
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
          <Link to="/enviar-demanda" className="btn-primary">
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
        <nav className="md:hidden bg-white border-t border-eu-gray-light">
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
