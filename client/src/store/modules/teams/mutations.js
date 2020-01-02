import {
    SET_TEAMS,
    SET_LOADING,
    SET_SUBMITTING,
    ADD_TEAM,
    SET_ERRORS,
    SET_TEAM
} from "./teams-types";

export default {
    [SET_TEAMS](state, teams) {
        state.teams = [...teams];
    },
    [SET_LOADING](state, loading) {
        state.loading = loading;
    },
    [SET_SUBMITTING](state, submitting) {
        state.submitting = submitting;
    },
    [ADD_TEAM](state, team) {
        state.teams.push(team);
    },
    [SET_ERRORS](state, errors) {
        state.errors = { ...errors };
    },
    [SET_TEAM](state, team) {
        state.team = { ...team };
    }
};
