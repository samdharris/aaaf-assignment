import {
    SET_TEAMS,
    SET_LOADING,
    SET_SUBMITTING,
    ADD_TEAM,
    SET_ERRORS,
    SET_TEAM,
    REMOVE_MEMBER,
    SET_MEMBERS,
    UPDATE_TEAM,
    REMOVE_TEAM
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
    [UPDATE_TEAM](state, team) {
        state.teams = [...state.teams.filter(t => t._id !== team._id), team];
        state.team = { ...team };
    },
    [REMOVE_TEAM](state) {
        state.teams = [...state.teams.filter(t => t.id !== state.team._id)];
        state.team = {};
    },
    [SET_ERRORS](state, errors) {
        state.errors = { ...errors };
    },
    [SET_TEAM](state, team) {
        state.team = { ...team };
    },
    [REMOVE_MEMBER](state, member) {
        state.team.members = [
            ...state.team.members.filter(m => m._id !== member)
        ];
    },
    [SET_MEMBERS](state, members) {
        state.team.members = [...members];
    }
};
