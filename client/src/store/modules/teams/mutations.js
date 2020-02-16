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
    /**
     * Sets the teams state
     * @param {object} state
     * @param {array} teams
     */
    [SET_TEAMS](state, teams) {
        state.teams = [...teams];
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
     * Sets the submitting flag
     * @param {object} state
     * @param {bool} submitting
     */
    [SET_SUBMITTING](state, submitting) {
        state.submitting = submitting;
    },
    /**
     * Adds a given team to state
     * @param {object} state
     * @param {object} team
     */
    [ADD_TEAM](state, team) {
        state.teams.push(team);
    },
    /**
     * Modifies the given team to bring it inline with the backend
     * @param {object} state
     * @param {object} team
     */
    [UPDATE_TEAM](state, team) {
        state.teams = [...state.teams.filter(t => t._id !== team._id), team];
        state.team = { ...team };
    },
    /**
     * Removes the given team from state
     * @param {object} state
     */
    [REMOVE_TEAM](state) {
        state.teams = [...state.teams.filter(t => t.id !== state.team._id)];
        state.team = {};
    },
    /**
     * Sets errors to be displayed to the user
     * @param {object} state
     * @param {object} errors
     */
    [SET_ERRORS](state, errors) {
        state.errors = { ...errors };
    },
    /**
     * Sets the current team for viewing
     * @param {object} state
     * @param {object} team
     */
    [SET_TEAM](state, team) {
        state.team = { ...team };
    },
    /**
     * Removes the given member from the team in state
     * @param {object} state
     * @param {object} member
     */
    [REMOVE_MEMBER](state, member) {
        state.team.members = [
            ...state.team.members.filter(m => m._id !== member)
        ];
    },
    /**
     * Sets members for the current team.
     * @param {object} state
     * @param {array} members
     */
    [SET_MEMBERS](state, members) {
        state.team.members = [...members];
    }
};
