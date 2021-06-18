const unautorizedInterceptor = (error: any) => {
  if (error.response.status === 401) {
    localStorage.clear();
    // @ts-ignore
    window.location = '/auth/login';
  } else {
    return Promise.reject(error);
  }
};

export default unautorizedInterceptor;
