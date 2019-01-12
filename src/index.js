/**
 * 项目通用且常用的utils，Vue插件形式挂载
 * author: berlinen
 */


/**
 * fetch util
 */
import * as auxiliary from './auxiliary'

class FetchUtil {
  setToken(apiPrefix, myToken) {
    auxiliary.tokenMap[apiPrefix] = myToken
  }

  get(url) {
    return auxiliary.innerFetch(url, { credentials: 'include' })
  }

  getWithoutCookie(url) {
    return auxiliary.innerFetch(url)
  }

  postJSON(url, data) {
    let options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      credentials: 'include'
    }
    return auxiliary.innerFetch(url, options)
  }

  postForm(url, data, encodeKeys) {
    let options = {
      method: 'POST',
      body: auxiliary.formEncode(data, encodeKeys),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      credentials: 'include'
    }
    return auxiliary.innerFetch(url, options)
  }
}

window.$http =  new FetchUtil()

export default window.$http

