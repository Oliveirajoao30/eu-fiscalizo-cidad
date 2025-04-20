
import { createContext, useState, useContext, ReactNode } from "react";
import { Demanda, StatusDemanda } from "../types/demandas";
import { demandasExemplo } from "../data/demandas";

interface DemandasContextType {
  demandas: Demanda[];
  adicionarDemanda: (demanda: Omit<Demanda, "id" | "dataCriacao" | "dataAtualizacao" | "status" | "protocolo">) => string;
  buscarDemandaPorProtocolo: (protocolo: string) => Demanda | undefined;
  atualizarStatusDemanda: (id: string, status: StatusDemanda) => void;
}

const DemandasContext = createContext<DemandasContextType | undefined>(undefined);

export const DemandasProvider = ({ children }: { children: ReactNode }) => {
  const [demandas, setDemandas] = useState<Demanda[]>(demandasExemplo);

  const adicionarDemanda = (novaDemanda: Omit<Demanda, "id" | "dataCriacao" | "dataAtualizacao" | "status" | "protocolo">) => {
    const agora = new Date().toISOString();
    const novoId = `dem-${String(demandas.length + 1).padStart(3, "0")}`;
    const protocolo = `${novaDemanda.categoria.substring(0, 2).toUpperCase()}${agora.substring(0, 4)}${agora.substring(5, 7)}${agora.substring(8, 10)}${String(demandas.length + 1).padStart(5, "0")}`;
    
    const demanda: Demanda = {
      ...novaDemanda,
      id: novoId,
      dataCriacao: agora,
      dataAtualizacao: agora,
      status: "recebido",
      protocolo
    };
    
    setDemandas(prev => [...prev, demanda]);
    return protocolo;
  };

  const buscarDemandaPorProtocolo = (protocolo: string) => {
    return demandas.find(demanda => demanda.protocolo.toLowerCase() === protocolo.toLowerCase());
  };

  const atualizarStatusDemanda = (id: string, status: StatusDemanda) => {
    setDemandas(prev => prev.map(demanda => {
      if (demanda.id === id) {
        return {
          ...demanda,
          status,
          dataAtualizacao: new Date().toISOString()
        };
      }
      return demanda;
    }));
  };

  const value = {
    demandas,
    adicionarDemanda,
    buscarDemandaPorProtocolo,
    atualizarStatusDemanda
  };

  return (
    <DemandasContext.Provider value={value}>
      {children}
    </DemandasContext.Provider>
  );
};

export const useDemandas = () => {
  const context = useContext(DemandasContext);
  if (context === undefined) {
    throw new Error("useDemandas must be used within a DemandasProvider");
  }
  return context;
};
