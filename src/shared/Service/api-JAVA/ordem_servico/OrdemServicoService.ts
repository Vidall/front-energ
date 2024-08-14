import axios from 'axios';
import { Environment } from '../../../Enviroment';
import { ApiOS } from '../axios-config';
import { IGrupoServicosCreated, IGruposServicosComTotal, IServiceComTotalCount, IServices } from '../models/GruposServicos';
import { IGetByIdOrdemStart, IOrdemComTotalCount, IOs, IReturnGetAllOs } from '../models/OrdemServico';

const create = async (servico: IOs): Promise<IOs | Error> => {
  try {
    const urlRelativa = `${Environment.CAMINHO_ORDEM}`;

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

const getAll = async (): Promise<IOrdemComTotalCount | Error> => {
  try {
    const urlRelativa = `${Environment.CAMINHO_ORDEM}`;
    const { data, headers } = await ApiOS.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-pages'] || Environment.LIMITE_DE_LINHAS)
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

const getAllFilter = async (dataInicio: string, dataFim: string): Promise<IOrdemComTotalCount | Error> => {
  try {
    const urlRelativa = `${Environment.CAMINHO_ORDEM}/filtro?startDay=${dataInicio}&endDay=${dataFim}`;
    const { data, headers } = await ApiOS.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-pages'] || Environment.LIMITE_DE_LINHAS)
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

const getByID = async (id: number, currentPage: number): Promise<IServiceComTotalCount | Error > => {
  try {
    const urlRelativa = `${Environment.CAMINHO_GRUPOS_SERVICOS}/${id}?page=${currentPage}`;
    const {data, headers} = await ApiOS.get(urlRelativa);

    if (data) {
      return {
        _embedded: data._embedded,
        totalCount: Number(headers['x-total-pages'] || Environment.LIMITE_DE_LINHAS)
      };
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

const getByIdOrdemStart = async (id: number): Promise<IGetByIdOrdemStart | Error > => {
  try {
    const urlRelativa = `${Environment.CAMINHO_ORDEM}/${id}`;
    const {data} = await ApiOS.get(urlRelativa);

    if (data) {
      return data;
    } else {
      return new Error('Erro ao consultar o registro');
    }

  } catch (error) {
    console.log(error);

    // Se o erro for uma instância de AxiosError
    if (axios.isAxiosError(error)) {
      // Verifica se o erro tem uma resposta com dados de erro
      if (error.response?.data && typeof error.response.data === 'object' && 'errors' in error.response.data) {
        return new Error((error.response.data).errors.default || 'Erro ao consultar o registro');
      }
    }

    return new Error('Erro ao consultar o registro');
  }
};

const StartOrCancelOrFinish = async(id: number, acao: 'iniciar' | 'cancelar' | 'finalizar'): Promise<void | Error> => {
  try {
    const urlRelativa = `${Environment.CAMINHO_ORDEM}/${id}/${acao}`;

    const data = await ApiOS.put(urlRelativa);

    if (data) {
      return;
    } else {
      return new Error('Erro ao executar o serviço');
    }

  } catch (error) {
    console.log(error);
    // if (axios.isAxiosError(error)) {
    //   // Verifica se o erro tem uma resposta com dados de erro

    //   if (error.response?.data && typeof error.response.data === 'object') {

    //     const errors = error.response.data;

    //     console.log(errors);

    //     return new Error(JSON.stringify(errors) || 'Erro ao executar o serviço');
    //   }
    // }

    return new Error('Erro ao cadastrar o registro');
  }
};

export const OrdemServicoService = {
  getAll,
  create,
  getByID,
  StartOrCancelOrFinish,
  getAllFilter,
  getByIdOrdemStart
};
