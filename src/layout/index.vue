<template>
  <div :class="classObj" class="app-wrapper">
    <!-- <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div> -->
    <sidebar class="sidebar-container" />
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <Navbar />
        <!-- <TagsView v-if="needTagsView" /> -->
      </div>
      <app-main />
      <!-- <right-panel v-if="showSettings">
        <settings />
      </right-panel> -->
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from '@vue/runtime-core'
import AppMain from './components/appMain.vue'
import Sidebar from './components/sidebar/index.vue'
import Navbar from './components/navbar.vue'
import TagsView from './components/tagsView/index.vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'BaseLayout',
  components: {
    AppMain,
    Sidebar,
    Navbar,
    TagsView,
  },
  setup () {
    const store = useStore()
    const device = computed(() => store.getters.device)
    const sidebar = computed(() => store.getters.sidebar)
    const classObj = computed(() => {
      return {
        hideSidebar: !sidebar.value.opened,
        openSidebar: sidebar.value.opened,
        withoutAnimation: sidebar.value.withoutAnimation,
        mobile: device.value === 'mobile',
      }
    })
    return {
      needTagsView: true,
      classObj,
      fixedHeader: true,
    }
  },
})
</script>

<style lang="less">
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - var(--sideBarWidth));
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
