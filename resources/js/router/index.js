import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer.vue')

// Views - Icons
const Flags = () => import('@/views/icons/Flags')
const FontAwesome = () => import('@/views/icons/FontAwesome')
const SimpleLineIcons = () => import('@/views/icons/SimpleLineIcons')
const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')

// Views
const Dashboard = () => import('@/views/Dashboard.vue')

//pengguna
const Pengguna = () => import('@/views/pages/pengguna/Index')
const PenggunaEntry = () => import('@/views/pages/pengguna/Entry')


Vue.use(Router)

export default new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
        path: "*",
        redirect: "/pages/404",
    },
    {
        path: "/",
        name: "HomePage",
        redirect: "/pages/login",
        meta: {
            title: "Home",
        },
        // component: HomePage,
    },
    {
      path: "/panel",
      redirect: "/panel/dashboard",
      name: "Panel",
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: {
              title: "Dashboard",
              auth: true,
          },
          component: Dashboard
        },
        {
          path: 'master-data/pengguna',
          name: 'Pengguna',
          meta: {
              title: "Pengguna",
              auth: true,
          },
          component: Pengguna
        },
        {
          path: 'master-data/pengguna/:act',
          name: 'PenggunaEntry',
          meta: {
              title: "Entry Pengguna",
              auth: true,
          },
          component: PenggunaEntry
        },
        // {
        //   path: 'icons',
        //   redirect: '/icons/font-awesome',
        //   name: 'Icons',
        //   component: {
        //     render (c) { return c('router-view') }
        //   },
        //   children: [
        //     {
        //       path: 'coreui-icons',
        //       name: 'CoreUI Icons',
        //       component: CoreUIIcons
        //     },
        //     {
        //       path: 'flags',
        //       name: 'Flags',
        //       component: Flags
        //     },
        //     {
        //       path: 'font-awesome',
        //       name: 'Font Awesome',
        //       component: FontAwesome
        //     },
        //     {
        //       path: 'simple-line-icons',
        //       name: 'Simple Line Icons',
        //       component: SimpleLineIcons
        //     }
        //   ]
        // },
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'login',
          name: 'Login',
          component: Login,
          meta: {
            title : "Login"
          }
        },
        // {
        //   path: 'register',
        //   name: 'Register',
        //   component: Register
        // }
      ]
    }
  ]
})
