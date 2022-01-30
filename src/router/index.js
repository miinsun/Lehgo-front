import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import MyPage from '../views/MyPage.vue'
import Survey from '../views/Survey.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: SignUp
  },
  {
    path: '/myPage',
    name: 'MyPage',
    component: MyPage
  },
  {
    path: '/survey',
    name: 'Survey',
    component: Survey
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
