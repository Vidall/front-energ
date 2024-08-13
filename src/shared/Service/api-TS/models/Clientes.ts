export interface IEndereco {
  rua?: string,
  numero?: number | null,
  bairro?: string,
  cidade?: string,
}

interface IBasePessoa {
  id?: number;
  nome: string;
  endereco: IEndereco;
  email: string;
  nomeContato: string;
  possuiContrato: boolean;
  tipoContrato: 'padrão' | 'completo';
  telefone: string;
}

export interface IPessoaFisica extends IBasePessoa {
  cpf: string;
  tipo: 'fisico';
}

export interface IUpdatePessoaFisica extends Partial<IBasePessoa> {
  cpf?: string;
  tipo?: 'fisico';
}

export interface IPessoaJuridica extends IBasePessoa {
  cnpj: string;
  tipo: 'juridico';
}

export interface IUpdatePessoaJuridica extends Partial<IBasePessoa> {
  cnpj?: string;
  tipo?: 'juridico';
}

export type TPessoa = IPessoaFisica | IPessoaJuridica;

export type TPessoaFisicaOuJuridica = TPessoa;
