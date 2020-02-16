import _ from "lodash";

/**
 * Helper to check if we're authenticated
 */
export function isAuthenticated() {
    return !_.isNil(getToken());
}

/**
 * Gets the token from local storage
 */
export function getToken() {
    return localStorage.getItem("token");
}

/**
 * Sets the token into local storage
 * @param {string} token
 */
export function setToken(token) {
    localStorage.setItem("token", token);
}

/**
 * Removes the token from local storage
 */
export function removeToken() {
    localStorage.removeItem("token");
}

/**
 * Get the user id from local storage
 */
export function getUserId() {
    return localStorage.getItem("current-user-id");
}

/**
 * Set the user id to local storage
 * @param {string} userId
 */
export function setUserId(userId) {
    localStorage.setItem("current-user-id", userId);
}

/**
 * Remove the ID from local storage
 */
export function removeUserId() {
    localStorage.removeItem("current-user-id");
}
