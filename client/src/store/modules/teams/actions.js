import axios from "../../../util/axios";
import {
    SET_LOADING,
    SET_TEAMS,
    SET_SUBMITTING,
    ADD_TEAM,
    SET_ERRORS,
    SET_TEAM,
    REMOVE_MEMBER,
    SET_MEMBERS
} from "./teams-types";
import router from "../../../router";
import { showSnackbar } from "../../helpers";
export default {
    getTeams: async ctx => {
        try {
            ctx.commit(SET_LOADING, true);
            const { data } = await axios.get("/api/teams");
            ctx.commit(SET_TEAMS, data.teams);
        } catch (error) {
            throw error;
        } finally {
            ctx.commit(SET_LOADING, false);
        }
    },
    createTeam: async (ctx, team) => {
        try {
            ctx.commit(SET_SUBMITTING, true);
            const { data } = await axios.post("/api/teams", { ...team });
            ctx.commit(ADD_TEAM, data.team);
            showSnackbar(`Team ${data.team.name} added!`, "success");
        } catch (error) {
            ctx.commit(SET_ERRORS, error.response.data);
        } finally {
            ctx.commit(SET_SUBMITTING, false);
        }
    },
    getTeam: async (ctx, teamId) => {
        try {
            ctx.commit(SET_LOADING, true);
            const { data } = await axios.get(`/api/teams/${teamId}`);
            ctx.commit(SET_TEAM, data.team);
        } catch (error) {
            const { response } = error;
            console.log(response);
            if (response.status === 404) {
                router.push("/not-found");
            }
        } finally {
            ctx.commit(SET_LOADING, false);
        }
    },
    removeMember: async (ctx, memberId) => {
        try {
            const teamId = ctx.state.team._id;
            await axios.delete(`/api/teams/${teamId}/members/${memberId}`);
            ctx.commit(REMOVE_MEMBER, memberId);
            showSnackbar("Member removed!", "success");
        } catch (error) {
            throw error;
        }
    },
    addMembers: async (ctx, member) => {
        try {
            ctx.commit(SET_SUBMITTING, true);
            const { data } = await axios.post(
                `/api/teams/${ctx.state.team._id}/members`,
                {
                    member
                }
            );
            ctx.commit(SET_MEMBERS, data.members);
            showSnackbar("Members added!", "success");

            return true;
        } catch (error) {
            throw error;
        } finally {
            ctx.commit(SET_SUBMITTING, false);
        }
    }
};
