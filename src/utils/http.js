import axios from 'axios';
import qs from 'qs';

let lastConfig = '';
let lastTime = new Date().getTime();

/**
 * 防止频繁刷新
 * @param {Object} config 
 */
const throttleRequest = (config) => {
  if ((JSON.stringify(config) === lastConfig) && (new Date().getTime() - lastTime < 2000)) {
    return new Promise((resolve) => {
      resolve({
        data: {
          returnCode: 1,
          returnMessage: '请勿频繁操作'
        }
      });
    });
  }
  lastConfig = JSON.stringify(config);
  lastTime = new Date().getTime();
  return true;
};

class Http {
  constructor(config) {
    this.config = Object.assign({
      // 生产环境地址
      productionApi: '',
      // 开发环境地址        
      developmentApi: 'http://127.0.0.1:3000/',
      // token名称
      accessName: 'access_token'
    }, config);

    // axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? this.config.productionApi : this.config.developmentApi;
    axios.defaults.baseURL = '/api';
  }
  get(url, params) {
    const config = {
      url,
      data: params
    };    
    throttleRequest(config);    
    const accountInfo = localStorage.getItem(this.config.accessName);
    return axios({
      method: 'get',
      url,
      params,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: accountInfo ? JSON.parse(accountInfo).token_type + JSON.parse(accountInfo).access_token : '',
        // access_token: JSON.parse(accountInfo).access_token
        // 'Cookie': 'JSESSIONID=' + localStorage.getItem('sessionid')
      },
    });
  }
  post(url, data, type) {
    const config = {
      url,
      data
    };    
    throttleRequest(config);
    const accountInfo = localStorage.getItem(this.config.accessName);
    let contentType = 'application/x-www-form-urlencoded';
    switch (type) {
      case 'json':
        contentType = 'application/json';
        break;
      case 'form':
        contentType = 'multipart/form-data';
        break;
      default:
        break;
    }
    return axios({
      method: 'post',
      url,
      data: (type === 'json' || type === 'form') ? data : qs.stringify(data),
      headers: {
        'Content-Type': contentType,
        Accept: 'application/json',
        Authorization: accountInfo ? JSON.parse(accountInfo).token_type + JSON.parse(accountInfo).access_token : '',
        access_token: accountInfo ? JSON.parse(accountInfo).access_token : '',
      }
    });
  }
}

export default Http;
