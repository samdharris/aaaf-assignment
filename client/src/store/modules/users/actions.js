import {
    SET_USERS,
    SET_SUBMITTING,
    ADD_USER,
    SET_ERRORS,
    SET_LOADING,
    SET_USER,
    UPDATE_USER,
    DELETE_USER
} from "./user-types";
import axios from "../../../util/axios";
import router from "../../../router";
import { showSnackbar } from "../../helpers";

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
            showSnackbar(`${data.user.name} disabled!`, "success");
        } catch (error) {
            throw error;
        }
    },
    enableUser: async (ctx, user) => {
        try {
            const { data } = await axios.put(`/api/users/${user}/enable`);
            ctx.commit(UPDATE_USER, data.user);
            showSnackbar(`${data.user.name} enabled!`, "success");
        } catch (error) {
            throw error;
        }
    },
    deleteUser: async (ctx, user) => {
        try {
            await axios.delete(`/api/users/${user}`);
            ctx.commit(DELETE_USER, user);
            showSnackbar("User deleted", "success");
            router.push("/users");
        } catch (error) {
            throw error;
        }
    }
};
