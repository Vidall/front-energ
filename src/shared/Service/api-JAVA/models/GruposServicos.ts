export interface IGrupo {
  id: number,
  name: string
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

export interface IServices {
  id: number,
  name: string,
  description: string,
  groupServices: {
    id: number,
    name: string    
  }
}

export interface IdataService {
  _embedded: IServiceDTOOutputList
}
export interface IServiceDTOOutputList {  
  serviceDTOOutputList: IServices[]
} 

export interface IServiceComTotalCount {
  _embedded : IServiceDTOOutputList,
  totalCount: number
}

