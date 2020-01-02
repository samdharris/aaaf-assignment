import { SET_USERS } from "./user-types";

export default {
    [SET_USERS](state, users) {
        state.users = [...users];
    }
};
