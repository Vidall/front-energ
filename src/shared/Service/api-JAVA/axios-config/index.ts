import axios from 'axios';
import { errorInterceptor, responseInterceptor } from './interceptors';
import { Environment } from '../../../Enviroment/index';

const ApiOS = axios.create({
  baseURL: Environment.URL_BASE_API_OS
});

ApiOS.interceptors.response.use(
  (Response) => responseInterceptor(Response),
  (error) => errorInterceptor(error)
);

export {ApiOS};