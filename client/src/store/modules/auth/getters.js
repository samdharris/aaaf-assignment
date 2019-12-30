import _ from "lodash";
export default {
    isAuthenticated: state => !_.isEmpty(state.currentUser)
};
