import { Search } from "lucide-react";
import Logo3d from "./Logo3d";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-eu-gray-light mt-auto">
      <div className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <Logo3d size={24} />
              <div className="font-bold text-xl text-black">
                Eu <span className="text-black">Fiscalizo</span>
              </div>
            </div>
            <p className="text-sm text-eu-text mt-2">
              Conectando cidadãos à gestão pública
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-eu-text font-medium mb-2">Links</h3>
              <ul className="space-y-1">
                <li>
                  <a href="/" className="text-sm text-eu-blue hover:text-eu-red transition-colors">
                    Início
                  </a>
                </li>
                <li>
                  <a href="/enviar-demanda" className="text-sm text-eu-blue hover:text-eu-red transition-colors">
                    Enviar Demanda
                  </a>
                </li>
                <li>
                  <a href="/acompanhar" className="text-sm text-eu-blue hover:text-eu-red transition-colors">
                    Acompanhar Solicitações
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-eu-text font-medium mb-2">Contato</h3>
              <ul className="space-y-1">
                <li className="text-sm text-eu-text">contato@eufiscalizo.com.br</li>
                <li className="text-sm text-eu-text">(00) 1234-5678</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-eu-gray-light mt-6 pt-4 text-center md:text-right">
          <p className="text-xs text-eu-text">
            &copy; {new Date().getFullYear()} Eu Fiscalizo. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
