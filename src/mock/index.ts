import Mock from 'mockjs'
import userApi from './user'
import tableApi from './table'
const mocks = [
  ...userApi,
  ...tableApi,
]

export function mockSuccess (data) {
  return {
    code: 200,
    msg: 'success',
    data,
  }
}
export function mockFaild (code = 500) {
  return {
    code,
    msg: 'faild',
    data: null,
  }
}
export function param2Obj (url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index > -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

export function mockInstall () {
  if (process.env.VUE_APP_MOCK) {
    for (const i of mocks) {
      const url = new RegExp(i.path)
      const type = i.type || 'get'
      console.log('url', url)
      Mock.mock(url, type, i.response)
    }
  }
}
