import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, IconsPlugin, CardPlugin } from 'bootstrap-vue'
import SocketIO from "socket.io-client"
import VueCodemirror from 'vue-codemirror'

const server_domain = process.env.VUE_APP_SOCKET_ADDR || "localhost";
const port_number = process.env.VUE_APP_SOCKET_PORT || 3000;
const SocketInstance = SocketIO(`http://${server_domain}:${port_number}`, {
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
