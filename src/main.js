import { createApp } from 'vue'
import App from './App.vue'
import store from './store/store.js'
import router from './router/index.js'
import VueGoogleMaps from '@fawmi/vue-google-maps'

import 'maplibre-gl/dist/maplibre-gl.css';

const app = createApp(App);
app.use(store)
app.use(router)
app.use(VueGoogleMaps, {load: { key: 'AIzaSyDZ1pzaQAX8KW98sh46hD7dUu_gjdN6mR4' }})
app.mount('#app')
