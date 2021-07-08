<template>
  <div style="margin: 20px">
    <el-input :modelValue="form.value" style="width: auto" @update:modelValue="limitDecimal" @blur='handleBlur' />
  </div>
</template>

<script lang="ts">
import {
  validDecimal,
} from '@/utils/valid'
import {
  defineComponent,
  reactive,
} from 'vue'
import {
  Decimal,
} from '@/directive'
export default defineComponent({
  name: 'Basic',
  directives: {
    Decimal,
  },
  setup () {
    const form = reactive({
      value: '',
    })

    function limitDecimal (value) {
      console.log('value', value, validDecimal(value))
      if (validDecimal(value)) {
        form.value = value
        console.log(1)
      } else {
        if (value.indexOf('.') !== value.length - 1) {
          form.value = value.replace(/[^0-9.]/g, '').slice(0, value.length - 1)
        } else {
          form.value = value === '.' ? '' : value
        }
      }
    }

    function handleBlur () {
      form.value = Number(form.value) + '%'
    }
    return {
      form,
      limitDecimal,
      handleBlur,
    }
  },
})

</script>

<style lang='less' scoped>
</style>
