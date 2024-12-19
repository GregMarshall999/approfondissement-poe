import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

createApp(App)
.use(store)
.directive('button', {
    mounted: (e) => {
        e.style.width = 'fit-content';
        e.style.padding = '10px';
        e.style.borderRadius = 0;
        e.style.border = 'none';
        e.style.marginTop = '1em';
    }
})
.mount('#app')
