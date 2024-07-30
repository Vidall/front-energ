import { Environment } from '../../../Enviroment';
import { ApiTS } from '../axios-config';
import { IPessoaJuridica } from '../models/Clientes';

interface IPessoaJuridicaComTotalCount {
  data: IPessoaJuridica[],
  totalCount: number 
}

const getAll = async (filter= '', page = 1, limit = Environment.LIMITE_DE_LINHAS): Promise<IPessoaJuridicaComTotalCount| Error> => {
  try {
    const urlRelativa = `${Environment.CAMINHO_PESSOA_JURIDICA}?page=${Number(page)}&limit=${limit}&filter=${filter}`;
    const { data, headers} = await ApiTS.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS)
      };
    }

    return new Error('Erro ao listar os registros');
  } catch (error) {
    console.log(error);

    return new Error((error as {message: string}).message || 'Erro ao listar os registros');
    
  }
};

export const PessoaJuridicaService = {
  getAll
};