//可以配置多个实例
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8070'

export function request(config) {
  // 创建axios的实例
  const instance = axios.create({
    baseURL: 'http://localhost:8070',
    timeout: 5000,
  })
  instance.interceptors.request.use(config =>{
    config.headers.Authorization = window.sessionStorage.getItem("token")
    return config
  })
  return instance(config)
}

export function requestPost(url,params) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: 'http://localhost:8070',
      timeout: 5000
    })
    instance({
      url: url,
      method: 'post',
      data: params,
      transformRequest: [function (data) {
        let ret = ''
        for(let it in data){
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res =>{
      resolve(res)
    }).catch(err =>{
      reject(err)
    })
  })
}





