import { SET_USERS, ADD_USER, SET_SUBMITTING, SET_ERRORS } from "./user-types";

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
    }
};
