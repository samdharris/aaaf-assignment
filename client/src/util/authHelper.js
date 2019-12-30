import _ from "lodash";

import store from "../store";
export function isAuthenticated() {
    let authenticated = false;
    const token = getToken();
    if (!_.isNil(token)) {
        store.dispatch("auth/verifyToken");
        authenticated = true;
    }

    return authenticated;
}

export function getToken() {
    return localStorage.getItem("token");
}

export function setToken(token) {
    localStorage.setItem("token", token);
}

export function removeToken() {
    localStorage.removeItem("token");
}
