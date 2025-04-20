
import { Demanda } from "../types/demandas";

// Dados de exemplo para demonstração
export const demandasExemplo: Demanda[] = [
  {
    id: "dem-001",
    titulo: "Lâmpada queimada na Rua das Flores",
    categoria: "iluminacao",
    descricao: "A lâmpada do poste em frente ao número 123 está queimada há mais de uma semana.",
    localizacao: {
      endereco: "Rua das Flores, 123",
      bairro: "Centro",
      cidade: "Sua Cidade",
      estado: "SC"
    },
    status: "recebido",
    dataCriacao: "2023-04-15T14:30:00",
    dataAtualizacao: "2023-04-15T14:30:00",
    protocolo: "IL2023041500001"
  },
  {
    id: "dem-002",
    titulo: "Buraco na pavimentação",
    categoria: "pavimentacao",
    descricao: "Existe um buraco grande na via que está causando acidentes.",
    localizacao: {
      endereco: "Avenida Principal, 500",
      bairro: "Jardim América",
      cidade: "Sua Cidade",
      estado: "SC"
    },
    status: "analise",
    dataCriacao: "2023-04-10T09:15:00",
    dataAtualizacao: "2023-04-12T11:20:00",
    protocolo: "PV2023041000002"
  },
  {
    id: "dem-003",
    titulo: "Lixeira pública quebrada",
    categoria: "lixo",
    descricao: "A lixeira pública está quebrada e o lixo está se espalhando.",
    localizacao: {
      endereco: "Praça Central, s/n",
      bairro: "Centro",
      cidade: "Sua Cidade",
      estado: "SC"
    },
    status: "andamento",
    dataCriacao: "2023-04-08T16:45:00",
    dataAtualizacao: "2023-04-14T10:30:00",
    protocolo: "LX2023040800003"
  },
  {
    id: "dem-004",
    titulo: "Vazamento de água na calçada",
    categoria: "agua",
    descricao: "Há um vazamento de água constante formando poças na calçada.",
    localizacao: {
      endereco: "Rua dos Ipês, 456",
      bairro: "Jardim das Flores",
      cidade: "Sua Cidade",
      estado: "SC"
    },
    status: "resolvido",
    dataCriacao: "2023-04-05T08:20:00",
    dataAtualizacao: "2023-04-18T15:10:00",
    protocolo: "AG2023040500004"
  }
];
