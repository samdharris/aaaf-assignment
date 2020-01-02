import axios from "axios";
import _ from "lodash";
import store from "../store";
import router from "../router";

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

instance.interceptors.response.use(response => {
    switch (response.status) {
        case 404:
            router.push("/not-found");
            break;
        case 401:
            store.dispatch("auth/logout");
            break;
        default:
            return response;
    }
});

export default instance;
