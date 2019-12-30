import axios from "axios";
import _ from "lodash";

const instance = axios.create({
    baseURL: "http://localhost:3001/",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
});

instance.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (!_.isNil(token)) {
        config.headers["Authorization"] = `bearer ${token}`;
    }
    return config;
});

export default instance;
