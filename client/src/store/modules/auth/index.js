import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

/**
 * Authentication Module
 *
 * Handles all authentication related stuff within vuex.
 */
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
