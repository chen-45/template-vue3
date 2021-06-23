<template>
  <el-breadcrumb separator="/">
    <transition-group name="breadcrumb">
      <template v-for="(item,index) in levelList" :key="item.path">
        <el-breadcrumb-item>
          <span
            v-if="
              item.redirect === 'noRedirect' || index == levelList.length - 1
            "
            class="no-redirect"
            >{{ item.meta.title }}</span
          >
          <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
        </el-breadcrumb-item>
      </template>
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
    </transition-group>
  </el-breadcrumb>
</template>

<script lang='ts'>
import { computed, defineComponent } from '@vue/runtime-core'
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'
import { compile } from 'path-to-regexp'

export default defineComponent({
  name: 'Breadbrumb',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const levelList = computed(() => {
      let matched: any[] = route.matched.filter(
        (item) => item.meta && item.meta.title,
      )
      const first = matched[0]
      if (!isHome(first)) {
        matched = [
          {
            path: '/home',
            meta: {
              title: '首页',
            },
          },
        ].concat(matched)
      }
      console.log('match', matched)
      return matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false,
      )
    })

    function isHome (route: Partial<RouteRecordRaw>) {
      const name = (route && route.name) as string
      if (!name) {
        return false
      }
      return name.toLowerCase() === 'Home'.toLowerCase()
    }
    function pathCompile (path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = route
      var toPath = compile(path)
      return toPath(params)
    }
    function handleLink (item) {
      console.log('item', item)
      const { redirect, path } = item
      if (redirect) {
        router.push(redirect)
        return
      }
      router.push(pathCompile(path))
    }
    return {
      levelList,
      handleLink,
    }
  },
})
</script>

<style scoped lang="less">
</style>
