<template>
  <div class="table">
    <div class="table-head">
      <slot name="button"></slot>
      <el-popover v-if='config.showColumnFilter' :width="100" trigger="hover">
        <template #reference>
          <el-button style="flex-shrink: 0">过滤表格列</el-button>
        </template>

        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
          >全选</el-checkbox
        >
        <div style="margin: 15px 0"></div>
        <el-checkbox-group
          v-model="checkedList"
          @change="handleCheckedCitiesChange"
        >
          <el-checkbox
            style="display: block"
            v-for="column in config.columns"
            :label="column.field"
            :key="column.field"
            >{{ column.props.label }}</el-checkbox
          >
        </el-checkbox-group>
      </el-popover>
    </div>

    <div class="container">
      <el-table
        :data="state.list"
        style="width: 99.9%"
        ref="tableRef"
        @selection-change="handleSelectionChange"
      >
        <el-table-column v-if="config.isMutiple" type="selection" width="55" />
        <template v-for="column in config.columns" :key="column.field">
          <el-table-column v-bind="column.props" v-if='checkedList.includes(column.field)'>
            <template #default="scope">
              <template v-if="column.slot">
                <slot :name="column.field" :scope="scope"></slot>
              </template>
              <template v-else>
                <div v-if="column.field !== 'action'">
                  {{ scope.row[column.field] }}
                </div>
                <div v-else>
                  <el-button
                    @click="emitEvent(child.key, scope.row)"
                    v-for="child in column.buttons"
                    :key="child.key"
                    v-bind="child.props"
                    >{{ child.label }}</el-button
                  >
                </div>
              </template>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>

    <div class="pagination" v-if="tableConfig.pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="state.pageNum"
        :page-sizes="tableConfig.pagination.pageSizes"
        :page-size="state.pageSize"
        :layout="tableConfig.pagination.layout"
        :total="400"
        hide-on-single-page
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import tableConfig from '../../page/manage/wallet/component/data'
export default defineComponent({
  name: 'CustomTable',
  props: {
    state: {
      type: Object,
      default: () => ({
        list: [],
      }),
    },
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  emit: ['selectChange', 'pageSizeChange', 'pageNumChange'],
  setup (props, { emit }) {
    const columnKeys = props.config.columns.map((item) => item.field)
    const tableRef = ref(null)
    const checkAll = ref(true)
    const checkedList = ref([...columnKeys])
    const isIndeterminate = ref(false)
    function handleCheckAllChange (val) {
      checkedList.value = val
        ? [...columnKeys]
        : []
      isIndeterminate.value = false
    }
    function handleCheckedCitiesChange (value) {
      const checkedCount = value.length
      const length = props.config.columns.length
      checkAll.value = checkedCount === length
      isIndeterminate.value = checkedCount > 0 && checkedCount < length
    }
    function handleSelectionChange (value) {
      if (props.config.isMutiple) {
        emit('selectChange', value)
      }
    }
    function emitEvent (key: string, item: any) {
      emit('buttonEvent', {
        key,
        item,
      })
    }
    function handleCurrentChange (pageNum) {
      emit('pageNumChange', pageNum)
    }
    function handleSizeChange (size) {
      emit('pageSizeChange', size)
    }
    onMounted(() => {
      console.log('height', tableRef.value.$el.offsetHeight)
      // tableRef.value.doLayout()
    })
    return {
      tableConfig,
      tableRef,
      handleSelectionChange,
      handleCurrentChange,
      handleSizeChange,
      emitEvent,
      handleCheckAllChange,
      handleCheckedCitiesChange,
      checkedList,
      checkAll,
      isIndeterminate,
    }
  },
})
</script>

  <style lang='less' scoped>
.table {
  display: flex;
  flex-direction: column;
  height: 100%;
  .table-head{
    text-align: right;
    margin:10px 15px;
  }
  .container {
    // flex: 1;
    // overflow: auto;
  }
  .pagination {
    margin: 10px 0;
    // text-align: right;
  }
}
</style>
