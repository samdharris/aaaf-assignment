import {
    SET_USERS,
    SET_SUBMITTING,
    ADD_USER,
    SET_ERRORS,
    SET_LOADING,
    SET_USER,
    UPDATE_USER
} from "./user-types";
import axios from "../../../util/axios";
import { SET_SNACKBAR } from "../general/general-types";

export default {
    getUsers: async ctx => {
        try {
            const { data } = await axios.get("/api/users");
            ctx.commit(SET_USERS, data.users);
        } catch (error) {
            throw error;
        }
    },
    getUser: async (ctx, userId) => {
        try {
            ctx.commit(SET_LOADING, true);
            const { data } = await axios.get(`/api/users/${userId}`);
            ctx.commit(SET_USER, data.user);
        } catch (error) {
            throw error;
        } finally {
            ctx.commit(SET_LOADING, false);
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
    },
    disableUser: async (ctx, user) => {
        try {
            const { data } = await axios.put(`/api/users/${user}/disable`);
            ctx.commit(UPDATE_USER, data.user);
            ctx.commit(
                `general/${SET_SNACKBAR}`,
                {
                    color: "success",
                    text: `${data.user.name} disabled!`,
                    open: true
                },
                { root: true }
            );
        } catch (error) {
            throw error;
        }
    }
};
