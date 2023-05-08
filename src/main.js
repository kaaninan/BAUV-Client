import { createApp } from 'vue'
import App from './App.vue'
import store from './store/store.js'
import router from './router/index.js'

import 'maplibre-gl/dist/maplibre-gl.css'

import '@tabler/core/dist/css/tabler.min.css'
import '@tabler/core/dist/js/tabler.min.js'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
