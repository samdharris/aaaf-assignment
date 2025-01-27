import axios from "../../../util/axios";
import {
    SET_LOADING,
    SET_TEAMS,
    SET_SUBMITTING,
    ADD_TEAM,
    SET_ERRORS,
    SET_TEAM,
    REMOVE_MEMBER,
    SET_MEMBERS,
    UPDATE_TEAM,
    REMOVE_TEAM
} from "./teams-types";
import router from "../../../router";
import { showSnackbar } from "../../helpers";
import { format } from "../../../util";
export default {
    /**
     * Get all teams from backend and put them into state
     *
     * @param {object} ctx
     */
    getTeams: async ctx => {
        try {
            ctx.commit(SET_LOADING, true);
            const { data } = await axios.get("/api/teams");
            ctx.commit(
                SET_TEAMS,
                data.teams.map(team => format(team))
            );
        } catch (error) {
            showSnackbar(
                `Something went wrong getting teams: ${error.response.data.message}`
            );
        } finally {
            ctx.commit(SET_LOADING, false);
        }
    },
    /**
     * Submits a new team to be created
     *
     * @param {object} ctx
     * @param {object} team
     */
    createTeam: async (ctx, team) => {
        try {
            ctx.commit(SET_SUBMITTING, true);
            const { data } = await axios.post("/api/teams", { ...team });
            ctx.commit(ADD_TEAM, format(data.team));
            showSnackbar(`Team ${data.team.name} added!`, "success");
            return true;
        } catch (error) {
            ctx.commit(SET_ERRORS, error.response.data);
        } finally {
            ctx.commit(SET_SUBMITTING, false);
        }
    },
    /**
     * Submits a team to be updated
     *
     * @param {object} ctx
     * @param {object} team
     */
    updateTeam: async (ctx, team) => {
        try {
            ctx.commit(SET_SUBMITTING, true);
            const { data } = await axios.put(
                `/api/teams/${ctx.state.team._id}`,
                { ...team }
            );
            ctx.commit(UPDATE_TEAM, format(data.team));
            showSnackbar(`Team ${data.team.name} updated!`, "success");
            return true;
        } catch (error) {
            return false;
        } finally {
            ctx.commit(SET_SUBMITTING, false);
        }
    },
    /**
     * Submits a given team to be deleted
     *
     * @param {object} ctx
     */
    deleteTeam: async ctx => {
        try {
            await axios.delete(`/api/teams/${ctx.state.team._id}`);
            ctx.commit(REMOVE_TEAM);
            showSnackbar("Team deleted", "success");
            router.push("/teams");
        } catch (error) {
            showSnackbar(
                `Something went wrong deleting team: ${error.response.data.message}`,
                "error"
            );
            return false;
        }
    },
    /**
     * Gets the given team from the backend for viewing
     *
     * @param {object} ctx
     * @param {string} teamId
     */
    getTeam: async (ctx, teamId) => {
        try {
            ctx.commit(SET_LOADING, true);
            const { data } = await axios.get(`/api/teams/${teamId}`);
            ctx.commit(SET_TEAM, format(data.team));
        } catch (error) {
            showSnackbar(
                `Something went wrong getting requested team ${error.response.data.message}`,
                "error"
            );
        } finally {
            ctx.commit(SET_LOADING, false);
        }
    },
    /**
     * Submits the given member to be removed from the team
     *
     * @param {object} ctx
     * @param {string} memberId
     */
    removeMember: async (ctx, memberId) => {
        try {
            const teamId = ctx.state.team._id;
            await axios.delete(`/api/teams/${teamId}/members/${memberId}`);
            ctx.commit(REMOVE_MEMBER, memberId);
            showSnackbar("Member removed!", "success");
        } catch (error) {
            showSnackbar(
                `Something went wrong removing member from team ${error.response.data.message}`,
                "error"
            );
        }
    },
    /**
     * Submits the given user to be added to the team
     *
     * @param {object} ctx
     * @param {string} member
     */
    addMembers: async (ctx, member) => {
        try {
            ctx.commit(SET_SUBMITTING, true);
            const { data } = await axios.post(
                `/api/teams/${ctx.state.team._id}/members`,
                {
                    member
                }
            );
            ctx.commit(SET_MEMBERS, format(data.members));
            showSnackbar("Members added!", "success");

            return true;
        } catch (error) {
            showSnackbar("Something went wrong adding member to team", "error");
        } finally {
            ctx.commit(SET_SUBMITTING, false);
        }
    }
};
