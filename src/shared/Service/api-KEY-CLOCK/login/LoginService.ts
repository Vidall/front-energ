// import { Environment } from '../../../Enviroment';
// import { ApiKeyClock } from '../axios-config';
// import axios from 'axios';
// import { ILogin, IRetornoLogin } from '../models/Login';

// interface ITecnicoComTotalCount {
//   data: ITecnico[],
//   totalCount: number 
// }

// export interface ITecnico {
//   id?: number,
//   nome: string;
//   cpf: string;
//   email: string;
//   senha: string;
//   telefone: string;
//   admin: boolean;
//   pathAssinatura?: string;
//   file?: File; // Adicione esta linha para incluir o campo do arquivo

// }

// /*eslint-disable @typescript-eslint/no-unused-expressions*/

// const entrar = async (login: ILogin): Promise<IRetornoLogin | Error> => {
//   try {
//     const urlRelativa = `${Environment.CAMINHO_TOKEN_ENDPOINT}`;

//     const data = new URLSearchParams();
//     data.append('username', login.username);
//     data.append('password', login.password);
//     data.append('grant_type', login.grant_type);
//     data.append('client_id', login.client_id);

//     const response = await ApiKeyClock.post(urlRelativa, data, {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }
//     });

//     if (response.status >= 200 && response.status < 300) {
//       return response.data;
//     } else {
//       return new Error('Erro ao fazer o login');
//     }
//   } catch (error) {
//     console.log(error);

//     if (axios.isAxiosError(error)) {
//       if (error.response?.data && typeof error.response.data === 'object' && 'errors' in error.response.data) {
//         return new Error((error.response.data).errors.default || 'Erro ao cadastrar o registro');
//       }
//     }

//     return new Error('Erro ao cadastrar o registro error');
//   }
// };

// export const LoginService = {
//   entrar,
// };

export {};
