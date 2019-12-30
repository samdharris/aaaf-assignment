import { SET_AUTHENTICATING, SET_ERRORS } from "./auth-types";
import axios from "../../../util/axios";

export default {
    login: async (ctx, credentials) => {
        try {
            ctx.commit(SET_AUTHENTICATING, true);
            const response = await axios.post("/login", {
                ...credentials
            });
            console.log(response);
        } catch (error) {
            ctx.commit(SET_ERRORS, error.response.data);
        } finally {
            ctx.commit(SET_AUTHENTICATING, false);
        }
    }
};
