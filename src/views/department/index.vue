<template>
  <div class='page'>
    <QueryForm :span='6' :fields="queryFields" :queryData="params" />

  </div>
</template>

<script lang="ts">
import { defineComponent, readonly } from 'vue'
import QueryForm from '@/components/queryForm/index.vue'
export default defineComponent({
  name: 'Basic',
  components: {
    QueryForm,
  },
  setup () {
    const queryFields = [
      { value: 'name', label: '名字' },
      { value: 'id', label: '编号' },
      {
        value: 'status',
        label: '编号',
        type: 'el-select',
        props: {
          options: [
            { value: 1, label: '成功' },
            { value: 2, label: '失败' },
          ],
        },
      },
      // {
      //   value: 'dateTime',
      //   label: '起止时间',
      //   type: 'el-date-picker',
      //   props: {
      //     type: 'datetimerange',
      //   },
      // },
    ]
    const params = readonly({
      name: '',
      id: '',
      status: '',
      dateTime: [],
    })
    return {
      queryFields,
      params,
    }
  },
})
</script>

  <style lang='less' scoped>
  .page{
    padding:20px;
    overflow: hidden;
  }
  </style>
