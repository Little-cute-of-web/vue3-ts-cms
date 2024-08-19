import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// import hyRequest from './service';

import 'normalize.css';
import './assets/css/index.less';

import { install } from './cms';
createApp(App).use(install).use(store).use(router).mount('#app');

// hyRequest.request({
//   url: '/get',
//   method: 'GET',
//   showLoading: false,
// });
