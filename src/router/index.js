import Vue from 'vue'
import store from "@/store/index.js";
import VueRouter from 'vue-router'
import Home from '@/views/home/Home.vue'
import Authentification from "@/views/login/Authentification.vue"
import Vote from "@/views/vote/Vote.vue"
import Profil from "@/views/profil/Profil.vue"
Vue.use(VueRouter)

const router = new VueRouter({
    mode: "history",
    routes: [{
            path: '/',
            name: 'Home',
            component: Home,
            meta: {
                requiresAuth: true
            },
        },
        {
            path: '/je-vote-en-ligne',
            name: 'Vote',
            component: Vote,
            meta: {
                requiresAuth: true
            },
        },
        {
            path: '/profil',
            name: 'Profil',
            component: Profil,
            meta: {
                requiresAuth: true
            },
        },
        {
            path: '/authentification',
            name: 'Authentification',
            component: Authentification,
            meta: {
                requiresAuth: false
            },
            beforeEnter: (to, from, next) => {
                setTimeout(() => {
                    if (store.getters["auth/authenticated"]) {
                        next("/");
                    } else {
                        next();
                    }
                }, 500)

            }
        },
    ]


})
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        if (store.getters["auth/authenticated"]) {
            next();
        } else {
            next('/authentification');
        }
    } else {
        next();
    }
});
export default router