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
    },
    actions: {
        "SOCKET_user-connected"(ctx, data) {
            ctx.commit("chat/SEND_MESSAGE", {
                text: data
            });
        },
        "SOCKET_message-sent"(ctx, data) {
            ctx.commit("chat/SEND_MESSAGE", data);
        },
        "SOCKET_user-disconnected"(ctx, data) {
            ctx.commit("chat/SEND_MESSAGE", {
                text: data
            });
        }
    }
});
