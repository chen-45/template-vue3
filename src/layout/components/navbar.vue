<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

     <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <template v-if="device!=='mobile'">

        <!-- <error-log class="errLog-container right-menu-item hover-effect" /> -->

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <template #dropdown>
        <el-dropdown-menu>
          <router-link to="/profile/index">
            <el-dropdown-item>个人资料</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click="logout">
            <span style="display:block;">退出登陆</span>
          </el-dropdown-item>
        </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang='ts'>
import { useStore } from 'vuex'
import Breadcrumb from '@/components/breadcrumb/index.vue'

import { computed } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import Hamburger from '@/components/hamburger/index.vue'
// import ErrorLog from '@/components/errorLog/index.vue'
import Screenfull from '@/components/screenfull/index.vue'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    // ErrorLog,
    Screenfull,
  },
  setup () {
    const route = useRoute()
    const store = useStore()
    const router = useRouter()
    const sidebar = computed(() => store.getters.sidebar)
    const avatar = computed(() => store.getters.sidebar)
    const device = computed(() => store.getters.sidebar)

    function toggleSideBar () {
      console.log('heheh', store)
      store.dispatch('app/toggleSideBar')
    }
    async function logout () {
      await store.dispatch('user/logout')
      router.push(`/login?redirect=${route.fullPath}`)
    }
    return {
      device,
      avatar,
      sidebar,
      toggleSideBar,
      logout,
    }
  },
}
</script>

<style lang="less">
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    line-height: 50px;
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
