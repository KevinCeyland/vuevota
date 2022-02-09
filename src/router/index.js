import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'
import Inscription from '@/views/login/Inscription.vue'
import Connexion from '@/views/login/Connexion.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/inscription',
        component: Inscription,
        name: 'Inscription',
    },
    {
        path: '/connexion',
        component: Connexion,
        name: 'Connexion',
    },
]

const router = new VueRouter({
    routes
})

export default router