export interface IOs {
  id: number,
  status: 'ABERTO' | 'ANDAMENTO' | 'FINALIZADO' | 'CANCELADO',
  client_id: number,
  technician_id: number,
  scheduledDate: string //ve se da para mudar para Date
  endereco: {
    rua: string,
    numero: number
    bairro: string,
    cidade: string
  }
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