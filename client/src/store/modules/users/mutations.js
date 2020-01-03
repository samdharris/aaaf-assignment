import {
    SET_USERS,
    ADD_USER,
    SET_SUBMITTING,
    SET_ERRORS,
    SET_LOADING,
    SET_USER,
    UPDATE_USER
} from "./user-types";

export default {
    [SET_USERS](state, users) {
        state.users = [...users];
    },
    [ADD_USER](state, user) {
        state.users.push(user);
    },
    [SET_SUBMITTING](state, submitting) {
        state.submitting = submitting;
    },
    [SET_ERRORS](state, errors) {
        state.errors = { ...errors };
    },
    [SET_LOADING](state, loading) {
        state.loading = loading;
    },
    [SET_USER](state, user) {
        state.user = { ...user };
    },
    [UPDATE_USER](state, user) {
        state.user = { ...user };
        state.users = [...state.users.filter(u => u._id !== user._id), user];
    }
};
