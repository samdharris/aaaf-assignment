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
import { format } from "../../../util";

export default {
    /**
     * Gets all users from the backend
     *
     * @param {object} ctx
     */
    getUsers: async ctx => {
        try {
            const { data } = await axios.get("/api/users");
            ctx.commit(
                SET_USERS,
                data.users.map(user => format(user))
            );
        } catch (error) {
            showSnackbar("Something went wrong getting users", "error");
        }
    },
    /**
     * Gets the given user from the backend for viewing
     *
     * @param {object} ctx
     * @param {string} userId
     */
    getUser: async (ctx, userId) => {
        try {
            ctx.commit(SET_LOADING, true);
            const { data } = await axios.get(`/api/users/${userId}`);
            ctx.commit(SET_USER, format(data.user));
        } catch (error) {
            showSnackbar("Something went wrong retrieving user", "error");
        } finally {
            ctx.commit(SET_LOADING, false);
        }
    },
    /**
     * Submit the given user for creation
     *
     * @param {object} ctx
     * @param {object} user
     */
    createUser: async (ctx, user) => {
        try {
            ctx.commit(SET_SUBMITTING, true);
            const response = await axios.post("/api/users", { ...user });
            ctx.commit(ADD_USER, format(response.data.user));
            showSnackbar(`${user.name} added!`, "success");
            return true;
        } catch (error) {
            ctx.commit(SET_ERRORS, error.response.data);
            return false;
        } finally {
            ctx.commit(SET_SUBMITTING, false);
        }
    },
    /**
     * Submit the given user for updating
     *
     * @param {object} ctx
     * @param {object} user
     */
    updateUser: async (ctx, user) => {
        try {
            ctx.commit(SET_SUBMITTING, true);
            const { data } = await axios.put(
                `/api/users/${ctx.state.user._id}`,
                { ...user }
            );
            ctx.commit(UPDATE_USER, format(data.user));

            showSnackbar(`${user.name} updated!`, "success");
            return true;
        } catch (error) {
            ctx.commit(SET_ERRORS, error.response.data);
            return false;
        } finally {
            ctx.commit(SET_SUBMITTING, false);
        }
    },
    /**
     * Submit the given user for disabling
     *
     * @param {object} ctx
     * @param {object} user
     */
    disableUser: async (ctx, user) => {
        try {
            const { data } = await axios.put(`/api/users/${user}/disable`);
            ctx.commit(UPDATE_USER, format(data.user));
            showSnackbar(`${data.user.name} disabled!`, "success");
        } catch (error) {
            showSnackbar("Something went wrong disabling user", "error");
        }
    },
    /**
     * Submit the given user for enabling
     *
     * @param {object} ctx
     * @param {object} user
     */
    enableUser: async (ctx, user) => {
        try {
            const { data } = await axios.put(`/api/users/${user}/enable`);
            ctx.commit(UPDATE_USER, format(data.user));
            showSnackbar(`${data.user.name} enabled!`, "success");
        } catch (error) {
            showSnackbar("Something went wrong enabling user", "error");
        }
    },
    /**
     * Submit the given user for being deleted
     *
     * @param {object} ctx
     * @param {object} user
     */
    deleteUser: async (ctx, user) => {
        try {
            await axios.delete(`/api/users/${user}`);
            ctx.commit(DELETE_USER, format(user));
            showSnackbar("User deleted", "success");
            router.push("/users");
        } catch (error) {
            showSnackbar("Something went wrong deleting user", "error");
        }
    }
};
