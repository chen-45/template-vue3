<template>
  <el-form style='margin: 20px 0;' :model="formData" ref="ruleForm" label-width="100px">
    <el-row>
      <el-col :span="span" v-for="field in fields" :key="field.value">
        <el-form-item :label="field.label" :prop="field.value">
          <component
            :is="field.type || 'el-input'"
            v-bind="field.props"
            v-model="formData[field.value]"
            style="width: 100%"
          >
            <template v-if="field.type === 'el-select'">
              <el-option
                v-for="item in field.props.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </template>
          </component>
        </el-form-item>
      </el-col>
      <!-- 重点样式 margin-left / margin-right :auto -->
      <el-col :span="span" style="marginLeft:auto;text-align:right ">
          <el-button type="primary" @click="submitForm">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang='ts'>
import { deepClone } from '@/utils'
import { computed, defineComponent, ref } from '@vue/runtime-core'

export default defineComponent({
  name: 'QueryForm',
  props: {
    fields: {
      type: Array,
      default: () => [],
    },
    queryData: {
      type: Object,
      default: () => ({}),
    },
    span: {
      type: Number,
      default: 6,
    },
  },
  setup (props, { emit }) {
    const formData = ref({})
    formData.value = deepClone(props.queryData)
    const ruleForm = ref(null)

    const width = computed(() => (props.span as number / 24) * 100 * 1 + '%')
    // const debounceSumbit = debounce
    function submitForm () {
      emit('getData', formData.value)
    }
    function resetForm () {
      ruleForm.value.resetFields()
      emit('getData', formData.value)
    }
    return {
      ruleForm,
      formData,
      submitForm,
      resetForm,
      width,
    }
  },
})
</script>

<style scoped lang="less">
</style>
