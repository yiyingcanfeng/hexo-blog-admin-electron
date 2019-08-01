import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '@/views/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '仪表盘',
    hidden: true,
    meta: { title: '仪表盘', icon: 'dashboard' },
    children: [{
      path: 'dashboard',
      name: '仪表盘',
      component: () => import('@/views/dashboard/index'),
      meta: { icon: 'dashboard' }
    }]
  },
  {
    path: '/article',
    component: Layout,
    name: '文章管理',
    meta: { title: '文章管理', icon: 'article' },
    redirect: '/article/list',
    children: [
      {
        path: 'list',
        name: '文章列表',
        component: () => import('@/views/article/index'),
        meta: { title: '文章列表', icon: 'article' }
      },
      {
        path: 'edit',
        name: '编辑文章',
        component: () => import('@/views/article/edit'),
        meta: { title: '编辑文章', icon: 'edit' },
        hidden: true
      },
      {
        path: 'add',
        name: '新增文章',
        component: () => import('@/views/article/add'),
        meta: { title: '新增文章', icon: 'edit' },
        hidden: true
      }
    ]
  },
  {
    path: '/comment',
    component: Layout,
    redirect: '/comment/list',
    name: '评论管理',
    meta: { title: '评论管理', icon: 'comment' },
    children: [
      {
        path: 'list',
        name: '评论列表',
        component: () => import('@/views/comment/list'),
        meta: { title: '评论列表', icon: 'comment' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: '用户管理',
    meta: { title: '用户管理', icon: 'user' },
    children: [
      {
        path: 'list',
        name: '用户列表',
        component: () => import('@/views/user/list'),
        meta: { title: '用户列表', icon: 'user' }
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    name: '博客首页',
    meta: { title: '博客首页', icon: 'link' },
    children: [
      {
        path: 'https://www.movefeng.com',
        meta: { title: '博客首页', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
