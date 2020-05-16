import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import index from '@/views/index'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'hash',
    base: '/',
    routes: [
        {
            path: '/',
            name: 'index',
            component: index,
            meta: {
                title: 'index'
            }
        },
        {
            path: '*',
            name: 'error',
            component: () => import(/* webpackPrefetch: true */'@/views/error')
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.find(match => match.meta.requireAuth) && !store.getters.hasLogin) {
        store.commit('setRedirect', to.path)
        next('/login')
    }
    else {
        next()
    }
})

router.afterEach((to, from, next) => {
    document.title = to.meta.title || ''
})

export default router