import _ from "lodash";
export default {
    /**
     * Getter to dictate if we're currently logged in or not
     * @param {object} state
     */
    isAuthenticated: state => !_.isEmpty(state.currentUser)
};
