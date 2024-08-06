export interface IServiceIndividual {
  name: string,
  description: string
  groupServices: {
    id: number,
    name: string
  }
}