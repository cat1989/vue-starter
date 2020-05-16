import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App'

import '../public/styles/normalize.scss'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount(document.getElementById("app"))