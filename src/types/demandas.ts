
export type StatusDemanda = 'recebido' | 'analise' | 'andamento' | 'resolvido';

export interface Categoria {
  id: string;
  nome: string;
  icone: string;
}

export interface Localizacao {
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  complemento?: string;
  latitude?: number;
  longitude?: number;
}

export interface Demanda {
  id: string;
  titulo: string;
  categoria: string;
  descricao: string;
  localizacao: Localizacao;
  status: StatusDemanda;
  dataCriacao: string;
  dataAtualizacao: string;
  protocolo: string;
}
