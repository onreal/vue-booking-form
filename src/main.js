import { createApp } from 'vue'
import App from './App.vue'
import VCalendar from 'v-calendar'
import vSelect from 'vue-select'

const app = createApp(App)
app.use(VCalendar, {})
app.component('v-select', vSelect)
app.mount('#app')
