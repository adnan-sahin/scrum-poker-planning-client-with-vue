import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';
import 'vuetify/dist/vuetify.min.css';
import 'babel-polyfill';
import '@/style/main.css';
import VeeValidate from 'vee-validate';

import router from './router';
import store from './store';

Vue.use(Vuetify);
Vue.use(VeeValidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
