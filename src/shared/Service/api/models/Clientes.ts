export interface IEndereco {
  rua: string,
  numero: number,
  bairro: string,
  cidade: string,
}

export interface IPessoaFisica {
  id?: number
  nome: string,
  endereco: IEndereco,
  email: string,
  cpf: string | undefined,
  tipo: 'fisico',
  nomeContato: string,
  possuiContrato: boolean,
  tipoContrato: 'padrão' | 'completo',
  telefone: string
}

export interface IPessoaJuridica {
  id?: number
  nome: string,
  endereco: IEndereco,
  email: string,
  cnpj: string | undefined,
  tipo: 'juridico',
  nomeContato: string,
  possuiContrato: boolean,
  tipoContrato: 'padrão' | 'completo',
  telefone: string
}

export type TPessoaFisicaOuJuridica = {
  id?: number
  nome: string,
  endereco: IEndereco,
  email: string,
  cnpj: string | undefined,
  tipo: 'juridico' | 'fisico',
  nomeContato: string,
  possuiContrato: boolean,
  tipoContrato: 'padrão' | 'completo',
  cpf: string | undefined,
  telefone: string
}