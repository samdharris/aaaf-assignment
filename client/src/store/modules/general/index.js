import actions from "./actions";
import state from "./state";
import mutations from "./mutations";
import getters from "./getters";
/**
 * General App Module. For anything not specific
 */
export default {
    namespaced: true,
    actions,
    state,
    mutations,
    getters
};
