import { SET_AUTHENTICATING, SET_ERRORS, SET_CURRENT_USER } from "./auth-types";
import { SET_SNACKBAR } from "../general/general-types";
import axios from "../../../util/axios";

export default {
    login: async (ctx, credentials) => {
        try {
            ctx.commit(SET_AUTHENTICATING, true);
            const { data } = await axios.post("/login", {
                ...credentials
            });

            localStorage.setItem("token", data.token);
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
        } catch (error) {
            ctx.commit(SET_ERRORS, error.response.data);
        } finally {
            ctx.commit(SET_AUTHENTICATING, false);
        }
    }
};
