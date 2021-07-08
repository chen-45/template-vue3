<template>
  <div>
    <div class='table-header'>
      <slot name='head-action'></slot>
    </div>
    <el-table  v-bind='attrs'  :data="source" style="width: 100%" @selection-change="handleSelectionChange">
       <el-table-column
      align='center'
       v-if='isMutiple'
      type="selection"
      width="55" />
      <template v-for="column in columns" :key="column.value">
        <el-table-column
          :label="column.label"
          :width="column.width"
          show-overflow-tooltip
          align='center'
        >
          <template #default="scope">
            <slot v-bind='scope' :name="column.value" v-if="column.slot"></slot>
            <span v-else>{{ scope.row[column.value] }}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="table-footer">

       <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      v-model:current-page="pageNumber"
      :page-sizes="pageSizes"
      v-model:page-size="pageSize"
      :layout="layout"
      :total="400" />
    </div>

  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from '@vue/runtime-core'

export default defineComponent({
  name: 'BaseTable',
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    isMutiple: {
      type: Boolean,
      default: false,
    },
    source: {
      type: Array,
      default: () => [],
    },
    pageSizes: {
      type: Array,
      default: () => [100, 200, 300, 400],
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },

  },
  emits: ['paginationChange'],
  setup (props, { emit, attrs }) {
    const pageNumber = ref(1)
    const pageSize = ref(10)
    const multipleSelection = ref<typeof props.source>([])
    function handleSelectionChange (val) {
      multipleSelection.value = val
    }
    function handleSizeChange (val) {
      emit('paginationChange', { pageSize: val })
    }
    function handleCurrentChange (val) {
      emit('paginationChange', { pageNumber: val })
    }
    return {
      attrs,
      pageNumber,
      pageSize,
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange,
    }
  },
})
</script>

<style scoped lang="less">
.table-footer{
  margin-top:20px;
  text-align:right;
}
</style>
