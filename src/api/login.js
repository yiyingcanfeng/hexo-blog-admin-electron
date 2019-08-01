import request from '@/utils/request'

export function login(data) {
  const axiosPromise = request({
    url: '/admin/login',
    method: 'post',
    data
  })
  console.log(axiosPromise)
  return axiosPromise
}

export function getInfo(username) {
  return request({
    url: '/admin/info',
    method: 'get',
    params: { username }
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}
