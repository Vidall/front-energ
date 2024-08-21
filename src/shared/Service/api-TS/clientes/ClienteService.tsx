import { Environment } from '../../../Enviroment';
import { ApiTS } from '../axios-config';

const deleteById = async (id: number, rota: 'fisico' | 'juridico'): Promise<void | Error> => {
  try {
    const urlRelativa = rota === 'fisico' ? `${Environment.CAMINHO_PESSOA_FISICA}/${id}` : `${Environment.CAMINHO_PESSOA_JURIDICA}/${id}`;

    const response = await ApiTS.delete(urlRelativa);

    if (response.status === 204 || response.status === 200) {
      // 204 No Content é comum para DELETE; 200 OK também pode ser retornado
      return;
    }

    return new Error('Erro ao deletar cliente');

  } catch (error) {
    console.log(error); // Corrigi para capturar e exibir o erro corretamente
    return new Error('Erro ao deletar cliente');
  }
};

export const ClienteService = {
  deleteById
};
