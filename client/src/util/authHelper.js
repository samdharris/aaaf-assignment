import _ from "lodash";
export function isAuthenticated() {
    let authenticated = false;
    const token = localStorage.getItem("token");
    if (!_.isNil(token)) {
        authenticated = true;
    }

    return authenticated;
}
