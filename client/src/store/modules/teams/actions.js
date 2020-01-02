import axios from "../../../util/axios";
import {
    SET_LOADING,
    SET_TEAMS,
    SET_SUBMITTING,
    ADD_TEAM,
    SET_ERRORS,
    SET_TEAM
} from "./teams-types";
import { SET_SNACKBAR } from "../general/general-types";
import router from "../../../router";
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
            ctx.commit(
                `general/${SET_SNACKBAR}`,
                {
                    color: "success",
                    text: `Team ${data.team.name} added!`,
                    open: true
                },
                { root: true }
            );
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
    }
};
