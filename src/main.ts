import Vue from 'vue';
import App from './App.vue';
import { Initialize } from './store';
import router from './router';
// import vSelect from 'vue-select';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.config.productionTip = false;

// Vue.component('v-select', vSelect);
// import 'vue-select/dist/vue-select.css';

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


// Vue.mixin({
// 	beforeCreate(){
//   	const sync = this.$options.sync
//   	if(sync){
//     	if(!this.$options.computed){
//       	this.$options.computed = {}
//       }
//       const attrs = Object.keys(this.$attrs)
//       sync.forEach(key => {
//       	if(!attrs.includes(key)){
//         	Vue.util.warn(`Missing required sync-prop: "${key}"`, this)
//         }
//         this.$options.computed[key] = {
//         	get(){
//           	return this.$attrs[key]
//           },
//           set(val){
//           	this.$emit('update:' + key, val)
//           }
//         }
//       })
//     }
//   }
// })
// Vue.component('user',{
//   sync:['firstname','lastname'], //this is the special option added by the mixin
//   template:`
//   <div>
//     <input v-model="firstname">
//     <input v-model="lastname">
//   </div>`
// })
// Vue.component('wrapper',{
//   sync:['user'],
//   template:`<user v-bind.sync="user"></user>`
// })
// Vue.component('toggler',{
// 	sync:['state'],
//   template:`<button @click="state = !state">{{state ? 'X' : 'O'}}</button>`
// })
// new Vue({
// 	el:'#vue',
//   data:{
//   	user:{
//       firstname:'Simon',
//       lastname:'Herteby'
//     },
//     state:true
//   }
// })
