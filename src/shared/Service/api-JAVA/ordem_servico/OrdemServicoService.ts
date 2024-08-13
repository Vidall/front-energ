import axios from 'axios';
import { Environment } from '../../../Enviroment';
import { ApiOS } from '../axios-config';
import { IGrupoServicosCreated, IGruposServicosComTotal, IServiceComTotalCount, IServices } from '../models/GruposServicos';
import { IOrdemComTotalCount, IOs, IReturnGetAllOs } from '../models/OrdemServico';

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

// const updateById = async(id: number, tecnico: IUpdateTecnico): Promise<IUpdateTecnico | Error> => {
//   try {
//     const urlRelativa = `${Environment.CAMINHO_TECNICOS}/${id}`;

//     const formData = new FormData();
//     formData.append('nome', tecnico.nome!);
//     formData.append('cpf', tecnico.cpf!);
//     formData.append('email', tecnico.email!);
//     tecnico.senha ? formData.append('senha', tecnico.senha): null;
//     tecnico.updateSenha ? formData.append('updateSenha', tecnico.updateSenha): null;
//     formData.append('telefone', tecnico.telefone!);
//     formData.append('admin', tecnico.admin!.toString());
//     if (tecnico.file) {
//       formData.append('file', tecnico.file);
//     }

//     const response = await ApiOS.put(urlRelativa, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });

//     if (response.status >= 200 && response.status < 300) {
//       return response.data;
//     } else {
//       return new Error('Erro ao cadastrar o registro');
//     }

//   } catch (error) {
//     console.log(error);

//     if (axios.isAxiosError(error)) {
//       // Verifica se o erro tem uma resposta com dados de erro

//       if (error.response?.data && typeof error.response.data === 'object') {

//         const errors = error.response.data;

//         console.log(errors);

//         return new Error(JSON.stringify(errors) || 'Erro ao atualizar o registro bbb');
//       }
//     }

//     return new Error('Erro ao cadastrar o registro aaa');
//   }
// };

export const OrdemServicoService = {
  getAll,
  create,
  getByID,
  // updateById,
  getAllFilter
};
