import { createWebHistory, createRouter } from "vue-router";
import store from '@/store/index';

import AppLayout from '@/layout/AppLayout.vue';

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

                next( { name: 'main' } );
            } else {
                next();
            }
        }
  },
  {
    path: "/#/",
    name: 'main',
    component: () => import('../components/MainPage.vue'),
    meta: {
        requiresAuth: true
    },

    beforeEnter: ( to, from, next ) => {
        console.log( "store.state.auth.isLoggedIn: " + store.state.auth.isLoggedIn );
        next();
    }
  },
    {
        path: '/trends',
        component: AppLayout,
        children: [
            {
                component: () => import('@/components/Trends.vue'),
                name: 'trends',
                path: '/trends',
            }
        ]
    },
  {
    path: "/settings",
    name: 'settings',
    components: {
        default: () => import('../components/SettingsView.vue'),
    },
    meta: {
        requiresAuth: true
    },

    beforeEnter: ( to, from, next ) => {
        console.log( "store.state.auth.isLoggedIn: " + store.state.auth.isLoggedIn );
        next();
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: "/",
  }
]

export const router = createRouter({
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
