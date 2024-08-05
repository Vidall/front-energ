import { Environment } from '../../../Enviroment';
import { ApiTS } from '../axios-config';
import { IPessoaFisica, TPessoa } from '../models/Clientes';
import axios from 'axios';

interface IPessoaFisicaComTotalCount {
  data: IPessoaFisica[],
  totalCount: number 
}

const create = async (pessoa: TPessoa): Promise<{id: number} | Error > => {
  try {
    const urlRelativa = `${Environment.CAMINHO_PESSOA_FISICA}`;
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

const getAll = async (filter= '', page = 1, limit = Environment.LIMITE_DE_LINHAS): Promise<IPessoaFisicaComTotalCount| Error> => {
  try {
    const urlRelativa = `${Environment.CAMINHO_PESSOA_FISICA}?page=${Number(page)}&limit=${limit}&filter=${filter}`;
    const { data, headers } = await ApiTS.get(urlRelativa);

    if(headers) {
      alert('pegou o header');
    }else {
      alert('não pegou o header');
    }

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS)
      };
    }

    return new Error('Erro ao listar os registros');
  } catch (error) {
    console.log(error);

    // Se o erro for uma instância de AxiosError
    if (axios.isAxiosError(error)) {
      // Verifica se o erro tem uma resposta com dados de erro
      if (error.response?.data && typeof error.response.data === 'object' && 'errors' in error.response.data) {
        return new Error((error.response.data).errors.default || 'Erro ao listar os registros');
      }
    }

    return new Error('Erro ao listar os registros');
  }
};

const getByID = async (id: number): Promise<TPessoa | Error > => {
  try {
    const urlRelativa = `${Environment.CAMINHO_PESSOA_FISICA}/${id}`;
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
    const urlRelativa = `${Environment.CAMINHO_PESSOA_FISICA}/${id}`;
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

export const PessoaFisicaService = {
  getAll,
  create,
  getByID,
  updateById
};
