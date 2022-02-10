import Vue from 'vue'
import store from "@/store/index.js";
import VueRouter from 'vue-router'
import Home from '@/views/home/Home.vue'
import Authentification from "@/views/login/Authentification.vue"
import Elections from "@/components/vote/Elections.vue"
import Candidats from "@/components/vote/Candidats.vue"
import Admin from "@/views/admin/Admin.vue"

Vue.use(VueRouter)

const router = new VueRouter({
    mode: "history",
    routes: [{
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/je-vote-en-ligne',
            name: 'Elections',
            component: Elections,
            meta: {
                requiresAuth: true
            },
        },
        {
            path: '/je-vote-en-ligne/:idElection/candidats',
            name: 'Candidats',
            props: true,
            component: Candidats,
            meta: {
                requiresAuth: true
            },
        },
        {
            path: '/admin-panel',
            name: 'Admin',
            component: Admin,
            meta: {
                requiresAuth: true
            },
            beforeEnter: (to, from, next) => {
                setTimeout(() => {
                    if (store.getters["auth/user"]['role'] != "Administrateur") {
                        next("/");
                    } else {
                        next();
                    }
                }, 500)

            }
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