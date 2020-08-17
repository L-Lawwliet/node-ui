// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'font-awesome/less/font-awesome.less'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
import Element from 'element-ui'
import {
  Message
} from 'element-ui';
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import router from './router'
import store from './store'

Vue.use(Element)

Vue.config.productionTip = false

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'api/';
// http request 拦截器
axios.interceptors.request.use(
  config => {
    console.log(config);
    if (config.url == 'https://up-z2.qbox.me') {
      return config
    }
    if (localStorage.token) {
      config.data.token = localStorage.token
    }

    config.data = qs.stringify(config.data)
    return config
  },
  error => {
    return Promise.reject(error);
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    checkStatus(response);
    return response
  },
  error => {
    checkStatus(error.response);
    return error.response;
  }
)

function checkStatus(response) {
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304)) {
    if (response.data.msg == 'token error!') {
      router.replace('/signin')
    } else {
      return response
    }
  } else if (response.status === 400) {
    Message('请求无效')
  } else if (response.status === 401) {
    Message('未登录或登录已失效,请重新登录')
    router.replace('/signin')
  } else if (response.status === 404) {
    Message('请求无效')
  } else if (response.status === 500) {
    Message('服务器错误')
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
