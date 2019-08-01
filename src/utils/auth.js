// import Cookies from 'js-cookie'
const session = require('electron').remote.session
const ses = session.fromPartition('persist:name')
const Cookies = ses.cookies
const TokenKey = 'hexoBlogAdminToken'
const adminInfoKey = 'hexoBlogAdminInfo'
const baseUrl = process.env.BASE_API

/**
 * 设置cookie
 * @param key
 * @param value
 */
function setCookie(key, value) {
  if ((typeof value) === 'object') {
    value = JSON.stringify(value)
  }
  Cookies.set({
    url: baseUrl,
    name: key,
    value: value,
    expirationDate: new Date().getTime() / 1000 + 3 * 24 * 60 * 60
  }).then(() => '')
  ses.flushStorageData()
}

/**
 * 读取cookie
 * @param key
 * @returns {Promise<Electron.Cookie>}
 */
function getCookie(key) {
  return Cookies.get({
    url: baseUrl,
    name: key
  })
}

/**
 * 获取token
 */
export function getToken() {
  return getCookie(TokenKey)
}

/**
 * 保存token
 * @param token
 */
export function setToken(token) {
  return setCookie(TokenKey, token)
}

/**
 * 删除token
 */
export function removeToken(url) {
  return Cookies.remove(url, TokenKey)
}

/**
 * 获取用户名
 * @returns {*}
 */
export function getUsername() {
  return getCookie(adminInfoKey)
}
/**
 * 保存用户信息
 * @returns {*}
 */
export function setAdminInfo(adminInfo) {
  setCookie(adminInfoKey, adminInfo)
}
/**
 * 获取用户信息
 * @returns {*}
 */
export function getAdminInfo() {
  return getCookie(adminInfoKey)
}
