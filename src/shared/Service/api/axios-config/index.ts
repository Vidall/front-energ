import axios from 'axios';
import { errorInterceptor, responseInterceptor } from './interceptors';
import { Environment } from '../../../Enviroment/index';

const ApiTS = axios.create({
  baseURL: Environment.URL_BASE_API_TS
});

ApiTS.interceptors.response.use(
  (Response) => responseInterceptor(Response),
  (error) => errorInterceptor(error)
);

export {ApiTS};