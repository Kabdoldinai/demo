import axios from 'axios';
import authInterceptor from '@/network/authInterceptor';
import loggerInterceptor from '@/network/loggerInterceptor';
import unautorizedInterceptor from '@/network/unautorizedInterceptor';
import {configParams} from '@/network/config';

// TODO: get base url from config env
const config = {
  baseURL: configParams.baseURl,
};

const droneApi = axios.create(config);

droneApi.interceptors.request.use(authInterceptor);
droneApi.interceptors.request.use(loggerInterceptor);
droneApi.interceptors.response.use((response) => response, unautorizedInterceptor);
// droneApi.interceptors.response.use(errorInterceptor);

export { droneApi };
