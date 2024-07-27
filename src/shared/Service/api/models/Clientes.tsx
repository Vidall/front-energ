export interface Endereco {
  rua: string,
  numero: number,
  bairro: string,
  cidade: string,
}

export interface IPessoaFisica {
  id?: number
  nome: string,
  endereco: Endereco | string,
  email: string,
  cpf: string,
  tipo: 'fisico',
  nomeContato: string,
  possuiContrato: boolean,
  tipoContrato: string
}

export interface IPessoaJuridica {
  id?: number
  nome: string,
  endereco: Endereco | string,
  email: string,
  cpf: string,
  tipo: 'fisico',
  nomeContato: string,
  possuiContrato: boolean,
  tipoContrato: string
}