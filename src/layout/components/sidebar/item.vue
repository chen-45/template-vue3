<template>
<template v-if="!item.meta.hidden ">
    <template v-if="!item.children ">
      <AppLink v-if="item.meta" :to="basePath">
        <el-menu-item :index="basePath">
          <template v-if=" item.meta?.icon">
            <ItemIcon :icon=' item.meta?.icon' />
          </template>

          <template #title>{{ item.meta?.title }}  </template>
        </el-menu-item>
      </AppLink>
    </template>

    <template v-else>
      <el-submenu :index="resolvePath(item.path)">
        <template #title>
            <ItemIcon v-if=" item.meta?.icon" :icon=' item.meta?.icon' />
          <span>{{ item.meta?.title }}</span>
        </template>
        <MenuItem
          v-for="child in item.children"
          :key="child.path"
          :is-nest="true"
          :item="child"
          :base-path="resolvePath(child.path)"
        />
      </el-submenu>
    </template>
  </template>
</template>

<script lang="ts">
import { isExternal } from '@/utils/valid'
import { defineComponent, onMounted, PropType, ref } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import AppLink from './link.vue'
import ItemIcon from './itemIcon.vue'
export default defineComponent({
  name: 'MenuItem',
  components: {
    AppLink,
    ItemIcon,
  },
  props: {
    item: {
      type: Object as PropType<RouteRecordRaw>,
      default: () => ({}),
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: '',
    },
  },

  setup (props) {
    const onlyOneChild = ref<any>({})

    function hasOneShowingChild (children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.meta.hidden) {
          return false
        } else {
          onlyOneChild.value = item
          return true
        }
      })
      if (showingChildren.length === 1) {
        return true
      }
      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
        return false
      }

      return false
    }

    function resolvePath (routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(props.basePath as string)) {
        return props.basePath
      }
      if (/^\//.test(routePath)) {
        return routePath
      } else {
        return (props.basePath + '/' + routePath).replace(/\/{2}/, '/')
      }
    }
    onMounted(() => {
      // console.log('props', props.item)
    })
    return {
      hasOneShowingChild,
      resolvePath,
      onlyOneChild,
    }
  },
})
</script>

  <style lang='less' scoped>
</style>
