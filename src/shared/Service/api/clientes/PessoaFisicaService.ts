import { Environment } from '../../../Enviroment';
import { Api } from '../axios-config';
import { IPessoaFisica } from '../models/Clientes';

interface IPessoaFisicaComTotalCount {
  data: IPessoaFisica[],
  totalCount: number 
}

const getAll = async (filter= '', page = 1, limit = Environment.LIMITE_DE_LINHAS): Promise<IPessoaFisicaComTotalCount| Error> => {
  try {
    const urlRelativa = `${Environment.CAMINHO_PESSOA_FISICA}?page=${Number(page)}&limit=${limit}&filter=${filter}`;
    const { data, headers} = await Api.get(urlRelativa);

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

export const PessoaFisicaService = {
  getAll
};