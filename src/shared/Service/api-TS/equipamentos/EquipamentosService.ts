import { Environment } from '../../../Enviroment';
import { ApiTS } from '../axios-config';
import axios from 'axios';
import { IEquipamento } from '../models/Equipamentos';

interface ITecnicoComTotalCount {
  data: ITecnico[],
  totalCount: number 
}

export interface ITecnico {
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  telefone: string;
  admin: boolean;
  pathAssinatura?: string;
  file?: File; // Adicione esta linha para incluir o campo do arquivo

}

/*eslint-disable @typescript-eslint/no-unused-expressions*/

interface IReturCreated {
  status: number,
  message: string
}

const create = async (equipamento: Omit<IEquipamento, 'id'>): Promise<IReturCreated | Error> => {
  try {
    const urlRelativa = `${Environment.CAMINHO_EQUIPAMENTOS}`;

    const { data } = await ApiTS.post(urlRelativa, equipamento);

    if (data.status >= 200 && data.status < 300) {
      return data;
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

    return new Error('Erro ao cadastrar o registro error');
  }
};

const getAll = async (filter= '', page = 1, limit = Environment.LIMITE_DE_LINHAS): Promise<ITecnicoComTotalCount| Error> => {
  try {
    const urlRelativa = `${Environment.CAMINHO_TECNICOS}?page=${Number(page)}&limit=${limit}&filter=${filter}`;
    const { data, headers } = await ApiTS.get(urlRelativa);

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

// id do cliente
const getByID = async (id: number, tipo: 'fisico' | 'juridico'): Promise<IEquipamento[] | Error > => {
  try {
    const urlRelativa = `${Environment.CAMINHO_EQUIPAMENTOS}/${id}?tipo=${tipo}`;
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

const getByIdEquipamento = async (id: number): Promise<IEquipamento | Error > => {
  try {
    const urlRelativa = `${Environment.CAMINHO_EQUIPAMENTOS_DETALHE}/${id}`;
    const response = await ApiTS.get(urlRelativa);

    if (response) {
      return response.data;
    } else {
      return new Error('Erro ao listar o registro');
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

const updateById = async(id: number, equipamento: Partial<IEquipamento>): Promise<void | Error> => {
  try {
    const urlRelativa = `${Environment.CAMINHO_EQUIPAMENTOS}/${id}`;

    const { data } = await ApiTS.put(urlRelativa, equipamento);

    if (data.status >= 200 && data.status < 300) {
      return;
    } else {
      return new Error('Erro ao atualizar o registro');
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

const deleteByID = async (id: number, tipo: 'fisico' | 'juridico'): Promise<void | Error> => {
  try {
    const urlRelativa = `${Environment.CAMINHO_EQUIPAMENTOS}/${id}?tipo=${tipo}`;
    const { data } = await ApiTS.delete(urlRelativa);

    if (data) {
      return;
    }

    return new Error('Erro ao deletar o registro');
  } catch (error) {
    console.log(error);
    
    if (axios.isAxiosError(error)) {
      // Verifica se o erro tem uma resposta com dados de erro
      if (error.response?.data && typeof error.response.data === 'object' && 'errors' in error.response.data) {
        return new Error((error.response.data).errors.default || 'Erro ao deletar o registro');
      }
    }
  
    return new Error('Erro ao deletar o registro');
  }
};

export const EquipamentosService = {
  getAll,
  create,
  getByID,
  updateById,
  getByIdEquipamento,
  deleteByID
};
