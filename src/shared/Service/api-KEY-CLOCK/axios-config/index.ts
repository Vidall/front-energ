import axios from 'axios';
import { errorInterceptor, responseInterceptor } from './interceptors';
import { Environment } from '../../../Enviroment/index';

const ApiKeyClock = axios.create({
  baseURL: Environment.URL_BASE_KEY_CLOCK
});

ApiKeyClock.interceptors.response.use(
  (Response) => responseInterceptor(Response),
  (error) => errorInterceptor(error)
);

export {ApiKeyClock};