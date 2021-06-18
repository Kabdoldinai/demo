const errorInterceptor = (error: any) => {
    /** Do something with response error */
    return Promise.reject(error);
};

export default errorInterceptor;
