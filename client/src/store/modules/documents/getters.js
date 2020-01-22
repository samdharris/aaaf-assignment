import _ from "lodash";
export default {
    documentIsCheckedOut: (state, getters) => {
        return !_.isNil(getters.latestVersion.checkedOutBy);
    },
    latestVersion: state => {
        if (_.isEmpty(state.document)) {
            return {};
        }

        return state.document.versions[state.document.versions.length - 1];
    }
};
