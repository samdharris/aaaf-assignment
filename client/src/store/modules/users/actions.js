import { SET_USERS, SET_SUBMITTING, ADD_USER, SET_ERRORS } from "./user-types";
import axios from "../../../util/axios";

export default {
    getUsers: async ctx => {
        try {
            const { data } = await axios.get("/api/users");
            ctx.commit(SET_USERS, data.users);
        } catch (error) {
            throw error;
        }
    },
    createUser: async (ctx, user) => {
        try {
            ctx.commit(SET_SUBMITTING, true);
            const response = await axios.post("/api/users", { ...user });
            ctx.commit(ADD_USER, response.data.user);

            return true;
        } catch (error) {
            ctx.commit(SET_ERRORS, error.response.data);
            return false;
        } finally {
            ctx.commit(SET_SUBMITTING, false);
        }
    }
};
