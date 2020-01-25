import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import auth from "./modules/auth";
import general from "./modules/general";
import teams from "./modules/teams";
import users from "./modules/users";
import documents from "./modules/documents";
import chat from "./modules/chat";

export default new Vuex.Store({
    modules: {
        auth,
        general,
        teams,
        users,
        documents,
        chat
    }
});
