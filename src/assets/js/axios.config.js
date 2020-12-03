import Vue from 'vue';
import axios from 'axios';

// 设置axios的baseurl
axios.defaults.baseURL = "https://www.fastmock.site/mock/4f83e504e3c38364466f11d9c67169fa/app/";

// 请求拦截
axios.interceptors.response.use((res) => {
  return res.data.data
},(error) => {
  return Promise.reject(error)
})
Vue.prototype.$http = axios;