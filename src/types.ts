export type UserRole = 'super_admin' | 'admin' | 'dono' | 'profissional' | 'cliente';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha?: string;
  tipo: UserRole;
  loja_id?: string; // For Store Owner
  profissional_id?: string; // For Professional
}

export interface Loja {
  id: string;
  nome: string;
  endereco: string;
  telefone: string;
  horario_funcionamento: {
    inicio: string; // "08:00"
    fim: string;    // "18:00"
    intervalo_inicio?: string; // "11:40"
    intervalo_fim?: string;    // "13:40"
    split_shift_enabled?: boolean;
  };
  slug: string; // URL-friendly link de bio ex: "beleza-real"
  imagem?: string;
  servicos_populares?: string[];
}

export interface Produto {
  id: string;
  loja_id: string;
  nome: string;
  preco: number;
  estoque: number;
  categoria: string;
  imagem?: string;
}

export interface Profissional {
  id: string;
  loja_id: string;
  nome: string;
  especialidade: string;
  disponibilidade?: {
    [key: string]: string[]; // "YYYY-MM-DD": ["09:00", "09:15", ...] or overridden availability
  };
  foto?: string;
}

export interface Servico {
  id: string;
  loja_id: string;
  nome: string;
  preco: number;
  duracao: number; // em minutos, multiplos de 15
  categoria: string; // "Cabelo", "Cílios", "Unhas", "Sobrancelha", "Outros"
  imagem?: string;
}

export interface Agendamento {
  id: string;
  cliente_id: string;
  profissional_id: string;
  servico_id: string;
  loja_id: string;
  data_hora: string; // "YYYY-MM-DD HH:mm"
  status: 'confirmado' | 'cancelado';
}
