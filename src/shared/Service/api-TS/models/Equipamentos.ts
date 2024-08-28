export interface IEquipamento {
  id: number,
  tipo: string,
  equipamento: {
    numeroAlternador: string,
    numeroMotor: string,
    numero:string,
    anoFabricacao: string,
    potenciaEletrica: string,
    potencia: string,
    motor:string,
    alternador:string,
    uscaModelo:string,
    tensao: string,
    corrente: string,
    modeloMotor:string,
    modeloAlternador:string,
    painelControle:string,
    fabricante:string,
    fatorPotencia: string,
    frequencia: string,
    horimetro: string,
    tipoEquipamento:string
  },
  idCliente:number
 }

export interface IEquipamentoDetalhe {
  numeroAlternador: string,
  numeroMotor: string,
  numero:string,
  anoFabricacao: string,
  potenciaEletrica: string,
  potencia: string,
  motor:string,
  alternador:string,
  uscaModelo:string,
  tensao: string,
  corrente: string,
  modeloMotor:string,
  modeloAlternador:string,
  painelControle:string,
  fabricante:string,
  fatorPotencia: string,
  frequencia: string,
  horimetro: string,
  tipoEquipamento:string
 }
