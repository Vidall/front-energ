import axios from 'axios';
import { Environment } from '../../../Enviroment';
import { ApiOS } from '../axios-config';
import { IGrupoServicosCreated, IGruposServicosComTotal, IServices } from '../models/GruposServicos';
import { IServiceIndividual } from '../models/Servicos';

const create = async (id: number, servico: Omit<IServices, 'id' | 'groupServices'>): Promise<IGrupoServicosCreated | Error> => {
  try {
    const urlRelativa = `${Environment.CAMINHO_GRUPOS_SERVICOS}/${id}/service`;

    const response = await ApiOS.post(urlRelativa, servico);

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return new Error('Erro ao cadastrar o registro');
    }

  } catch (error) {
    console.log(error);

    // // Se o erro for uma instância de AxiosError
    // if (axios.isAxiosError(error)) {
    //   // Verifica se o erro tem uma resposta com dados de erro
    //   if (error.response?.data && typeof error.response.data === 'object' && 'errors' in error.response.data) {
    //     return new Error((error.response.data).errors.default || 'Erro ao cadastrar o registro');
    //   }
    // }

    return new Error('Erro ao cadastrar o registro error');
  }
};

const getAll = async (): Promise<IGruposServicosComTotal | Error> => {
  try {
    const urlRelativa = `${Environment.CAMINHO_GRUPOS_SERVICOS}`;
    const { data, headers } = await ApiOS.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS)
      };
    }

    return new Error('Erro ao listar os registros');
  } catch (error) {
    console.log(error);

    // // Se o erro for uma instância de AxiosError
    // if (axios.isAxiosError(error)) {
    //   // Verifica se o erro tem uma resposta com dados de erro
    //   if (error.response?.data && typeof error.response.data === 'object' && 'errors' in error.response.data) {
    //     return new Error((error.response.data).errors.default || 'Erro ao listar os registros');
    //   }
    // }

    return new Error('Erro ao listar os registros');
  }
};

const getByID = async (id: number): Promise<IServiceIndividual | Error > => {
  try {
    const urlRelativa = `${Environment.CAMINHO_SERVICOS}/${id}`;
    const {data} = await ApiOS.get(urlRelativa);

    if (data) {
      return data;
    } else {
      return new Error('Erro ao cadastrar o registro aa');
    }

  } catch (error) {
    console.log(error);

    // Se o erro for uma instância de AxiosError
    if (axios.isAxiosError(error)) {
      // Verifica se o erro tem uma resposta com dados de erro
      if (error.response?.data && typeof error.response.data === 'object' && 'errors' in error.response.data) {
        return new Error((error.response.data).errors.default || 'Erro ao cadastrar o registro bb');
      }
    }

    return new Error('Erro ao cadastrar o registro');
  }
};

const updateById = async (id: number, servico: Omit<IServices, 'id' | 'groupServices'>): Promise<void | Error> => {
  try {
    const urlRelativa = `${Environment.CAMINHO_SERVICOS}/${id}`;

    const { data } = await ApiOS.put(urlRelativa, servico);

    if (data) {
      return;
    } else {
      return new Error('Erro ao Atualizar o registro');
    }

  } catch (error) {
    console.log(error);

    if (axios.isAxiosError(error)) {
      // Verifica se o erro tem uma resposta com dados de erro

      if (error.response?.data && typeof error.response.data === 'object') {

        const errors = error.response.data;

        console.log(errors);

        return new Error(JSON.stringify(errors) || 'Erro ao atualizar o registro');
      }
    }

    return new Error('Erro ao cadastrar o registro');
  }
};

export const ServicosService = {
  getAll,
  create,
  getByID,
  updateById
};
