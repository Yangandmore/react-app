// 请求数据
const makeOptions = (url, options) => {
  const defaultoptions = {
    url: undefined,
    method: 'GET',
    qs: undefined,
    body: undefined,
    headers: undefined,
    type: 'json',
    contentType: 'application/json',
    crossOrigin: true,
    credentials: undefined,
  };

  let thisoptions = {};
  if (options) {
    thisoptions = options;
    if (url) {
      thisoptions.url = url;
    }
  } else {
    thisoptions.url = url;
  }
  thisoptions = { ...defaultoptions, ...thisoptions };

  return thisoptions;
};

//
const addQs = (url, qs) => {
  let queryString = '';
  let newUrl = url;
  if (qs && typeof qs === 'object') {
    for (const k of Object.keys(qs)) {
      queryString += `&${k}=${qs[k]}`;
    }
    if (queryString.length > 0) {
      if (url.split('?').length < 2) {
        queryString = queryString.substring(1);
      } else if (url.split('?')[1].length === 0) {
        queryString = queryString.substring(1);
      }
    }

    if (url.indexOf('?') === -1) {
      newUrl = `${url}?${queryString}`;
    } else {
      newUrl = `${url}${queryString}`;
    }
  }

  return newUrl;
};

//
const parseJSON = (response) => response.text().then((text) => {
  let rtn = {};
  if (text) {
    rtn = JSON.parse(text);
  }
  return rtn;
});

// 网络请求
const request = ({ url, ...options }) => {
  const opts = makeOptions(url, options);
  const { method, credentials, qs, type, mode } = opts;
  let { body, headers } = opts;
  let requestUrl = opts.url;
  requestUrl = addQs(requestUrl, qs);

  switch (type.toLowerCase()) {
    case 'json':
      body = JSON.stringify(body);
      if (method.toLowerCase() === 'post' || method.toLowerCase() === 'put') {
        headers = { ...headers, 'Content-Type': 'application/json' };
      }
      break;
    case 'form':
      // 数据封装成fromData
      const formData = new FormData();
      for (const key in body) {
        formData.append(key, body[key]);
      }
      body = formData;
      break;
    default:
  }

  return new Promise((resolve, reject) => {
    let res = {};
    fetch(requestUrl, {
      method,
      headers,
      body,
      credentials,
      mode,
    })
      .then((response) => {
        res = {
          status: response.status,
          statusText: response.statusText,
        };
        let data = {};
        if (response.status !== 204) {
          switch (type.toLowerCase()) {
            case 'html':
            case 'text':
              data = response.text();
              break;
            case 'json':
              data = parseJSON(response);
              break;
            case 'form':
              data = parseJSON(response);
              break;
            case 'jpg':
            case 'png':
            case 'gif':
            case 'img':
              data = response.blob();
              break;
            default:
              data = response.text();
              break;
          }
        }
        return data;
      })
      .then((data) => {
        // TODO 需要判断网络状态
        resolve({ body: data, parameter: opts.body });
      })
      .catch((err) => reject({ errcode: -1, errmsg: `${err}` }));
  });
};

export default request;
