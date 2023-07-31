import { useAxios } from '@vueuse/integrations/useAxios';
import axios from 'axios';
import { showToast } from 'vant/lib/toast';

// create an axios instance
const instance = axios.create({
  baseURL: '/third',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 100000,
});

// request interceptor
instance.interceptors.request.use(
  (config) => {
    config.headers['Token'] = '8d45fa21dc714550a0bde799dd85cd08';
    config.headers['source'] = 'CIRCLEASSISTANT-DAYPERFORMANCE-SERVER';
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

// response interceptor
instance.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;
    return res;
    // if the custom code is not 200, it is judged as an error.
    // if (res.code !== 200) {
    //   showToast(res.msg);
    //   // 412: Token expired;
    //   if (res.code === 412) {
    //     // store.dispatch('user/userLogout');
    //   }
    //   return Promise.reject(res.msg || 'Error');
    // } else {
    //   return res;
    // }
  },
  (error) => {
    console.log('err' + error);
    showToast(error.message);
    return Promise.reject(error.message);
  },
);

/**
 * reactive useFetchApi
 */

export default instance;
