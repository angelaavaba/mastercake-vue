import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/AppLogin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AppRegister.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DashboardView.vue'),
    children:[
      {
      name: 'CatalogoCategorias',
      path:'categorias',
      component: () => import(/* webpackChunkName: "about" */ '../views/CategoriasView.vue')
      }, 
      {
        name: 'CatalogoProductos',
        path:'productos',
        component: () => import(/* webpackChunkName: "about" */ '../views/ProductosView.vue')
      },
      {
        name: 'ListaProductos',
        path:'listaProductos',
        component: () => import(/* webpackChunkName: "about" */ '../views/ProductosListView.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
