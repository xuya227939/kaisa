import axios from 'axios';

// 创建axios实例
const service = axios.create({
  baseURL: 'https://service-support-test.ikandy.cn/api/',
  timeout: 50000,
  withCredentials: false, // 跨域携带cookie
  xsrfCookieName: 'xsrf-token', //当创建实例的时候配置默认配置,
});

// 请求拦截器
service.interceptors.request.use(
  function (config) {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    config.headers['access-token'] =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZ2VudElkIjoiNWU4ZDNiMWYzODFhYTQzMWExNGVlNmI0Iiwicm9sZUxldmVsIjoiMSIsInRlbmFudElkIjoiNWRiMjZmMjY5N2ZmMDllZTQ0MTBmNGEzIiwib3JnSWQiOiI1ZGIyNmU3NTk3ZmYwOWVlNDQxMGRjZmQiLCJpYXQiOjE2Mjc0NTA2MDAsImV4cCI6MTYyNzUzNzAwMH0.Blwz02cfYzkHgez8J0TfQ8EzPHV-4jYzIZrIeRmKUX4';
    // 每次请求带上时间戳 防刷处理
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        timestamp: Date.parse(new Date()) / 1000,
      };
    }
    return config;
  },
  function (error) {
    // return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    return res;
  },
  error => {
    // return Promise.reject(error);
  },
);

export default service;
