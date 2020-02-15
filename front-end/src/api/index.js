import Vue from 'vue'
import axios from 'axios'

// axios 配置
axios.defaults.timeout = 10000  // 限制最长请求时间
axios.defaults.baseURL = 'http://localhost:3000'  // 基础API地址

// 判断返回状态,响应拦截
axios.interceptors.response.use((res) => {
  if (res.code !== 200) {
    alert('网络异常')
    return Promise.reject(res)
  }
  return res
}, (error) => {
  alert('网络异常')
  return Promise.reject(error)
})

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, params)
    .then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data)
    })
  })
}

export function post(url, params) {
  return new Promise((resolve, reject) => {
       axios.post(url, params)
      .then(res => {
          resolve(res.data);
      })
      .catch(err =>{
          reject(err.data)
      })
  });
}