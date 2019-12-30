import { SET_AUTHENTICATING, SET_ERRORS, SET_CURRENT_USER } from "./auth-types";
export default {
    [SET_AUTHENTICATING](state, isAuthenticating) {
        state.isAuthenticating = isAuthenticating;
    },
    [SET_ERRORS](state, errors) {
        state.errors = { ...errors };
    },
    [SET_CURRENT_USER](state, user) {
        state.currentUser = { ...user };
    }
};
