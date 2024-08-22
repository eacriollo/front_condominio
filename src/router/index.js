import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppLayout from '@/layout/AppLayout.vue';
import VistaLogin from '../views/loginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: VistaLogin,
      meta: { redirectIfAuth: true }
    },
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: 'about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/AboutView.vue'),
          meta: { requireAuth: true }
        },
        {
          path: 'cuotas',
          name: 'cuatas',
          component: () => import('../views/admin/Cuota.vue'),
          meta: { requireAuth: true }
        },
        {
          path: 'personas',
          name: 'personas',
          component: () => import('../views/admin/Personas.vue'),
          meta: { requireAuth: true }
        },
        {
          path: 'metodos',
          name: 'metodos',
          component: () => import('../views/admin/Metodos_Pago.vue'),
          meta: { requireAuth: true }
        },
        {
          path: 'datos',
          name: 'datos',
          component: () => import('../views/admin/Datos.vue'),
          meta: { requireAuth: true }
        }

      ]
    }
  ]
})

//guard

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("access_token")

  //console.log(to);
  if (to.meta.requireAuth) {
    if (!token)
      return next({ name: 'login' })
    return next()
  }
  if (to.meta.redirectIfAuth && token) {
    return next({ name: '/' })
  }
  return next()
})
export default router
