import axios from 'axios';

// 设置超时时间
axios.defaults.timeout = 10000;
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

//对外接口
export default function request({ method, url, params }) {
  if (method == 'GET') {
    return get(url, params);
  } else if (method == 'POST') {
    return post(url, params);
  }
}

// 封装get方法
function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// 封装post方法
function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, JSON.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

//请求拦截(请求发出前处理请求)
axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.error(error);
  },
);

// 响应拦截器（处理响应数据）
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      //这个地方可以由后台编辑状态码区分不同情况，做不同的逻辑处理
      return Promise.reject(response);
    }
  },
  error => {
    return Promise.reject(error.response);
  },
);
