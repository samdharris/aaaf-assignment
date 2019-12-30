import { SET_AUTHENTICATING, SET_ERRORS } from "./auth-types";
export default {
    [SET_AUTHENTICATING](state, isAuthenticating) {
        state.isAuthenticating = isAuthenticating;
    },
    [SET_ERRORS](state, errors) {
        state.errors = { ...errors };
    }
};
