'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokenMap = undefined;
exports.checkTimeout = checkTimeout;
exports.correctUrl = correctUrl;
exports.formEncode = formEncode;
exports.innerFetch = innerFetch;

var _whatwgFetch = require('whatwg-fetch');

var _whatwgFetch2 = _interopRequireDefault(_whatwgFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tokenMap = exports.tokenMap = {};

function checkTimeout(data) {
  if (data.result == '0xff') {
    throw new Error('timeout');
  } else {
    return data;
  }
}

function correctUrl(url) {
  return url.startsWith('http') || url.startsWith('/') ? url : APIHOST + url;
}

function formEncode(data, encodeKeys) {
  var body = '';
  for (var key in data) {
    if (!encodeKeys) {
      body += key + '=' + data[key] + '&';
    } else if (encodeKeys[key]) {
      body += key + '=' + encodeURIComponent(data[key]) + '&';
    } else {
      body += key + '=' + data[key] + '&';
    }
  }
  return body.slice(0, -1);
}

function innerFetch(url, options) {
  url = correctUrl(url);
  var apiPrefix = url.startsWith('http') || url.startsWith('//') ? url.split('/')[3] : url.split('/')[1];
  var token = tokenMap[apiPrefix];
  if (token) {
    if (options.headers) {
      options.headers.Token = token;
    } else {
      options.headers = { Token: token };
    }
  }
  return (0, _whatwgFetch2.default)(url, options).then(function (res) {
    if (res.ok) {
      return res.json().then(function (data) {
        return checkTimeout(data);
      });
    } else {
      /* 不再执行外面的resolve */
      throw new Error('request ' + res.url + ' error: ' + res.status);
    }
  }, function (error) {
    /* 不再执行外面的resolve */
    throw new Error('network error');
  });
}