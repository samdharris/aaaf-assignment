import axios from "axios";
import _ from "lodash";
import store from "../store";
import router from "../router";
import { showSnackbar } from "../store/helpers";
import httpCodes from "http-status-codes";

const instance = axios.create({
    baseURL: "http://localhost:3001/",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
});

instance.interceptors.request.use(request => {
    const token = localStorage.getItem("token");
    if (!_.isNil(token)) {
        request.headers["Authorization"] = `bearer ${token}`;
    }
    return request;
});

instance.interceptors.response.use(
    response => {
        return Promise.resolve(response);
    },
    error => {
        const { status, data } = error.response;
        if (status === httpCodes.NOT_FOUND) {
            router.push("/not-found");
        }

        if (
            status === httpCodes.BAD_REQUEST ||
            httpCodes.INTERNAL_SERVER_ERROR
        ) {
            showSnackbar(data.message, "error");
        }

        if (status === httpCodes.UNAUTHORIZED) {
            store.dispatch("auth/logout");
        }
        return Promise.reject(error);
    }
);

export default instance;
