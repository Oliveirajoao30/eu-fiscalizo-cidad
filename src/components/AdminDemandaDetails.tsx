
import React from "react";
import { Demanda, StatusDemanda } from "@/types/demandas";
import { categorias } from "@/data/categorias";
import StatusBadge from "./StatusBadge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface AdminDemandaDetailsProps {
  demanda: Demanda;
  onStatusChange: (status: StatusDemanda) => void;
}

const AdminDemandaDetails = ({ demanda, onStatusChange }: AdminDemandaDetailsProps) => {
  // Find the category name
  const categoria = categorias.find(cat => cat.id === demanda.categoria);

  // Format dates
  const dataCriacao = new Date(demanda.dataCriacao).toLocaleString('pt-BR');
  const dataAtualizacao = new Date(demanda.dataAtualizacao).toLocaleString('pt-BR');

  return (
    <div className="space-y-4">
      {/* Title and Category */}
      <div>
        <h3 className="text-xl font-bold">{demanda.titulo}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-gray-500">Categoria:</span>
          <span className="text-sm font-medium">{categoria?.nome}</span>
        </div>
      </div>

      <Separator />

      {/* Status */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium">Status atual</h4>
          <StatusBadge status={demanda.status} />
        </div>
        <div>
          <h4 className="text-sm font-medium mb-1">Atualizar status</h4>
          <Select value={demanda.status} onValueChange={(value) => onStatusChange(value as StatusDemanda)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recebido">Recebido</SelectItem>
              <SelectItem value="analise">Em Análise</SelectItem>
              <SelectItem value="andamento">Em Andamento</SelectItem>
              <SelectItem value="resolvido">Resolvido</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* Description */}
      <div>
        <h4 className="text-sm font-medium mb-1">Descrição</h4>
        <p className="text-sm whitespace-pre-line">{demanda.descricao}</p>
      </div>

      <Separator />

      {/* Location */}
      <div>
        <h4 className="text-sm font-medium mb-1">Localização</h4>
        <div className="space-y-1">
          <p className="text-sm">
            <span className="font-medium">Endereço:</span> {demanda.localizacao.endereco}
          </p>
          <p className="text-sm">
            <span className="font-medium">Bairro:</span> {demanda.localizacao.bairro}
          </p>
          <p className="text-sm">
            <span className="font-medium">Cidade/Estado:</span> {demanda.localizacao.cidade}/{demanda.localizacao.estado}
          </p>
          {demanda.localizacao.complemento && (
            <p className="text-sm">
              <span className="font-medium">Complemento:</span> {demanda.localizacao.complemento}
            </p>
          )}
        </div>
      </div>

      <Separator />

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium mb-1">Data de criação</h4>
          <p className="text-sm">{dataCriacao}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-1">Última atualização</h4>
          <p className="text-sm">{dataAtualizacao}</p>
        </div>
      </div>

      <Separator />
      
      {/* Response section */}
      <div>
        <h4 className="text-sm font-medium mb-1">Resposta ao cidadão</h4>
        <textarea 
          className="w-full min-h-[100px] p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eu-red/50 focus:border-eu-red/50"
          placeholder="Digite uma resposta para o cidadão..."
        />
      </div>
    </div>
  );
};

export default AdminDemandaDetails;
