import { Environment } from '../../../Enviroment';
import { ApiTS } from '../axios-config';
import axios from 'axios';
import { IUpdateTecnico } from '../models/Tecnico';

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

const create = async (tecnico: ITecnico): Promise<{ id: number } | Error> => {
  try {
    const urlRelativa = `${Environment.CAMINHO_TECNICOS}`;

    const formData = new FormData();
    formData.append('nome', tecnico.nome);
    formData.append('cpf', tecnico.cpf);
    formData.append('email', tecnico.email);
    formData.append('senha', tecnico.senha);
    formData.append('telefone', tecnico.telefone);
    formData.append('admin', tecnico.admin.toString());
    if (tecnico.file) {
      formData.append('file', tecnico.file);
    }

    const response = await ApiTS.post(urlRelativa, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return new Error('Erro ao cadastrar o registro intancia');
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

const getByID = async (id: number): Promise<ITecnico | Error > => {
  try {
    const urlRelativa = `${Environment.CAMINHO_TECNICOS}/${id}`;
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

const updateById = async(id: number, tecnico: IUpdateTecnico): Promise<IUpdateTecnico | Error> => {
  try {
    const urlRelativa = `${Environment.CAMINHO_TECNICOS}/${id}`;

    const formData = new FormData();
    formData.append('nome', tecnico.nome!);
    formData.append('cpf', tecnico.cpf!);
    formData.append('email', tecnico.email!);
    tecnico.senha ? formData.append('senha', tecnico.senha): null;
    tecnico.updateSenha ? formData.append('updateSenha', tecnico.updateSenha): null;
    formData.append('telefone', tecnico.telefone!);
    formData.append('admin', tecnico.admin!.toString());
    if (tecnico.file) {
      formData.append('file', tecnico.file);
    }

    const response = await ApiTS.put(urlRelativa, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return new Error('Erro ao cadastrar o registro');
    }

  } catch (error) {
    console.log(error);

    if (axios.isAxiosError(error)) {
      // Verifica se o erro tem uma resposta com dados de erro

      if (error.response?.data && typeof error.response.data === 'object') {

        const errors = error.response.data;

        console.log(errors);

        return new Error(JSON.stringify(errors) || 'Erro ao atualizar o registro bbb');
      }
    }

    return new Error('Erro ao cadastrar o registro aaa');
  }
};

export const TecnicoService = {
  getAll,
  create,
  getByID,
  updateById
};
