(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["AjaxUtil"] = factory();
	else
		root["AjaxUtil"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var noop = function noop() {};
var methods = ['get', 'post', 'delete', 'put'];
var contentType = 'Content-Type';
var applicationJson = 'application/json';
var multipartFormData = 'multipart/form-data';

var ajax = function ajax(_ref) {
  var url = _ref.url,
      _ref$method = _ref.method,
      method = _ref$method === undefined ? 'GET' : _ref$method,
      _ref$params = _ref.params,
      params = _ref$params === undefined ? {} : _ref$params,
      _ref$success = _ref.success,
      success = _ref$success === undefined ? noop : _ref$success,
      _ref$error = _ref.error,
      error = _ref$error === undefined ? noop : _ref$error,
      _ref$before = _ref.before,
      before = _ref$before === undefined ? noop : _ref$before,
      _ref$after = _ref.after,
      after = _ref$after === undefined ? noop : _ref$after,
      _ref$headers = _ref.headers,
      headers = _ref$headers === undefined ? {} : _ref$headers,
      _ref$sync = _ref.sync,
      sync = _ref$sync === undefined ? false : _ref$sync,
      _ref$timeout = _ref.timeout,
      timeout = _ref$timeout === undefined ? 0 : _ref$timeout,
      _ref$responseType = _ref.responseType,
      responseType = _ref$responseType === undefined ? 'json' : _ref$responseType;

  var realMethod = method.toUpperCase();
  var client = new XMLHttpRequest();
  before();
  var reqUrl = url;
  var reqParams = null;
  if (realMethod === 'GET') {
    var temp = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.keys(params)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        var value = params[key];
        if (typeof value === 'function') {
          value = value();
        }
        if (value === null || value === undefined || value !== value || value === Infinity || value === -Infinity) {
          value = '';
        }
        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
          value = undefined.stringify(value);
        }
        temp.push(key + '=' + encodeURIComponent(value));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (temp.length) {
      reqUrl += (reqUrl.indexOf('?') === -1 ? '?' : '&') + temp.join('&');
    }
  }
  client.open(realMethod, reqUrl, !sync);

  client.onreadystatechange = function () {
    if (client.readyState !== 4) {
      return;
    }
    if (client.status === 200) {
      after();
      var response = client.response;
      if (responseType === 'json') {
        try {
          response = JSON.parse(response);
        } catch (e) {
          console.warn(e);
        }
      }
      success(response);
    } else {
      after();
      error(client.statusText);
    }
  };
  var jsonMode = false;
  var hasContentType = false;
  // let isUpload = false;
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = Object.keys(headers)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _key = _step2.value;

      var header = headers[_key];
      if (_key.toLowerCase() === 'content-type') {
        if (_key !== contentType) {
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
      client.setRequestHeader(_key, header);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
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

var base = Object.create(null);
var _iteratorNormalCompletion3 = true;
var _didIteratorError3 = false;
var _iteratorError3 = undefined;

try {
  var _loop = function _loop() {
    var method = _step3.value;

    base[method] = function (_ref3) {
      var url = _ref3.url,
          params = _ref3.params,
          before = _ref3.before,
          after = _ref3.after,
          success = _ref3.success,
          error = _ref3.error,
          headers = _ref3.headers,
          timeout = _ref3.timeout,
          sync = _ref3.sync,
          responseType = _ref3.responseType;

      ajax({
        url: url,
        method: method,
        params: params,
        before: before,
        after: after,
        success: success,
        error: error,
        headers: headers,
        timeout: timeout,
        sync: sync,
        responseType: responseType
      });
    };
  };

  for (var _iterator3 = methods[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
    _loop();
  }
} catch (err) {
  _didIteratorError3 = true;
  _iteratorError3 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion3 && _iterator3.return) {
      _iterator3.return();
    }
  } finally {
    if (_didIteratorError3) {
      throw _iteratorError3;
    }
  }
}

base.upload = function (_ref2) {
  var url = _ref2.url,
      params = _ref2.params,
      before = _ref2.before,
      after = _ref2.after,
      success = _ref2.success,
      error = _ref2.error,
      _ref2$headers = _ref2.headers,
      headers = _ref2$headers === undefined ? {} : _ref2$headers,
      timeout = _ref2.timeout,
      sync = _ref2.sync,
      responseType = _ref2.responseType;

  base.post({
    url: url,
    params: params,
    before: before,
    after: after,
    success: success,
    error: error,
    headers: Object.assign(headers, _defineProperty({}, contentType, multipartFormData)),
    timeout: timeout,
    sync: sync,
    responseType: responseType
  });
};

exports.default = base;

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map