import _ from "lodash";

export function isAuthenticated() {
    return !_.isNil(getToken());
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
