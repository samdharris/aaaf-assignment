import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import auth from "./modules/auth";
import general from "./modules/general";

export default new Vuex.Store({
    modules: {
        auth,
        general
    }
});
