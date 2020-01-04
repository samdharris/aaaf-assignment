import axios from "axios";
import _ from "lodash";
import store from "../store";
import router from "../router";
import { showSnackbar } from "../store/helpers";

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
        if (status === 404) {
            router.push("/not-found");
        }

        if (status === 400) {
            showSnackbar(data.message, "error");
        }

        if (status === 401) {
            store.dispatch("auth/logout");
        }
        return Promise.reject(error);
    }
);

export default instance;
