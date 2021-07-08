import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../layout/index.vue'
import NotFound from '../views/error/404.vue'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the views roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    cache: false                if set true, the views will  be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    hidden: true                 if set true, item will not show in the sidebar(default is false)
    alwaysShow: true             if set true, will always show the root menu
*                                if not set alwaysShow, when item has more than one children route,
*                                it will becomes nested mode, otherwise not show the root menu
  }
 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue'),
    meta: { hidden: true },
  },
  {
    path: '/redirect',
    component: Layout,
    meta: {
      hidden: true,
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue'),
      },
    ],
  },
  { path: '/:pathMatch(.*)*', component: NotFound, meta: { hidden: true } },
  {
    path: '/',
    component: Layout,
    meta: {
      icon: 'chart',
      title: '首页管理',
    },
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'list',
        },
      }],
  },
]

export const asyncRoutes: RouteRecordRaw[] = [

  {
    path: '/manage',
    component: Layout,
    meta: {
      title: '管理',
      icon: 'link',
      // roles: ['admin']
    },
    children: [
      {
        path: 'wallet',
        component: () => import('../views/manage/wallet/index.vue'),
        meta: {
          title: '钱包管理',
          icon: 'reading',
        },
        children: [
          {
            path: 'detail',
            component: () => import('../views/manage/wallet/detail.vue'),
            meta: {
              title: '钱包详情',
              icon: 'film',
            },
          },
          {
            path: 'list',
            component: () => import('../views/manage/wallet/component/list.vue'),
            meta: {
              title: '钱包列表',
              icon: 'film',
            },
          },

        ],
      },
    ],
  },
  {
    path: '/department',
    component: Layout,
    meta: {
      title: '部门管理',
      icon: 'guide',
    },
    children: [
      {
        path: 'list',
        component: () => import('../views/department/index.vue'),
        meta: {
          title: '部门列表',
          icon: 'list',
        },
      },
      {
        path: 'detail',
        component: () => import('../views/department/detail.vue'),
        meta: {
          title: '部门详情',
          icon: 'documentation',
        },
      },

    ],
  },
  {
    path: '/error',
    component: Layout,
    meta: {
      title: '错误页面',
      icon: 'bug',
    },
    children: [
      {
        path: '403',
        name: 'bug',
        meta: {
          title: '401页面',
          icon: '404',
        },
        component: () => import('../views/error/401.vue'),
      },
      {
        path: '404',
        name: 'NotFound',
        meta: {
          title: '404页面',
          icon: '404',
        },
        component: () => import('../views/error/404.vue'),
      },
    ],
  },
]

const router = createRouter({
  routes: constantRoutes,
  history: createWebHistory(),
})

export default router
