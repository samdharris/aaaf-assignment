import {
    SET_USERS,
    ADD_USER,
    SET_SUBMITTING,
    SET_ERRORS,
    SET_LOADING,
    SET_USER,
    UPDATE_USER,
    DELETE_USER
} from "./user-types";

export default {
    /**
     * Sets the users state
     * @param {object} state
     * @param {array} users
     */
    [SET_USERS](state, users) {
        state.users = [...users];
    },
    /**
     * adds the given user to the users state
     * @param {object} state
     * @param {object} user
     */
    [ADD_USER](state, user) {
        state.users.push(user);
    },
    /**
     * Set the submitting flag
     * @param {object} state
     * @param {bool} submitting
     */
    [SET_SUBMITTING](state, submitting) {
        state.submitting = submitting;
    },
    /**
     * Set errors state for presenting to the user
     * @param {object} state
     * @param {object} errors
     */
    [SET_ERRORS](state, errors) {
        state.errors = { ...errors };
    },
    /**
     * Sets the loading flag
     * @param {object} state
     * @param {bool} loading
     */
    [SET_LOADING](state, loading) {
        state.loading = loading;
    },
    /**
     * Sets the current user for viewing
     * @param {object} state
     * @param {object} user
     */
    [SET_USER](state, user) {
        state.user = { ...user };
    },
    /**
     * Update the given user
     * @param {object} state
     * @param {object} user
     */
    [UPDATE_USER](state, user) {
        state.user = { ...user };
        state.users = [...state.users.filter(u => u._id !== user._id), user];
    },
    /**
     * Remove the given user from state
     * @param {object} state
     * @param {object} user
     */
    [DELETE_USER](state, user) {
        state.user = {};
        state.users = [...state.users.filter(u => u._id !== user._id)];
    }
};
