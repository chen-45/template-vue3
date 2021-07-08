<template>

  <i v-if='isElIcon' :class="[icon, 'sub-el-icon']"></i>
  <svg-icon v-else :iconClass='icon' />
</template>

<script lang='ts'>

import { computed, defineComponent } from '@vue/runtime-core'

export default defineComponent({
  name: 'ItemIcon',
  props: {
    icon: {
      type: String,
      default: 'unknown',
    },
  },
  setup (props) {
    // const isElIcon = computed(() => props.icon.includes('el-icon'))

    const isElIcon = computed(() => (props.icon as string).includes('el-icon'))
    return {
      isElIcon,
    }
  },
})
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
