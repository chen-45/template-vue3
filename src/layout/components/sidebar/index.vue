<template>
  <div :class="{ 'has-logo': showLogo }">
    <Logo v-if="showLogo" :collapse="!sidebar.opened" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        class="menu"
        :default-active="activeMenu"
        :mode="sidebar.mode"

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
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Logo from './logo.vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

import MenuItem from './item.vue'
export default defineComponent({
  name: 'LayoutMenu',
  components: {
    MenuItem,
    Logo,
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
      showLogo: true,
    }
  },
})
</script>

<style lang='less'>
#app {
  .main-container {
    min-height: 100%;
    transition: margin-left 0.28s;
    margin-left: var(--sideBarWidth);
    position: relative;
  }
    .hideSidebar {
      .sidebar-container {
        width: 54px !important;
      }

      .main-container {
        margin-left: 54px;
      }

      .submenu-title-noDropdown {
        padding: 0 !important;
        position: relative;

        .el-tooltip {
          padding: 0 !important;

          .svg-icon {
            margin-left: 20px;
          }

          .sub-el-icon {
            margin-left: 19px;
          }
        }
      }

      .el-submenu {
        overflow: hidden;

        & > .el-submenu__title {
          padding: 0 !important;

          .svg-icon {
            margin-left: 20px;
          }

          .sub-el-icon {
            margin-left: 19px;
          }

          .el-submenu__icon-arrow {
            display: none;
          }
        }
      }

      .el-menu--collapse {
        .el-submenu {
          & > .el-submenu__title {
            & > span {
              height: 0;
              width: 0;
              overflow: hidden;
              visibility: hidden;
              display: inline-block;
            }
          }
        }
      }
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

    .scrollbar-wrapper {
      overflow-x: hidden !important;
      .el-scrollbar__view {
        height: 100%;
      }
    }

    .el-scrollbar__bar.is-vertical {
      right: 0px;
    }

    .el-scrollbar {
      height: 100%;
    }

    &.has-logo {
      .el-scrollbar {
        height: calc(100% - 50px);
      }
    }
    .el-menu {
      border: none;
      height: 100%;
      width: 100% !important;
      background: var(--menuBg);
      .el-menu-item,.el-submenu__title{
         color:var(--menuText);
        background-color:var(--menuBg);
         &:hover,&:focus{
           background-color:var(--menuHover);
           color:var(--fontColor);
         }
         &.is-active{
           color:var(--menuActiveText);
         }
      }
    }
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
