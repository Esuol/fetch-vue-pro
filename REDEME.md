# Project Title

fetch-vue-pro

### 依赖

whatag-fetch
npm i # whatag-fetch

## 安装

npm i # fetch-vue-pro

### 使用

import fetch-vue from 'fetch-vue-pro'

Vue.user(fetch-vue)

拥有全局变量 APIHOST 项目跟路径

example

const DEVSERVER = '//10.0.0.32:1088/projectName/'

const PRODSERVER = '/projectName/'

if (process.env.NODE_ENV === 'development') {

  window.APIHOST = DEVSERVER

} else if (process.env.NODE_ENV === 'production') {

  window.APIHOST = PRODSERVER

}

请求方式

get

this.$http.get(url)

or

post

数据格式

form

this.$http.postForm(url,data)

json

this.$http.postJson(url,data)




