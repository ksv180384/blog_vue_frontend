import { createApp } from 'vue';

import App from './App.vue';

import router from '@/router/indexRouter';
import store from '@/store/indexStore';

import '@/assets/tailwind.css';

const app = createApp(App);
app.use(store).use(router);

app.mount('#app');


