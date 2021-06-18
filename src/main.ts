import Vue from 'vue';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
// @ts-ignore
import { VueMaskDirective } from 'v-mask';

import './registerServiceWorker';
import { droneApi } from '@/network/droneApi';
import '@/scss/custom.scss';

// Vue.config.productionTip = false;

Vue.directive('mask', VueMaskDirective);
Vue.prototype.droneApi = droneApi;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
