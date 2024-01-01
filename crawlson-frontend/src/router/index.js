import { createWebHistory, createRouter } from "vue-router";
import store from '@/store/index';

const routes =  [
    {
        path: "/",
        redirect: { path: "/login" }, // redirect property
        component: () => import('../components/LoginView.vue'),
    },
    {
        path: "/login",
        name: 'login',

        component: () => import('../components/LoginView.vue'),

        beforeEnter: ( to, from, next ) => {
            console.log( "store.state.auth.isLoggedIn: " + store.state.auth.isLoggedIn );

            // check link param exit using route param method
            if( store.state.auth.isLoggedIn ) {
                console.log( "Redirect" )

                next( { name: 'home' } );
                // window.location.href = "/home"
            } else {
                next();
            }
        }
  },
  {
    path: "/home",
    name: 'home',
    component: () => import('../components/WelcomeView.vue'),
    meta: {
        requiresAuth: true
    },

    beforeEnter: ( to, from, next ) => {
        console.log( "store.state.auth.isLoggedIn: " + store.state.auth.isLoggedIn );
        next();
    }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
    if( to.matched.some( record => record.meta.requiresAuth ) ) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if( ! store.state.auth.isLoggedIn ) {
        next( { name: 'login' } )
      } else {
        next() // go to wherever I'm going
      }
    } else {
      next() // does not require auth, make sure to always call next()!
    }
  })

export default router;