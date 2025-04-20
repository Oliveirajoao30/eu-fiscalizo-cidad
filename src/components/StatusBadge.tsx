
import { StatusDemanda } from "../types/demandas";

interface StatusBadgeProps {
  status: StatusDemanda;
}

const statusLabels: Record<StatusDemanda, string> = {
  recebido: "Recebido",
  analise: "Em Análise",
  andamento: "Em Andamento",
  resolvido: "Resolvido"
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return <span className={`status-badge status-${status}`}>{statusLabels[status]}</span>;
};

export default StatusBadge;
