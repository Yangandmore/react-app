import frequest from './request';
import config from '../../config';

const hrequest = frequest;

// 请求错误处理
const responseError = (res) => {
  let result = {
    errcode: -1,
  };
  if (typeof res === 'string') {
    result = { ...result, errmsg: res };
  }
  if (typeof res === 'object') {
    result = {
      errcode: res.body.errcode,
      errmsg: res.body.errmsg,
    };
  }
  return result;
};

// 请求入口
const request = async (options, dispatch, getState) => {
  const { url, endpoint, ...rest } = options;
  const setUrl = config.url;
  const opts = {
    url: url || `${setUrl}${endpoint}`,
    ...rest,
  };

  try {
    const res = await hrequest(opts);

    const { errcode, errmsg } = res.body;
    if (errcode && errcode !== 0) {
      return Promise.reject(res);
    }
    return Promise.resolve(res);
  } catch (e) {
    return Promise.reject(e);
  }
};

export { request, responseError, hrequest };
