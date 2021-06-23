<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot></slot>
  </component>
</template>

<script lang='ts'>
import { isExternal } from '@/utils/valid'
import { computed, defineComponent } from '@vue/runtime-core'

export default defineComponent({
  name: 'AppLink',
  props: {
    to: {
      type: String,
      default: '',
    },
  },
  setup (props) {
    const isExtern = computed(() => isExternal(props.to as string))
    const type = computed(() => {
      if (isExtern.value) {
        return 'a'
      }
      return 'router-link'
    })
    function linkProps (to) {
      if (isExtern.value) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener',
        }
      }
      return {
        to: to,
      }
    }
    return {
      isExtern,
      type,
      linkProps,
    }
  },

})
</script>
