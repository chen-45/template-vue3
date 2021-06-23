import service from './request'

export function getConfig (params?) {
  return service({
    url: '/config',
    method: 'get',
    params,
  })
}
export function login (data) {
  return service({
    url: '/user/login',
    method: 'post',
    data,
  })
}

export function getInfo (params?) {
  return service({
    url: '/userInfo',
    method: 'get',
    params,
  })
}

export function getUserList (data) {
  return service({
    url: '/user/list',
    method: 'post',
    data,
  })
}
