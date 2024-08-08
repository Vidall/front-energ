export interface IEquipamento {
  id: number,
  tipo: string,
  equipamento: {
    numeroAlternador: number,
    numeroMotor: number,
    numero:string,
    anoFabricacao: number,
    potenciaEletrica: number,
    potencia: number,
    motor:string,
    alternador:string,
    uscaModelo:string,
    tensao: number,
    corrente: number,
    modeloMotor:string,
    modeloAlternador:string,
    painelControle:string,
    fabricante:string,
    fatorPotencia: number,
    frequencia: number,
    horimetro: number,
    tipoEquipamento:string
  },
  idCliente:number
 }

export interface IEquipamentoDetalhe {
  numeroAlternador: number,
  numeroMotor: number,
  numero:string,
  anoFabricacao: number,
  potenciaEletrica: number,
  potencia: number,
  motor:string,
  alternador:string,
  uscaModelo:string,
  tensao: number,
  corrente: number,
  modeloMotor:string,
  modeloAlternador:string,
  painelControle:string,
  fabricante:string,
  fatorPotencia: number,
  frequencia: number,
  horimetro: number,
  tipoEquipamento:string
 }
