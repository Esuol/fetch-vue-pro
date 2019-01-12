'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 项目通用且常用的utils，Vue插件形式挂载
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * author: berlinen
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

/**
 * fetch util
 */


var _auxiliary = require('./auxiliary');

var auxiliary = _interopRequireWildcard(_auxiliary);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FetchUtil = function () {
  function FetchUtil() {
    _classCallCheck(this, FetchUtil);
  }

  _createClass(FetchUtil, [{
    key: 'setToken',
    value: function setToken(apiPrefix, myToken) {
      auxiliary.tokenMap[apiPrefix] = myToken;
    }
  }, {
    key: 'get',
    value: function get(url) {
      return auxiliary.innerFetch(url, { credentials: 'include' });
    }
  }, {
    key: 'getWithoutCookie',
    value: function getWithoutCookie(url) {
      return auxiliary.innerFetch(url);
    }
  }, {
    key: 'postJSON',
    value: function postJSON(url, data) {
      var options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        credentials: 'include'
      };
      return auxiliary.innerFetch(url, options);
    }
  }, {
    key: 'postForm',
    value: function postForm(url, data, encodeKeys) {
      var options = {
        method: 'POST',
        body: auxiliary.formEncode(data, encodeKeys),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        credentials: 'include'
      };
      return auxiliary.innerFetch(url, options);
    }
  }]);

  return FetchUtil;
}();

exports.default = {
  install: function install(Vue) {
    Vue.prototype.$http = new FetchUtil();
  }
};