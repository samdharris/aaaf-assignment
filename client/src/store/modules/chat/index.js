import state from "./state";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

/**
 * The Chat module
 */
export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
