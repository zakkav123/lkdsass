import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
  },
  // 一级home路由
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '帝可得', icon: 'home' },
      },
    ],
  },
  // 工单管理
  {
    path: '/task',
    component: Layout,
    redirect: '/example/business',
    name: 'Example',
    meta: { title: '工单管理', icon: 'dashboard' },
    children: [
      {
        path: 'business',
        name: 'Business',
        component: () => import('@/views/table/index'),
        meta: { title: '运输工单', icon: 'user' },
      },
      {
        path: 'operation',
        name: 'Pperation',
        component: () => import('@/views/tree/index'),
        meta: { title: '运维工单', icon: 'user' },
      },
    ],
  },
  // 点位管理
  {
    path: '/node',
    component: Layout,
    redirect: '/node/business',
    name: 'node',
    meta: { title: '点位管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'region',
        name: 'Region',
        component: () => import('@/views/table/index'),
        meta: { title: '区域管理', icon: 'tree' },
      },
      {
        path: 'node',
        name: 'Node',
        component: () => import('@/views/tree/index'),
        meta: { title: '点位管理', icon: 'tree' },
      },
      {
        path: 'partner',
        name: 'Partner',
        component: () => import('@/views/tree/index'),
        meta: { title: '点位管理', icon: 'tree' },
      },
    ],
  },
  // 设备管理
  {
    path: '/vm',
    component: Layout,
    redirect: '/node/index',
    name: 'node',
    meta: { title: '设备管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/table/index'),
        meta: { title: '设备管理', icon: 'tree' },
      },
      {
        path: 'status',
        name: 'Status',
        component: () => import('@/views/tree/index'),
        meta: { title: '设备状态', icon: 'tree' },
      },
      {
        path: 'type',
        name: 'Type',
        component: () => import('@/views/tree/index'),
        meta: { title: '设备类型管理', icon: 'tree' },
      },
    ],
  },
  // 人员管理
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    name: 'User',
    meta: { title: '人员管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/table/index'),
        meta: { title: '人员列表', icon: 'tree' },
      },
      {
        path: 'user-task-stats',
        name: 'user-task-stats',
        component: () => import('@/views/tree/index'),
        meta: { title: '人效统计', icon: 'tree' },
      },
      {
        path: 'user-work',
        name: 'user-work',
        component: () => import('@/views/tree/index'),
        meta: { title: '工作量列表', icon: 'tree' },
      },
    ],
  },
  // 商品管理
  {
    path: '/sku',
    component: Layout,
    redirect: '/sku/sku-class',
    name: 'Sku',
    meta: { title: '商品管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'sku-class',
        name: 'sku-class',
        component: () => import('@/views/table/index'),
        meta: { title: '商品类型', icon: 'tree' },
      },
      {
        path: 'sku',
        name: 'sku',
        component: () => import('@/views/tree/index'),
        meta: { title: '商品管理', icon: 'tree' },
      },
    ],
  },
  // 策略管理
  {
    path: '/policy/index',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '策略管理',
      icon: 'policy',
    },
  },
  // 订单管理
  {
    path: '/order/index',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '订单管理',
      icon: 'policy',
    },
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
