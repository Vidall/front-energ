export interface IOs {
  id: number,
  status: 'ABERTO' | 'ANDAMENTO' | 'FINALIZADO' | 'CANCELADO',
  client_id: number,
  technician_id: number,
  scheduledDate: string //ve se da para mudar para Date
  cliente_type: 'FISICO' | 'JURIDICO'
  endereco: {
    rua: string,
    numero: number | null
    bairro: string,
    cidade: string
  }
  escopoDosServicos: string
}

export interface IReturnGetAllOs {
  _embedded: IOrderAllDTOOutputList
}

export interface IOrderAllDTOOutputList {
  orderAllDTOOutputList: IOs[]
}

export interface IOrdemComTotalCount {
  data: IReturnGetAllOs
  totalCount: number
}