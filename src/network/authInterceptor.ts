import { auth } from '@/modules/auth/store';

const authInterceptor = (configs: any) => {
  configs.headers = {
    // @ts-ignore
    Authorization: `Bearer ${auth.state.jwtToken}`,
  };
  return configs;
};

export default authInterceptor;
