import axios from 'axios';
import { Environment } from '../../../Enviroment';
import { ApiTS } from '../axios-config';
import { IPessoaJuridica, TPessoa } from '../models/Clientes';

interface IPessoaJuridicaComTotalCount {
  data: IPessoaJuridica[],
  totalCount: number 
}

const create = async (pessoa: TPessoa): Promise<{id: number} | Error > => {
  try {
    const urlRelativa = `${Environment.CAMINHO_PESSOA_JURIDICA}`;
    const response = await ApiTS.post(urlRelativa, pessoa);

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return new Error('Erro ao cadastrar o registro');
    }

  } catch (error) {
    console.log(error);

    // Se o erro for uma instância de AxiosError
    if (axios.isAxiosError(error)) {
      // Verifica se o erro tem uma resposta com dados de erro
      if (error.response?.data && typeof error.response.data === 'object' && 'errors' in error.response.data) {
        return new Error((error.response.data).errors.default || 'Erro ao cadastrar o registro');
      }
    }

    return new Error('Erro ao cadastrar o registro');
  }
};

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

const getByID = async (id: number): Promise<TPessoa | Error > => {
  try {
    const urlRelativa = `${Environment.CAMINHO_PESSOA_JURIDICA}/${id}`;
    const response = await ApiTS.get(urlRelativa);

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return new Error('Erro ao cadastrar o registro');
    }

  } catch (error) {
    console.log(error);

    // Se o erro for uma instância de AxiosError
    if (axios.isAxiosError(error)) {
      // Verifica se o erro tem uma resposta com dados de erro
      if (error.response?.data && typeof error.response.data === 'object' && 'errors' in error.response.data) {
        return new Error((error.response.data).errors.default || 'Erro ao cadastrar o registro');
      }
    }

    return new Error('Erro ao cadastrar o registro');
  }
};

const updateById = async(id: number, dados: TPessoa): Promise<TPessoa | Error> => {
  try {
    const urlRelativa = `${Environment.CAMINHO_PESSOA_JURIDICA}/${id}`;
    const { data } = await ApiTS.put(urlRelativa, dados);

    if (data) {
      return data;
    }

    return new Error('Erro ao atualizar o registro');

  } catch (error) {
    console.log(error);

    if (axios.isAxiosError(error)) {
      // Verifica se o erro tem uma resposta com dados de erro
      if (error.response?.data && typeof error.response.data === 'object' && 'errors' in error.response.data) {
        return new Error((error.response.data).errors.default || 'Erro ao atualizar o registro');
      }
    }

    return new Error('Erro ao cadastrar o registro');
  }
};

export const PessoaJuridicaService = {
  getAll,
  getByID,
  updateById,
  create
};