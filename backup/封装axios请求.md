封装axios的好处：兼容多种请求方法，不需要关心是怎么调用的，只需要传入相关参数即可使用

我是在webpack项目里，用的到了ES6模块化进行封装

话不多说，上代码：

```jsx
// 引入axios
import axios from "axios";

// axios.create方法会创建一个axios实例，可传入一些默认配置
const httpServer = axios.create();

// 请求拦截，请求发送之前会触发此方法
httpServer.interceptors.request.use(
  (config) => {
    // 这里可以做一些操作
    config.method = config.method || "get"; // 区分请求方式
    return config;
  },
  (error) => {
    return Promise.reject(error); // 捕获错误
  }
);

// 返回拦截，返回之前会触发此方法
httpServer.interceptors.response.use(
  (response) => {
    // 这里可以做一些操作
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 定义请求方法
const fetchApi = (params) => {
  // 返回一个Promise
  return new Promise((resolve, reject) => {
    httpServer(params)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        // 这里可以加一些UI提示
        reject(error);
      });
  });
};

export default fetchApi;
```

如何使用？

```jsx
// 引入封装好的方法
import fetchApi from "./fetchApi.js";

// 传参
fetchApi({
  methods: "get",
  data: {
    id: 1,
    name: 2,
  },
  isLogin: true, //甚至可以有一些自定义的参数，在interceptors.request里通过config.XXX取到
}).then((res) => {
  // 取到返回值
});
```