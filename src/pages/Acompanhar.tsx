
import { useState, FormEvent } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DemandaCard from "../components/DemandaCard";
import { useDemandas } from "../context/DemandasContext";
import { Search } from "lucide-react";
import { Demanda } from "../types/demandas";

const Acompanhar = () => {
  const { buscarDemandaPorProtocolo, demandas } = useDemandas();
  const [protocolo, setProtocolo] = useState("");
  const [demandaEncontrada, setDemandaEncontrada] = useState<Demanda | null>(null);
  const [erro, setErro] = useState("");
  const [buscaRealizada, setBuscaRealizada] = useState(false);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    
    if (!protocolo.trim()) {
      setErro("Por favor, digite um número de protocolo.");
      return;
    }
    
    const resultado = buscarDemandaPorProtocolo(protocolo);
    
    if (resultado) {
      setDemandaEncontrada(resultado);
      setErro("");
    } else {
      setDemandaEncontrada(null);
      setErro("Não encontramos nenhuma solicitação com este protocolo.");
    }
    
    setBuscaRealizada(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-eu-text mb-6">
              Acompanhe sua Solicitação
            </h1>
            <p className="text-eu-text mb-8">
              Digite o número do protocolo que você recebeu após o envio da sua solicitação.
            </p>

            <div className="card mb-8">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="protocolo" className="sr-only">
                    Número do Protocolo
                  </label>
                  <input
                    type="text"
                    id="protocolo"
                    value={protocolo}
                    onChange={(e) => setProtocolo(e.target.value)}
                    placeholder="Digite o número do protocolo"
                    className="w-full p-3 border border-eu-gray-light rounded-md focus:outline-none focus:ring-2 focus:ring-eu-blue"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary flex items-center justify-center gap-2"
                >
                  <Search size={18} />
                  <span>Buscar</span>
                </button>
              </form>
            </div>

            {buscaRealizada && (
              <div className="mb-8">
                {erro ? (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-800">
                    {erro}
                  </div>
                ) : demandaEncontrada ? (
                  <div>
                    <h2 className="text-xl font-medium text-eu-text mb-4">Resultado da Busca</h2>
                    <DemandaCard demanda={demandaEncontrada} />
                  </div>
                ) : null}
              </div>
            )}

            <div>
              <h2 className="text-xl font-medium text-eu-text mb-4">Solicitações Recentes</h2>
              <div className="grid gap-4">
                {demandas.slice(0, 3).map((demanda) => (
                  <DemandaCard key={demanda.id} demanda={demanda} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Acompanhar;
