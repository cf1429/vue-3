import Vue from 'vue'
import VueRouter from 'vue-router'
import UserMange from '../views/user/UserMange.vue'
import AddUser from '../views/user/AddUser.vue'
import UserUpdate from '../views/user/UserUpdate.vue'
import Index from '../views/Index.vue'
import Login from '../views/login/Login.vue'
import WineMange from '../views/wine/WineMange.vue'
import AddWine from '../views/wine/AddWine.vue'
import WineUpdate from '../views/wine/WineUpdate.vue'

Vue.use(VueRouter)

const routes = [
    {
      path: '/',
      component: Login,
    },
    {
      path: '/wineMange',
      name: '酒水管理',
      component: Index,
      // redirect: '/wineMange',   /*默认进入的页面，可以看做是登录之后的首页*/
      show: true,
      children:[
        {
          path: '/wineMange',
          name: '酒水列表',
          component: WineMange,
          show:true
        },
        {
          path: '/addWine',
          name: '添加酒水',
          component: AddWine,
          show:true
        },
        {
          path: '/wineUpdate',
          component: WineUpdate,
          show: false,
        }
      ]
    },
    {
      path: '/userMange',
      name: '用户管理',
      component: Index,
      //redirect: '/userMange',   /*默认进入的页面，可以看做是登录之后的首页*/
      show: true,
      children:[
        {
          path: '/userMange',
          name: '用户列表',
          component: UserMange,
          show: true
        },
        {
          path: '/addUser',
          name: '添加用户',
          component: AddUser,
          show:true
        },
        {
          path: '/update',
          component: UserUpdate,
          show: false,
        }
      ]
    }


]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //   next() 放行  next('/login') 强制跳转
  if(to.path === '/'){
    return next();
  }
  // 获取token
  const tokenStr = window.sessionStorage.getItem("token")
  if(!tokenStr){
    return next('/')
  }else{
    next()
  }
})


export default router
