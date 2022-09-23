import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { MdArrowdropdownOutlined } from 'oh-vue-icons/icons'

import App from './App.vue'
import router from './router'

import './assets/main.css'
// Imports above

const iconArray = [MdArrowdropdownOutlined]

addIcons(...iconArray)

const app = createApp(App)

app.component('v-icon', OhVueIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
