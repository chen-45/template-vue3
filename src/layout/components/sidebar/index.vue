<template>
  <el-menu
    class="menu"
    :default-active="activeMenu"
    :mode="sidebar.mode"
    background-color="#304156"
    text-color="#bfcbd9"
    active-text-color="#409EFF"
    menu-trigger="click"
    :collapse="!sidebar.opened"
    @select="handleSelect"
  >
    <MenuItem
      v-for="route in routes"
      :key="route.path"
      :item="route"
      :base-path="route.path"
    />
  </el-menu>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

import MenuItem from './item.vue'
export default defineComponent({
  name: 'LayoutMenu',
  components: {
    MenuItem,
  },
  props: {
    mode: {
      type: String,
      default: 'vertical',
    },
  },
  setup () {
    const route = useRoute()
    const store = useStore()
    const activeMenu = computed(() => route.path)
    const routes = computed(() => store.getters.permission_routes)
    const sidebar = computed(() => store.getters.sidebar)
    function handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
    return {
      routes,
      handleSelect,
      activeMenu,
      sidebar,
    }
  },
})
</script>

<style lang='less' scoped>
.menu {
  height: 100%;
  &:not(.el-menu--collapse) {
    width: 200px;
  }
}
</style>
<style lang='less'>
#app {

  .main-container {
    min-height: 100%;
    transition: margin-left .28s;
    margin-left: var(--sideBarWidth);
    position: relative;
  }

  .sidebar-container {
    transition: width 0.28s;
    width: var(--sideBarWidth) !important;
    // background-color: var(--menuBg);
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar-track-piece {
      background: var(--sideBarScrollbarTrackPiece);
    }

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--sideBarScrollbarThumb);
      border-radius: 20px;
    }
  }

}

</style>
