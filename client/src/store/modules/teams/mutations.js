import { SET_TEAMS, SET_LOADING } from "./teams-types";

export default {
    [SET_TEAMS](state, teams) {
        state.teams = [...teams];
    },
    [SET_LOADING](state, loading) {
        state.loading = loading;
    }
};
