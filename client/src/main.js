import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import { ValidationObserver, ValidationProvider } from "vee-validate";
import "./util/vee-validate";

import { converterBase10 } from "byte-converter";

import socketio from "socket.io-client";
import VueSocketIO from "vue-socket.io";
import { getToken } from "./util/authHelper";

export const SocketInstance = socketio("http://localhost:3001", {
    autoConnect: false,

    query: {
        token: getToken()
    }
});

Vue.use(
    new VueSocketIO({
        debug: true,
        connection: SocketInstance,
        vuex: {
            store,
            actionPrefix: "SOCKET_",
            mutationPrefix: "SOCKET_"
        }
    })
);

Vue.prototype.$converter = converterBase10;

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

Vue.config.productionTip = process.env.NODE_ENV !== "production";

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount("#app");
