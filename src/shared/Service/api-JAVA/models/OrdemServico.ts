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
  client_equipment_id: number
  generalObservations: string
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
    name: string,
    group: {
      id: number,
      name: string
    }
  } 
  verificationBefore: string //'string' | 'Nstring'
  verificationAfter: string //'string' | 'Nstring'
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

//------------------------------

export interface IService {
  id: number,
	service: {
		id: number,
		name: string,
		group: {
			id: number,
			name: string
		}
	},
	verificationBefore: string,
	urlPhotoBefore: string,
	verificationAfter: string,
	urlPhotoAfter: string
}

//------------------------------

export interface IStatusGerador {
  motorProtect: {
    motorProtect_baixaPressaOleo: string,
    motorProtect_altaTemperatura: string,
    motorProtect_ruidosOuVibracoesAnormais: string
  },
  generatorProtect: {
    generatorProtect_tensao: string,
    generatorProtect_frequencia: string,
    generatorProtect_nivelTanqueDiesel: string
  },
  operationTime: {
    operationTime_faltaDeRede: string,
    operationTime_assimirCarga: string,
    operationTime_retornoDeRede: string,
    operationTime_resfriamentoGerador: string
  }
}
//------------------------------
export interface ITesteGerador {
  gmg: {
    gmg_tFaseR: string,
    gmg_tFaseS: string,
    gmg_tFaseT: string
  },
  rede: {
    rede_tFaseR: string,
    rede_tFaseS: string,
    rede_tFaseT: string
  },
  corrente: {
    corrente_tFaseR: string,
    corrente_tFaseS: string,
    corrente_tFaseT: string,
    corrente_tBateriaCL: string,
    corrente_tBateriaCD: string,
    corrente_tBateriaIP: string,
    corrente_tBateriaEC: string,
    corrente_frequencia: string,
    corrente_potencia: string,
    corrente_potenciaR: string,
    corrente_potenciaE: string,
    corrente_fatorPotencia: string,
    corrente_temperatura: string,
    corrente_pressaOleo: string,
    corrente_consumoCombustivel: string,
    corrente_temperaturaAd: string,
    corrente_preAquecimento: string
  }
}

//------------------------------

export interface IPDF {
 id: number,
  status: string,
  type: string,
  scheduledDate: string,
  client_id: number,
  client_type: string,
  client_equipment_id: number,
  technician_id: number,
  client_signature_url: string
  endereco: {
    rua: string,
    numero: number,
    bairro: string,
    cidade: string
  },
  escopoDosServicos: string,
  servicesInOrder: [
    {
      id: number,
      service: {
        id: number,
        name: string,
        group: {
          id: number,
          name: string
        }
      },
      verificationBefore: string,
      urlPhotoBefore: string,
      verificationAfter: string,
      urlPhotoAfter: string
    }
  ],
  workData: {
    start: string,
    end: string
  },
  generatorTest: {
    gmg: {
      gmg_tFaseR: string,
      gmg_tFaseS: string,
      gmg_tFaseT: string
    },
    rede: {
      rede_tFaseR: string,
      rede_tFaseS: string,
      rede_tFaseT: string
    },
    corrente: {
      corrente_tFaseR: string,
      corrente_tFaseS: string,
      corrente_tFaseT: string,
      corrente_tBateriaCL: string,
      corrente_tBateriaCD: string,
      corrente_tBateriaIP: string,
      corrente_tBateriaEC: string,
      corrente_frequencia: string,
      corrente_potencia: string,
      corrente_potenciaR: string,
      corrente_potenciaE: string,
      corrente_fatorPotencia: string,
      corrente_temperatura: string,
      corrente_pressaOleo: string,
      corrente_consumoCombustivel: string,
      corrente_temperaturaAd: string,
      corrente_preAquecimento: string
    }
  },
  generatorStatus: {
    motorProtect: {
      motorProtect_baixaPressaOleo: string,
      motorProtect_altaTemperatura: string,
      motorProtect_ruidosOuVibracoesAnormais: string
    },
    generatorProtect: {
      generatorProtect_tensao: string,
      generatorProtect_frequencia: string,
      generatorProtect_nivelTanqueDiesel: string
    },
    operationTime: {
      operationTime_faltaDeRede: string,
      operationTime_assimirCarga: string,
      operationTime_retornoDeRede: string,
      operationTime_resfriamentoGerador: string
    }
  },
  generalObservations: string
}

export interface ISendAssinaturaCliente {
  file: File
}

export interface IOrdemFinalizacao {
  generalObservations: string
}