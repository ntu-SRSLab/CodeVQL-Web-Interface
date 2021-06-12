import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, IconsPlugin, CardPlugin } from 'bootstrap-vue'
import SocketIO from "socket.io-client"
import VueCodemirror from 'vue-codemirror'

var SocketInstance = SocketIO('http://localhost:80', {
  reconnection: true,
  reconnectionDelay: 3000
});
Vue.prototype.$socket = SocketInstance;

Vue.use(VueCodemirror);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(CardPlugin);
Vue.config.productionTip = false;

new Vue({   
  router,
  render: h => h(App)
}).$mount("#app");
