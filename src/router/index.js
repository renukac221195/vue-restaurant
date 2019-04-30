import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Gallery from '@/components/Gallery'
import AboutUs from '@/components/AboutUs'
import LoginForm from '@/components/LoginForm'
import MenuList from '@/components/MenuList'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: "LoginForm",
      component: LoginForm
    },
    {
        path: "/Home",
        name: "Home",
        component: Home
    },
    {
        path: "/Gallery",
        name: "Gallery",
        component: Gallery
    },
    {
        path: "/AboutUs",
        name: "AboutUs",
        component: AboutUs
    },
    {
      path: "/MenuList",
      name: "MenuList",
      component: MenuList
    },
  ]
})
