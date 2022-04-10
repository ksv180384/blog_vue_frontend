import { createApp } from 'vue';

import App from './App.vue';

import router from '@/router/indexRouter';
import store from '@/store/indexStore';

import '@/assets/tailwind.css';

createApp(App).use(store).use(router).mount('#app')

