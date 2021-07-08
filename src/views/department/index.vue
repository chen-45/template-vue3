<template>
  <div class="page">
    <QueryForm @getData="handleGetData" :span="6" :fields="queryFields" :queryData="params" />
    <BaseTable @paginationChange='handleGetData' border :columns="columns" :source='tableData' :isMutiple="true">
      <template v-slot:action="scope">
        <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </BaseTable>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  readonly,
} from 'vue'
import QueryForm from '@/components/queryForm/index.vue'
import BaseTable from '@/components/table/index.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
export default defineComponent({
  name: 'Basic',
  components: {
    QueryForm,
    BaseTable,
  },
  setup () {
    // 查询表单参数
    const params = readonly({
      name: '',
      id: '',
      status: '',
      dateTime: [],
    })
    const queryFields = readonly([{
      value: 'name',
      label: '名字',
    },
    {
      value: 'id',
      label: '编号',
    },
    {
      value: 'status',
      label: '编号',
      type: 'el-select',
      props: {
        options: [{
          value: 1,
          label: '成功',
        },
        {
          value: 2,
          label: '失败',
        },
        ],
      },
    },
    {
      value: 'dateTime',
      label: '起止时间',
      type: 'el-date-picker',
      props: {
        type: 'datetimerange',
        valueFormat: 'YYYY-MM-DD HH:mm:ss', // 这块文档没写 跟2.x版本不一样
      },
    },
    ])
    const columns = readonly([{
      value: 'date',
      label: '日期',
    },
    {
      value: 'name',
      label: '姓名',
    },
    {
      value: 'address',
      label: '地址',
    },
    {
      value: 'action',
      label: '操作',
      slot: true,
    },
    ])
    const tableData = [{
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    }, {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    }, {
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    }, {
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    }, {
      date: '2016-05-08',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    }, {
      date: '2016-05-06',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    }, {
      date: '2016-05-07',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    }]
    let query = {
      name: '',
      id: '',
      status: '',
      dateTime: [],
      pageSize: 10,
      pageNumber: 1,
    }

    function handleGetData (data) {
      query = { ...query, ...data }
      console.log(query)
    }

    function handleEdit (i, row) {
      console.log('edit', i, row)
    }
    function handleDelete (i, row) {
      ElMessageBox.confirm('此操作将删除该条数据，是否继续？', {
        type: 'error',
      }).then(() => {
        ElMessage.success('删除成功')
      }).catch(() => {
        ElMessage.info('删除失败')
      })
      console.log('delete', i, row)
    }
    return {
      columns,
      queryFields,
      params,
      tableData,
      handleGetData,
      handleEdit,
      handleDelete,
    }
  },
  mounted () {
    console.log('this', this)
  },
})

</script>

<style lang='less' scoped>
  .page {
    padding: 20px;
    overflow: hidden;
  }

</style>
