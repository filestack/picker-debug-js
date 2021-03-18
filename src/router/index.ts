import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './../views/Home.vue';
import PickerRun from './../views/PickerRun.vue';
import PickerOptions from './../views/PickerOptions.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/picker', component: PickerRun, name: 'picker-runner'},
  { path: '/picker-options', component: PickerOptions, name: 'picker-options'},
]

export default new VueRouter({ routes });
