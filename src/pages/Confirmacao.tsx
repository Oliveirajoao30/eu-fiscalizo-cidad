
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Check } from "lucide-react";
import { useDemandas } from "../context/DemandasContext";
import { Demanda } from "../types/demandas";

const Confirmacao = () => {
  const [searchParams] = useSearchParams();
  const protocolo = searchParams.get("protocolo") || "";
  const { buscarDemandaPorProtocolo } = useDemandas();
  
  const [demanda, setDemanda] = useState<Demanda | undefined>(undefined);
  
  useEffect(() => {
    if (protocolo) {
      const demandaEncontrada = buscarDemandaPorProtocolo(protocolo);
      setDemanda(demandaEncontrada);
    }
  }, [protocolo, buscarDemandaPorProtocolo]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="card text-center">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Check size={40} className="text-green-600" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-eu-text mb-4">Solicitação Enviada com Sucesso!</h1>
              
              {demanda ? (
                <div className="mt-8">
                  <p className="text-eu-text">
                    Sua solicitação foi recebida e será analisada pela equipe responsável.
                  </p>
                  <div className="mt-6 p-4 bg-eu-gray-light rounded-md">
                    <h2 className="text-lg font-medium text-eu-text mb-2">Detalhes da Solicitação</h2>
                    <p className="mb-2">
                      <span className="font-medium">Título:</span> {demanda.titulo}
                    </p>
                    <p className="mb-2">
                      <span className="font-medium">Protocolo:</span> {demanda.protocolo}
                    </p>
                    <p className="mb-2">
                      <span className="font-medium">Data de Registro:</span> {new Date(demanda.dataCriacao).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-eu-text">Detalhes da solicitação não encontrados.</p>
              )}

              <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-eu-text font-medium">
                  ⚠️ Importante: Guarde o número de protocolo para acompanhar sua solicitação
                </p>
                <div className="mt-2 p-2 bg-white border border-eu-gray-light rounded text-xl font-mono text-center select-all">
                  {protocolo}
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <Link
                  to="/acompanhar"
                  className="btn-secondary text-center py-3"
                >
                  Acompanhar Solicitação
                </Link>
                <Link
                  to="/"
                  className="border border-eu-gray-light hover:border-eu-blue text-eu-text rounded-md py-3 text-center transition-colors"
                >
                  Voltar para a página inicial
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Confirmacao;
