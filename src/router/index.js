import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = ()=>import('views/home/Home')
const Cart = ()=>import('views/cart/Cart')
const Category= ()=>import('views/category/Category')
const Me = ()=>import('views/me/Me')
const Detail = ()=>import('views/detial/Detail')

//1.安装插件
Vue.use(VueRouter)

//2.创建router
const routes =[
    {
      path: '',
      redirect: '/home'
    },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/class',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/me',
    component: Me
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})

//3.导出router
export default router
