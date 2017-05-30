const noop = () => {};
const methods = ['get', 'post', 'delete', 'put'];
const contentType = 'Content-Type';
const applicationJson = 'application/json';
const multipartFormData = 'multipart/form-data';
const info = {
  ajaxCount: 0,
  successCount: 0,
  errorCount: 0
};

const ajax = ({
  url,
  method,
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
  const client = new XMLHttpRequest();
  before();
  info.ajaxCount++;
  let reqUrl = url;
  let reqParams = null;
  if (method === 'get') {
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
  client.open(method, reqUrl, !sync);

  client.onreadystatechange = () => {
    if (client.readyState !== 4) {
      return;
    }
    if (client.status === 200) {
      info.successCount++;
      after();
      let response = client.response;
      if (sync && responseType === 'json') {
        try {
          response = JSON.parse(response);
        } catch(e) {
          console.warn(e);
        }
      }
      success(response);
    } else {
      info.errorCount++;
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

  if (method !== 'get') {
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
    client.responseType = responseType;
    client.timeout = timeout;
  }

  client.send(reqParams);
};

const base = Object.create(null);
base.ajax = ajax;
for (const method of methods) {
  base[method] = ({
    url,
    params,
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
    success,
    error,
    headers: Object.assign(headers, {[contentType]: multipartFormData}),
    timeout,
    sync,
    responseType
  });
};

base.getInfo = () => info;

export default base;
