const noop = () => {};
const methods = ['get', 'post', 'delete', 'put'];
const contentType = 'Content-Type';
const applicationJson = 'application/json';
const multipartFormData = 'multipart/form-data';

const ajax = ({
  url,
  method = 'GET',
  params = {},
  success = noop,
  error = noop,
  before = noop,
  after = noop,
  headers = {},
  sync = false,
  timeout = 0,
  responseType = 'json'
}) => {
  const realMethod = method.toUpperCase();
  const client = new XMLHttpRequest();
  before();
  let reqUrl = url;
  let reqParams = null;
  if (realMethod === 'GET') {
    const temp=[];
    for (let key of Object.keys(params)) {
      let value = params[key];
      if (value === null || value === undefined) {
        value = '';
      } else if (typeof value === 'function') {
        value = value();
      }
      if (typeof value === 'object') {
        value = this.stringify(value);
      }
      temp.push(`${key}=${encodeURIComponent(value)}`);
    }
    if (temp.length) {
      reqUrl += (reqUrl.indexOf('?') === -1 ? '?' : '&') + temp.join('&');
    }
  }
  client.open(realMethod, reqUrl, !sync);

  client.onreadystatechange = () => {
    if (client.readyState !== 4) {
      return;
    }
    if (client.status === 200) {
      after();
      let response = client.response;
      if (responseType === 'json') {
        try {
          response = JSON.parse(response);
        } catch(e) {
          console.warn(e);
        }
      }
      success(response);
    } else {
      after();
      error(client.statusText);
    }
  };
  let jsonMode = false;
  let hasContentType = false;
  // let isUpload = false;
  for (let key of Object.keys(headers)) {
    const header = headers[key];
    if (key.toLowerCase() === 'content-type') {
      if (key !== contentType) {
        continue;
      }
      hasContentType = true;
      if (header === applicationJson) {
        jsonMode = true;
      } else if (header === multipartFormData) {
        // isUpload = true;
        continue;
      }
    }
    client.setRequestHeader(key, header);
  }
  client.setRequestHeader('x-requested-with', 'XMLHttpRequest');

  if (realMethod !== 'GET') {
    if (!hasContentType) {
      client.setRequestHeader(contentType, applicationJson);
      jsonMode = true;
    }
    if (jsonMode) {
      reqParams = JSON.stringify(params);
    } else {
      reqParams = params;
    }
  }

  if (!sync) {
    // client.responseType = responseType;
    client.timeout = timeout;
  }

  client.send(reqParams);
};

const base = Object.create(null);
for (const method of methods) {
  info[`${method}Count`] = 0;
  info[`${method}SuccessCount`] = 0;
  info[`${method}ErrorCount`] = 0;
  base[method] = ({
    url,
    params,
    before,
    after,
    success,
    error,
    headers,
    timeout,
    sync,
    responseType
  }) => {
    ajax({
      url,
      method,
      params,
      before,
      after,
      success,
      error,
      headers,
      timeout,
      sync,
      responseType
    });
  };
}

base.upload = ({
  url,
  params,
  before,
  after,
  success,
  error,
  headers = {},
  timeout,
  sync,
  responseType
}) => {
  ajax({
    url,
    method: 'POST',
    params,
    before,
    after,
    success,
    error,
    headers: Object.assign(headers, {[contentType]: multipartFormData}),
    timeout,
    sync,
    responseType
  });
};

export default base;
