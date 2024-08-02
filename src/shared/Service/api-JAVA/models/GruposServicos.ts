export interface IGrupo {
  id: number,
  name: string,
  services: []
}

export interface IGrupoServicosCreated {
  id: number
  name: string
  services: []
}

export interface Idata {
  _embedded: IGroupAllDTOOutputList,
}

export interface IGroupAllDTOOutputList {
  groupAllDTOOutputList: {id: number, name: string}[]
}

export interface IGruposServicosComTotal {
  data: Idata,
  totalCount: number
}
export interface IGruposServicos {
  data: IGroupAllDTOOutputList,
}

// ------------------------------

export interface IdataService {
  serviceDTOOutputList: IServiceDTOOutputList
}
export interface IServiceDTOOutputList {  
    id: number,
    name: string,
    description: string,
    groupServices: {
      id: number,
      name: string    
  }
}

export interface IServiceComTotalCount {
  data : IdataService[],
  totalCount: number
}

