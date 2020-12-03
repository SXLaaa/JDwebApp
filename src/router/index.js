import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    meta: {
      keepAlive: true   //判断是否缓存
    }
  },
  {
    path: '/goodList',
    name: 'goodList',
    component: ()=> import(/* webpackChunkName: "GoodList" */'../views/goodsList.vue'),
    meta: {
      keepAlive: true   //判断是否缓存
    }
  },
  {
    path: '/goodsDetail',
    name: 'goodsDetail',
    component: ()=> import(/* webpackChunkName: "GoodList" */'../views/goodsDetail.vue'),
    meta: {
      keepAlive: false   //判断是否缓存
    }
  },
  {
    path: '/buy',
    name: 'buy',
    component: ()=> import(/* webpackChunkName: "GoodList" */'../views/buy.vue'),
    meta: {
      keepAlive: false   //判断是否缓存
    }
  },
  {
    path: '/login',
    name: 'login',
    component: ()=> import(/* webpackChunkName: "GoodList" */'../views/login.vue'),
    meta: {
      keepAlive: false   //判断是否缓存
    }
  },
  {
    path: '/register',
    name: 'register',
    component: ()=> import(/* webpackChunkName: "GoodList" */'../views/register.vue'),
    meta: {
      keepAlive: false   //判断是否缓存
    }
  },
]
 
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
