import axios from "../../../util/axios";
import { SET_LOADING, SET_TEAMS } from "./teams-types";
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
    }
};
