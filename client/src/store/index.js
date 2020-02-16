import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// Vuex modules
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
        /**
         * Action that is called when a user is connected to the chat server
         * @param {*} ctx
         * @param {*} data
         */
        "SOCKET_user-connected"(ctx, data) {
            ctx.commit("chat/SEND_MESSAGE", {
                text: data
            });
        },
        /**
         * Action that is called when a message has been sent and recieved
         * @param {*} ctx
         * @param {*} data
         */
        "SOCKET_message-sent"(ctx, data) {
            ctx.commit("chat/SEND_MESSAGE", data);
        },
        /**
         * Action called when a user disconnects from the chat server
         * @param {*} ctx
         * @param {*} data
         */
        "SOCKET_user-disconnected"(ctx, data) {
            ctx.commit("chat/SEND_MESSAGE", {
                text: data
            });
        }
    }
});
