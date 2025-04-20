
import { Demanda } from "../types/demandas";
import { categorias } from "../data/categorias";
import StatusBadge from "./StatusBadge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DemandaCardProps {
  demanda: Demanda;
}

const DemandaCard = ({ demanda }: DemandaCardProps) => {
  const categoria = categorias.find((cat) => cat.id === demanda.categoria);
  
  const dataFormatada = format(new Date(demanda.dataCriacao), 
    "dd 'de' MMMM 'de' yyyy", 
    { locale: ptBR }
  );

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium text-eu-text">{demanda.titulo}</h3>
        <StatusBadge status={demanda.status} />
      </div>
      <p className="text-sm text-eu-text mt-2">{categoria?.nome || demanda.categoria}</p>
      <div className="mt-4">
        <p className="text-sm text-eu-text line-clamp-2">{demanda.descricao}</p>
      </div>
      <div className="mt-4 text-xs text-gray-500">
        <div className="flex justify-between items-center">
          <span>Protocolo: {demanda.protocolo}</span>
          <span>{dataFormatada}</span>
        </div>
        <p className="mt-1">
          {demanda.localizacao.endereco}, {demanda.localizacao.bairro} - {demanda.localizacao.cidade}/{demanda.localizacao.estado}
        </p>
      </div>
    </div>
  );
};

export default DemandaCard;
