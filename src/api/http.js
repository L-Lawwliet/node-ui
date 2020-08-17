import axios from 'axios'

export default {
    post(url, data) {
      return axios({
        method: 'post',
        url,
        data,
        headers: {
          'access_token': localStorage.getItem('access_token')
          // 'Content-Type': 'application/json',
          // 'Accept': 'application/json',
        }
      })
    },
    get(url, params) { // get
      return axios({
        method: 'get',
        url: url + '?access_token=' + localStorage.getItem('access_token'),
        // baseURL: '/lyt',
        params,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'access_token': localStorage.getItem('access_token')
          // 'Cookie': 'JSESSIONID=' + localStorage.getItem('sessionid')
        },
      })
    }
  }