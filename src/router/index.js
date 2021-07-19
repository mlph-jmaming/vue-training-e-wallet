import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '../views/LoginPage'
import RegisterPage from '../views/RegisterPage'
import Dashboard from '../views/Dashboard'
import Transaction from '../views/Transaction'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/transaction',
    name: 'Transaction',
    component: Transaction
  },
]

const router = new VueRouter({
  routes
})

export default router
