import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index.js'
import router from './router/index.js'

import '@/assets/styles/variables.css'
import 'aos/dist/aos.css'
import 'maplibre-gl/dist/maplibre-gl.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
