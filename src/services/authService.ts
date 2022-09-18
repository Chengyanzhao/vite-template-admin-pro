import axios from 'axios';
import { notification, message } from 'antd';
import { gotoSsoLoginPage, httpCode } from './util';

const baseURL = 'https://mock.apifox.cn/m1/1629845-0-default';

const instance = axios.create({
  baseURL,
  timeout: 6000,
  withCredentials: true,
});

// 请求拦截
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error.response) {
      // 根据请求失败的http状态码去给用户相应的提示
      const tips =
        error.response.status in httpCode
          ? httpCode[error.response.status]
          : error.response.data.message;
      message.error(tips);
      // token或者登陆失效情况下跳转到登录页面，根据实际情况，在这里可以根据不同的响应错误结果，做对应的事。这里我以401判断为例
      if (error.response.status === 401) {
        // 针对框架跳转到登陆页面
        gotoSsoLoginPage();
      }
      return Promise.reject(error);
    } else {
      message.error('请求超时, 请刷新重试');
      return Promise.reject(new Error('请求超时, 请刷新重试'));
    }
  },
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    const res: any = response.data;
    if (res) {
      if (res.status === 404) {
        // 登录失效
        message.error('登录失效，请重新登录', 1, () => {
          // gotoSsoLoginPage();
        });
      }
      if (res.code === 200 || res.code === 0) {
        return Promise.resolve(res.data);
      } else if (res.code === 600010 || res.code === 600011) {
        // 登录失效
        message.error('登录失效，请重新登录', 1, () => {
          // gotoSsoLoginPage();
        });
      } else if (res.code === 300016) {
        // 无权限
        message.error('当前站点无权限，请联系管理员授权', 1, () => {
          // gotoSsoLoginPage();
        });
      } else {
        notification.error({ message: res.message });
        return Promise.reject(res);
      }
    } else {
      return Promise.reject(res);
    }
    if (res.success === false) {
      notification.error({ message: res.message });
    }
    return response;
  },
  (error) => {
    if (
      error.code === 'ECONNABORTED' &&
      error.message.indexOf('timeout') !== -1
    ) {
      const { config } = error;
      config.__retryCount = config.__retryCount || 0;
      if (config.__retryCount >= config.retry) {
        message.error('请求超时，请稍后再试');
        return Promise.reject(error);
      }

      // Increase the retry count
      config.__retryCount += 1;

      // Create new promise to handle exponential backoff
      const backoff = new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, config.retryDelay || 1);
      });

      return backoff
        .then(() => {
          return axios(config);
        })
        .catch(() => {
          message.error('请求超时，请稍后再试');
          return Promise.reject();
        });
    } else {
      return Promise.reject(error);
    }
  },
);

export default instance;
