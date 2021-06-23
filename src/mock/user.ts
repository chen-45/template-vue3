import { mockFaild, mockSuccess } from '.'
import Mock from 'mockjs'

const total = 100

function getList (params) {
  const list = []
  const { pageSize = 15, pageNum = 1 } = params
  if (pageSize * pageNum - pageSize > total) {
    return
  }
  for (let i = 0; i < total; i++) {
    list.push(Mock.mock({
      id: '@id',
      name: '@cname',
      age: '@number',
      dateTimeReceived: '@datetime',
      'recipientTo|1-3': [],
    }))
  }
  return list
}

const loginData = {

  token: 'admin',
  name: '45',
  avatar: '',
  introduction: '沧海一声笑',
  roles: ['turtor'],

}

const userApi = [
  {
    path: '/user/login',
    type: 'post',
    response (config) {
      const { username, password } = JSON.parse(config.body)
      console.log(username, password)
      if (username === 'admin' && password === 'admin') {
        return mockSuccess(loginData)
      }
      return mockFaild()
    },
  },
  {
    path: '/user/list',
    type: 'post',
    response (config) {
      console.log('post', config)
      const params = config.body
      const list = getList(params)
      return mockSuccess({
        total,
        rows: list,
      })
    },
  },
  {
    path: '/userInfo',
    type: 'get',
    response (config) {
      return mockSuccess({
        token: 'admin',
        name: '45',
        avatar: '',
        introduction: '沧海一声笑',
        roles: ['turtor'],
      })
    },
  },
]

export default userApi
