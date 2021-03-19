import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import SocketIO from "socket.io-client"
import VueCodemirror from 'vue-codemirror'
 
var SocketInstance = SocketIO('http://localhost:3000', {
  reconnection: true,
  reconnectionDelay: 3000
});
Vue.prototype.$socket = SocketInstance;

Vue.use(VueCodemirror);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false;

new Vue({   
  render: h => h(App)
}).$mount("#app");