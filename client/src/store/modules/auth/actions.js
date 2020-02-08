import { SET_AUTHENTICATING, SET_ERRORS, SET_CURRENT_USER } from "./auth-types";
import axios from "../../../util/axios";
import router from "../../../router";
import {
    setToken,
    removeToken,
    setUserId,
    removeUserId
} from "../../../util/authHelper";
import _ from "lodash";
import { showSnackbar } from "../../helpers";
import { SocketInstance } from "../../../main";

export default {
    login: async (ctx, credentials) => {
        try {
            ctx.commit(SET_AUTHENTICATING, true);
            const { data } = await axios.post("/login", {
                ...credentials
            });

            setToken(data.token);
            setUserId(data.user._id);
            ctx.commit(SET_CURRENT_USER, data.user);
            // Don't attempt to connect to ws if the user isn't associated to a team.
            if (!_.isNil(data.user.team)) {
                SocketInstance.connect();
            }
            router.push("/");
            showSnackbar("You are now logged in!", "success");
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
                setUserId(data.user._id);
                SocketInstance.connect();
                ctx.commit(SET_CURRENT_USER, data.user);
                showSnackbar("You are now logged in!", "success");
            }

            return Promise.resolve();
        } catch (error) {
            removeToken();
            return Promise.reject();
        }
    },
    logout: async ctx => {
        SocketInstance.disconnect();
        removeToken();
        localStorage.removeItem("team");
        removeUserId();
        ctx.commit(SET_CURRENT_USER, {});
        showSnackbar("You have been logged out!", "success");

        // Prevent duplicate navigation.
        if (router.currentRoute.path !== "/login") {
            router.push("/login");
        }
    }
};
