import { SET_USERS } from "./user-types";
import axios from "../../../util/axios";

export default {
    getUsers: async ctx => {
        try {
            const { data } = await axios.get("/api/users");
            ctx.commit(SET_USERS, data.users);
        } catch (error) {
            throw error;
        }
    }
};
