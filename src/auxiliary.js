import fetch from 'whatwg-fetch'

export let tokenMap = {}

export function checkTimeout(data) {
  if (data.result == '0xff') {
    throw new Error('timeout')
  } else {
    return data
  }
}

export function correctUrl(url) {
  return url.startsWith('http') || url.startsWith('/') ? url : APIHOST + url
}

export function formEncode(data, encodeKeys) {
  let body = ''
  for (let key in data) {
    if (!encodeKeys) {
      body += `${key}=${data[key]}&`
    } else if (encodeKeys[key]) {
      body += `${key}=${encodeURIComponent(data[key])}&`
    } else {
      body += `${key}=${data[key]}&`
    }
  }
  return body.slice(0, -1)
}

export function innerFetch(url, options) {
  url = correctUrl(url)
  let apiPrefix =
    url.startsWith('http') || url.startsWith('//')
      ? url.split('/')[3]
      : url.split('/')[1]
  let token = tokenMap[apiPrefix]
  if (token) {
    if (options.headers) {
      options.headers.Token = token
    } else {
      options.headers = { Token: token }
    }
  }
  return fetch(url, options).then(
    res => {
      if (res.ok) {
        return res.json().then(data => {
          return checkTimeout(data)
        })
      } else {
        /* 不再执行外面的resolve */
        throw new Error('request ' + res.url + ' error: ' + res.status)
      }
    },
    error => {
      /* 不再执行外面的resolve */
      throw new Error('network error')
    }
  )
}