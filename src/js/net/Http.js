/**
 * @format
 */
import axios from 'axios';
import * as Config from '../constant/Config';
import ApiException from './ApiException';

const http = axios.create({
  baseURL: Config.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

http.interceptors.request.use(
  async config => {
    if (__DEV__) {
      console.log('http config = ' + JSON.stringify(config));
    }
    try {
      let userInfo = await storage.load({key: 'loginRes'});
      if (userInfo) {
        config.headers.token = userInfo.token;
      }
    } catch (e) {
      console.log(e);
    }
    return config;
  },
  error => {
    console.log('axios request error ', error);
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  response => {
    if (__DEV__) {
      console.log('http response = ', response);
    }
    if (response && response.status === 200) {
      let result = response.data;
      if (result.code === '00') {
        if (__DEV__) {
          console.log('http result = ' + JSON.stringify(result));
        }
        return Promise.resolve(result.data);
      } else if (result.code === '101') {
        return Promise.reject(
          new ApiException(ApiException.ERROR_TOKEN_EXPIRED, result.msg),
        );
      } else {
        return Promise.reject(
          new ApiException(ApiException.ERROR_FALSE, result.msg),
        );
      }
    } else {
      console.log('axios response ', response);
      return Promise.reject(
        new ApiException(ApiException.ERROR_NETWORK, '网络错误或请求异常'),
      );
    }
  },
  error => {
    console.log('axios response error ' + JSON.stringify(error));
    // 请求本身的异常，网络连接问题等
    let apiException;
    if (error.message === 'Network Error') {
      apiException = new ApiException(ApiException.ERROR_CONNECT, '连接失败');
    } else if (error.code === 'ECONNABORTED') {
      apiException = new ApiException(ApiException.ERROR_CONNECT, '请求超时');
    } else if (
      error.response &&
      (error.response.status === 500 ||
        error.response.status === 502 ||
        error.response.status === 503 ||
        error.response.status === 504)
    ) {
      apiException = new ApiException(ApiException.ERROR_CONNECT, '服务器错误');
    } else if (error.response && error.response.status === 404) {
      apiException = new ApiException(
        ApiException.ERROR_CONNECT,
        '服务器找不到指定的资源',
      );
    } else {
      apiException = new ApiException(ApiException.ERROR_UNKNOWN, '未知错误');
    }
    return Promise.reject(apiException);
  },
);

global.http = http;
