import { TPessoa } from '../Service/api-TS/models/Clientes';

export const parserDataCliente = (formData: TPessoa): TPessoa => {
  // const numeroParser = formData.endereco?.numero ? Number(formData.endereco.numero) : 0; 
  const possuiContratoParserNumber = Number(formData.possuiContrato);
  const possuiContratoParser = possuiContratoParserNumber === 1 ? true : false;

  return {
    ...formData,
    possuiContrato: possuiContratoParser,
    endereco: {...formData.endereco}
  };

};