import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import fixtures from './fixtures.json'
import ScrollPicker from 'vue3-scroll-picker';

import BootstrapVueNext from 'bootstrap-vue-next'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

import './assets/main.css'

const app = createApp(App)

app.config.globalProperties.fixtures = fixtures;
app.config.globalProperties.baseDir = import.meta.env.BASE_URL;
app.use(router)
app.use(BootstrapVueNext)
app.use(ScrollPicker);


app.mount('#app')
