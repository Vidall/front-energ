import axios from 'axios';
import { Environment } from '../../../Enviroment';
import { ApiOS } from '../axios-config';
import { IGrupoServicosCreated, IGruposServicosComTotal, IServiceComTotalCount, IServices } from '../models/GruposServicos';
import { IGetByIdOrdemStart, IOrdemComTotalCount, IOrdemFinalizacao, IOs, IPDF, IReturnGetAllOs, ISendAssinaturaCliente, IService, IServiceInOrder, IStatusGerador, ITesteGerador } from '../models/OrdemServico';

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

const createServiceInOrder = async (id: number, serviceInOrder: IServiceInOrder): Promise<void | Error> => {
  try {
    const urlRelativa = `${Environment.CAMINHO_ORDEM}/${id}/servico`;

    const response = await ApiOS.post(urlRelativa, serviceInOrder);

    if (response.status >= 200 && response.status < 300) {
      return;
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

const getAll = async (page: number): Promise<IOrdemComTotalCount | Error> => {
  try {
    const urlRelativa = `${Environment.CAMINHO_ORDEM}?page=${page - 1}`;
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

const getByID = async (id: number, currentPage: number, size: number): Promise<IServiceComTotalCount | Error > => {
  try {
    const urlRelativa = `${Environment.CAMINHO_GRUPOS_SERVICOS}/${id}?page=${currentPage}&size=${size}`;
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

const StartOrCancelOrFinish = async(id: number, acao: 'iniciar' | 'cancelar' | 'finalizar', body?: IOrdemFinalizacao): Promise<void | Error> => {
  try {
    const urlRelativa = `${Environment.CAMINHO_ORDEM}/${id}/${acao}`;

    const returnData = (data: any) => {
      if (data) {
        return;
      } else {
        return new Error('Erro ao executar o serviço');
      }
    }; 

    if (body) {
      const data = await ApiOS.put(urlRelativa, body);
      returnData(data);
    } else {
      const data = await ApiOS.put(urlRelativa);
      returnData(data);
      
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

    return new Error(`erro ao ${acao} o serviço`);
  }
};

const sendFile = async (id: number, body: FormDataEntryValue, acao: 'foto_antes' | 'foto_depois') => {
  try {
    const urlRelativa = `${Environment.CAMINHO_SERVICO_IN_ORDER}/${id}/${acao}`;

    const formData = new FormData();
    formData.append('file', body);
  
    const response = await ApiOS.post(urlRelativa, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      return new Error('Erro ao enviar a imagem');
    }
  } catch (error) {
    console.log(error);
    // Se o erro for uma instância de AxiosError
    // if (axios.isAxiosError(error)) {
    //   // Verifica se o erro tem uma resposta com dados de erro
    //   if (error.response?.data && typeof error.response.data === 'object' && 'errors' in error.response.data) {
    //     return new Error((error.response.data).errors.default || 'Erro ao cadastrar o registro');
    //   }
  }
    
  return new Error('Erro ao enviar a imagem');
};

const sendAssinaturaCliente = async (id: number, assinatura: FormDataEntryValue) => {
  try {
    const urlRelativa = `${Environment.CAMINHO_ORDEM}/${id}/assinatura_cliente`;

    const formData = new FormData();
    if (assinatura) {
      formData.append('file', assinatura);

    } else {
      return new Error('Assinatura está ausente');
    }
  
    const response = await ApiOS.post(urlRelativa, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      return new Error('Erro ao enviar a imagem');
    }
  } catch (error) {
    console.log(error);
    // Se o erro for uma instância de AxiosError
    // if (axios.isAxiosError(error)) {
    //   // Verifica se o erro tem uma resposta com dados de erro
    //   if (error.response?.data && typeof error.response.data === 'object' && 'errors' in error.response.data) {
    //     return new Error((error.response.data).errors.default || 'Erro ao cadastrar o registro');
    //   }
  }
    
  return new Error('Erro ao enviar a imagem');
};

const getByIdServiceInOrder = async (id: number): Promise< IService | Error> => {
  try {
    const urlRelativa = `${Environment.CAMINHO_SERVICO_IN_ORDER}/${id}`;
    const {data} = await ApiOS.get(urlRelativa);

    if (data) {
      return data;
    }

    return new Error('Erro ao listar o registro');
    
  } catch (error) {
    console.log(error);
    return new Error('Erro ao listar o registro');
  }
};

const createGeradorStatusOrTeste = async (id: number, form: IStatusGerador | ITesteGerador, opcao: 'gerador_teste' | 'gerador_status'): Promise<void | Error> => {
  try {
    const urlRelativa = `${Environment.CAMINHO_ORDEM}/${id}/${opcao}`;

    const response = await ApiOS.post(urlRelativa, form);

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

const getPDF = async (id: number): Promise<IPDF | Error> => {
  try {
    const urlRelativa = `${Environment.CAMINHO_ORDEM}/${id}/pdf`;

    const { data } = await ApiOS.get(urlRelativa);

    if (data) {
      return data;
    } 

    return new Error('Erro ao listar o PDF');
  } catch (error) {
    console.log(error);

    return new Error('Erro ao listar o PDF');
  }
};

export const OrdemServicoService = {
  getAll,
  create,
  getByID,
  StartOrCancelOrFinish,
  getAllFilter,
  getByIdOrdemStart,
  createServiceInOrder,
  sendFile,
  getByIdServiceInOrder,
  createGeradorStatusOrTeste,
  getPDF,
  sendAssinaturaCliente
};
