import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import router from './router'

// Firebase
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyB3VYqVnn98Yv_ZZSxgVDnA6NVwOANaRr0',
  authDomain: 'fit5032-2b799.firebaseapp.com',
  projectId: 'fit5032-2b799',
  storageBucket: 'fit5032-2b799.firebasestorage.app',
  messagingSenderId: '602872773748',
  appId: '1:602872773748:web:3210d32f8ef62b8dfc2521',
}

// Initialize Firebase
initializeApp(firebaseConfig)

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

app.use(router)

app.mount('#app')
