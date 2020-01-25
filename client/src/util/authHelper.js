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

export function getUserId() {
    return localStorage.getItem("current-user-id");
}

export function setUserId(userId) {
    localStorage.setItem("current-user-id", userId);
}

export function removeUserId() {
    localStorage.removeItem("current-user-id");
}
