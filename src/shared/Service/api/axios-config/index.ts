import axios from 'axios';
import { errorInterceptor, responseInterceptor } from './interceptors';
import { Environment } from '../../../Enviroment/index';

const Api = axios.create({
  baseURL: Environment.URL_BASE_API_TS
});

Api.interceptors.response.use(
  (Response) => responseInterceptor(Response),
  (error) => errorInterceptor(error)
);

export {Api};