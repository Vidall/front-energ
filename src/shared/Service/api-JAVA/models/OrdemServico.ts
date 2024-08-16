export interface IOs {
  id: number,
  type: 'ABERTO' | 'ANDAMENTO' | 'FINALIZADO' | 'CANCELADO',
  client_id: number,
  technician_id: number,
  scheduledDate: string //ve se da para mudar para Date
  client_type: 'FISICO' | 'JURIDICO'
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


// -----------------------

export interface IGetByIdOrdemStart {
  id: number,
	status: string,
	type: string,
	scheduledDate: string,
	client_id: number,
	client_type: string,
	technician_id: number,
	endereco: {
		rua: string,
		numero: number,
		bairro: string,
		cidade: string
	},
	escopoDosServicos: string,
	servicesInOrder: []
}


//------------------------------

export interface IServiceInOrder {
  service: {
    id: number
  } 
  verificationBefore: string //'OK' | 'NOK'
  verificationAfter: string //'OK' | 'NOK'
  urlPhotoAfter: string
  urlPhotoBefore: string
}

export interface IServiceInOrderOutput {
  id: number
  name: string
}

//------------------------------
export interface ISendImage {
  file: string
}