import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login/Login.vue'
import FindId from '../views/Login/FindId.vue'
import FindPw from '../views/Login/FindPw.vue'
import SignUp from '../views/SignUp/SignUp.vue'
import SocialSignUp from '../views/SignUp/SocialSignUp.vue'
import Survey from '../views/SignUp/Survey.vue'
import MyPage from '../views/MyPage.vue'
import Search from '../views/Search.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/socialSignUp',
    name: 'SocialSignUp',
    component: SocialSignUp
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/findId',
    name: 'FindId',
    component: FindId
  },
  {
    path: '/findPw',
    name: 'FindPw',
    component: FindPw
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
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
