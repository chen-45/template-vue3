import { mockFaild, mockSuccess, param2Obj } from '.'
import Mock from 'mockjs'

const TOTAL = 100

function getList (params) {
  const list = []
  const { pageSize = 15, pageNum = 1 } = params
  if (pageSize * pageNum - pageSize > TOTAL) {
    return
  }
  for (let i = 0; i < pageSize; i++) {
    list.push(Mock.mock({
      id: '@id',
      name: '@cname',
      date: '@date',
      address: '@county(true)',
    }))
  }
  return list
}

const tableApi = [
  {
    path: '/table/list',
    type: 'get',
    response (config) {
      console.log('get', config)
      const params = param2Obj(config.url)
      const list = getList(params)
      return mockSuccess({
        total: TOTAL,
        rows: list,
        ...params,
      })
    },
  },
  {
    path: '/table/delete',
    type: 'delete',
    response (config) {
      console.log(config.url, config)
      return mockSuccess('success')
    },
  },

]

export default tableApi
