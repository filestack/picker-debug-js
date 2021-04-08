import Vue from 'vue';
import App from './App.vue';
import { Initialize } from './store';
import router from './router';
import Clipboard from 'v-clipboard'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.config.productionTip = false;
Vue.use(Clipboard)

// BOOTSTRAP
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import './App.scss'

Initialize().then((store) => {
  new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#filestack-debug');
});
