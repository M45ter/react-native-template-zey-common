/**
 * @format
 */
import {Portal} from '@ant-design/react-native';
import Toast from '../util/ToastUtils';
import ApiException from './ApiException';
import NavigationService from '../router/NavigationService';

const toLogin = () => {
  storage.remove({key: 'loginRes'});
  NavigationService.navigate('Login');
};

export default class Request {
  static errorHandler(error, showError) {
    if (error instanceof ApiException) {
      if (error.code === ApiException.ERROR_TOKEN_EXPIRED) {
        toLogin();
      } else if (showError) {
        Toast.show(error.message);
      }
    } else {
      if (showError) {
        Toast.show('未知异常');
      }
    }
  }

  static req(
    method,
    url,
    params,
    data,
    {showLoading = true, loadingMsg = '加载中', showError = true} = {},
    headers,
  ) {
    let key;
    if (showLoading === true) {
      key = Toast.loading(loadingMsg, 0);
    }
    // let data = method.toLocaleLowerCase() === 'get' ? 'params' : 'data';
    // return http({method, url, [data]: params})
    return http({method, url, params, data, headers})
      .then(ret => {
        if (showLoading === true) {
          Portal.remove(key);
        }
        return ret;
      })
      .catch(err => {
        if (showLoading === true) {
          Portal.remove(key);
        }
        this.errorHandler(err, showError);
        throw err;
      });
  }
}
