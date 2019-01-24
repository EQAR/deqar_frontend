import axios from 'axios';

const axiosBearerInterceptor = () => {
  axios.interceptors.request.use(function(config) {
    const token = sessionStorage.getItem('token');

    if ( token != null ) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }, function(err) {
    return Promise.reject(err);
  });
};

export default axiosBearerInterceptor;
