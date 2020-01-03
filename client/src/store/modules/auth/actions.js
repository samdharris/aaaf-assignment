import { SET_AUTHENTICATING, SET_ERRORS, SET_CURRENT_USER } from "./auth-types";
import { SET_SNACKBAR } from "../general/general-types";
import axios from "../../../util/axios";
import router from "../../../router";
import { setToken, removeToken } from "../../../util/authHelper";
import _ from "lodash";

export default {
    login: async (ctx, credentials) => {
        try {
            ctx.commit(SET_AUTHENTICATING, true);
            const { data } = await axios.post("/login", {
                ...credentials
            });

            setToken(data.token);
            ctx.commit(SET_CURRENT_USER, data.user);
            router.push("/");
            ctx.commit(
                `general/${SET_SNACKBAR}`,
                {
                    color: "success",
                    text: "You are now logged in!",
                    open: true
                },
                { root: true }
            );
        } catch (error) {
            ctx.commit(SET_ERRORS, error.response.data);
        } finally {
            ctx.commit(SET_AUTHENTICATING, false);
        }
    },
    verifyToken: async ctx => {
        try {
            const { data } = await axios.post("/verify");
            if (_.isEmpty(ctx.state.currentUser)) {
                ctx.commit(SET_CURRENT_USER, data.user);
                ctx.commit(
                    `general/${SET_SNACKBAR}`,
                    {
                        color: "success",
                        text: "You are now logged in!",
                        open: true
                    },
                    { root: true }
                );
            }

            return Promise.resolve();
        } catch (error) {
            removeToken();
            return Promise.reject();
        }
    },
    logout: async ctx => {
        removeToken();
        ctx.commit(SET_CURRENT_USER, {});
        ctx.commit(
            `general/${SET_SNACKBAR}`,
            {
                color: "success",
                text: "You have been logged out!",
                open: true
            },
            { root: true }
        );
        router.push("/login");
    }
};
