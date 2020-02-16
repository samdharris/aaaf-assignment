import { SET_AUTHENTICATING, SET_ERRORS, SET_CURRENT_USER } from "./auth-types";
export default {
    /**
     * Sets isAuthenticating flag
     * @param {object} state
     * @param {bool} isAuthenticating
     */
    [SET_AUTHENTICATING](state, isAuthenticating) {
        state.isAuthenticating = isAuthenticating;
    },
    /**
     * Sets any errors during authentication to show to the user
     * @param {object} state
     * @param {object} errors
     */
    [SET_ERRORS](state, errors) {
        state.errors = { ...errors };
    },
    /**
     * Sets the current user upon login
     * @param {object} state
     * @param {object} user
     */
    [SET_CURRENT_USER](state, user) {
        state.currentUser = { ...user };
    }
};
